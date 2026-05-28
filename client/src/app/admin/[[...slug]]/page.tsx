'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Premium loading fallback for the client-side Admin Panel
function AdminLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="relative flex items-center justify-center">
        {/* Outer subtle pulse ring */}
        <div className="absolute w-14 h-14 rounded-full border border-primary/20 animate-ping opacity-75" />

        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted/20 border border-border">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center gap-1.5 text-center">
        <h2 className="text-sm font-semibold tracking-widest uppercase text-foreground/80 animate-pulse">
          Admin Portal
        </h2>
        <p className="text-xs text-muted-foreground font-sans tracking-wide">
          Initializing secure context, please wait...
        </p>
      </div>
    </div>
  );
}

const AdminPanel = dynamic(
  () => import('@/admin-app/app').then((mod) => mod.AdminApp),
  {
    ssr: false,
    loading: () => <AdminLoading />,
  },
);

export default function AdminPage() {
  return <AdminPanel basename="/admin" />;
}
