'use client';

import type { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';
import { ThemeProvider } from '../themes/theme-provider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Sidebar } from './sidebar';
import { Header } from './header';

export function Layout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Sidebar />
        <SidebarInset>
          <Header />
          <main
            className={cn(
              '@container/main',
              'container',
              'mx-auto',
              'relative',
              'w-full',
              'flex',
              'flex-col',
              'flex-1',
              'px-2',
              'pt-4',
              'md:p-4',
              'lg:px-6',
              'lg:pt-6',
            )}
          >
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

Layout.displayName = 'Layout';
