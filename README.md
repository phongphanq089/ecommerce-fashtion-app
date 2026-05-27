# 🛍️ Ecommerce Fashion App

A Fullstack Ecommerce Fashion Application built with a clean separate directory structure for **Frontend** (client) and **Backend** (server).

## 📁 Directory Structure
*   `client/`: Frontend codebase (Next.js, Tailwind CSS v4, TypeScript).
*   `server/`: Backend codebase (NestJS, TypeScript).

---

## ⚡ Root Quick CLI Scripts

To streamline your local development workflow, you can run all scripts directly from the workspace root directory without needing to `cd` into individual subfolders.

### 1. Launch Development Servers

| Script Command | Target Project | Description |
| :--- | :--- | :--- |
| `pnpm dev:fe` | **Frontend** | Boots up Next.js local dev server inside `client/` |
| `pnpm dev:be` | **Backend** | Boots up NestJS dev server with watch-mode enabled inside `server/` |
| `pnpm dev:all` | **Both Projects** | Runs both Frontend and Backend concurrently in the background |

> 💡 *Using npm?* Simply replace `pnpm` with `npm run` (e.g., `npm run dev:fe`).

---

### 2. Dependency Management (Installation)

Avoid opening separate terminals for setup. Execute these directly from the root directory:

| Script Command | Target Project |
| :--- | :--- |
| `pnpm install:fe` | Install dependencies for Frontend (`client/`) |
| `pnpm install:be` | Install dependencies for Backend (`server/`) |
| `pnpm install:all` | Sequentially install packages in **both** directories |

---

### 3. Production Builds

| Script Command | Target Project |
| :--- | :--- |
| `pnpm build:fe` | Compiles Frontend for production |
| `pnpm build:be` | Compiles Backend for production |
| `pnpm build:all` | Sequentially builds **both** directories |

---

## 🛠️ Root Configuration Overview (`package.json`)

Here is the exact configuration defined in the root `package.json`:

```json
{
  "name": "ecommerce-fashion-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev:fe": "pnpm --prefix client dev",
    "dev:be": "pnpm --prefix server start:dev",
    "dev:all": "pnpm dev:fe & pnpm dev:be",
    "install:fe": "pnpm --prefix client install",
    "install:be": "pnpm --prefix server install",
    "install:all": "pnpm install:fe && pnpm install:be",
    "build:fe": "pnpm --prefix client build",
    "build:be": "pnpm --prefix server build",
    "build:all": "pnpm build:fe && pnpm build:be"
  }
}
```
