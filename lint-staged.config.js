const path = require('path');

const getRelativePath = (dirName, absolutePath) => {
  const rootDir = path.join(process.cwd(), dirName).replace(/\\/g, '/').toLowerCase();
  const normalizedFile = absolutePath.replace(/\\/g, '/').toLowerCase();
  
  const index = normalizedFile.indexOf(rootDir);
  if (index !== -1) {
    // Strip the root dir prefix and return relative path
    return absolutePath.slice(index + rootDir.length + 1).replace(/\\/g, '/');
  }
  // Fallback to path.relative if somehow match fails
  return path.relative(path.join(process.cwd(), dirName), absolutePath).replace(/\\/g, '/');
};

module.exports = {
  // Frontend (client) hooks
  'client/src/**/*.{js,jsx,ts,tsx}': (filenames) => {
    const relativeFiles = filenames
      .map((file) => getRelativePath('client', file))
      .join(' ');
    return `pnpm --prefix client exec eslint ${relativeFiles}`;
  },

  // Backend (server) hooks
  'server/src/**/*.ts': (filenames) => {
    const relativeFiles = filenames
      .map((file) => getRelativePath('server', file))
      .join(' ');
    return `pnpm --prefix server exec eslint --fix ${relativeFiles}`;
  }
};
