import { Layout } from '@/components/admin-ui/layouts/layout';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return <Layout>{children}</Layout>;
};
