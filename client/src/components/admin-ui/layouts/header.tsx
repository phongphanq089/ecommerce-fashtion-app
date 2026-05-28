import {
  useRefineOptions,
  useActiveAuthProvider,
  useLogout,
} from '@refinedev/core';

import { LogOutIcon, SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { ThemeToggle } from '../themes/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserAvatar } from '../shared/user-avatar';
import { CommandPalette } from '../shared/command-palette';
import { Breadcrumb } from '../shared/breadcrumb';

export const Header = () => {
  const { isMobile } = useSidebar();

  return <>{isMobile ? <MobileHeader /> : <DesktopHeader />}</>;
};

function DesktopHeader() {
  return (
    <header
      className={cn(
        'sticky',
        'top-0',
        'flex',
        'h-16',
        'shrink-0',
        'items-center',
        'gap-3',
        'border-b',
        'border-border/60',
        'bg-sidebar/95',
        'backdrop-blur-md',
        'px-4',
        'justify-between',
        'z-40',
      )}
    >
      <Breadcrumb />
      {/* Search / Command palette */}
      <div className="flex flex-row items-center gap-2">
        <CommandPalette />
        <ThemeToggle />
        <UserDropdown />
      </div>
    </header>
  );
}

function MobileHeader() {
  const { open, isMobile } = useSidebar();

  const { title } = useRefineOptions();

  return (
    <header
      className={cn(
        'sticky',
        'top-0',
        'flex',
        'h-12',
        'shrink-0',
        'items-center',
        'gap-2',
        'border-b',
        'border-border',
        'bg-sidebar',
        'pr-3',
        'justify-between',
        'z-40',
      )}
    >
      <SidebarTrigger
        className={cn('text-muted-foreground', 'rotate-180', 'ml-1', {
          'opacity-0': open,
          'opacity-100': !open || isMobile,
          'pointer-events-auto': !open || isMobile,
          'pointer-events-none': open && !isMobile,
        })}
      />

      <div
        className={cn(
          'whitespace-nowrap',
          'flex',
          'flex-row',
          'h-full',
          'items-center',
          'justify-start',
          'gap-2',
          'transition-discrete',
          'duration-200',
          {
            'pl-3': !open,
            'pl-5': open,
          },
        )}
      >
        <div>{title.icon}</div>
        <h2
          className={cn(
            'text-sm',
            'font-bold',
            'transition-opacity',
            'duration-200',
            {
              'opacity-0': !open,
              'opacity-100': open,
            },
          )}
        >
          {title.text}
        </h2>
      </div>

      {/* Icon-only command palette trigger on mobile */}
      <CommandPalette
        trigger={
          <button
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-md',
              'text-muted-foreground hover:text-foreground hover:bg-muted',
              'transition-colors',
            )}
            aria-label="Open command palette"
          >
            <SearchIcon className="h-4 w-4" />
          </button>
        }
      />
      <ThemeToggle className={cn('h-8', 'w-8')} />
    </header>
  );
}

const UserDropdown = () => {
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const authProvider = useActiveAuthProvider();

  if (!authProvider?.getIdentity) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            logout();
          }}
        >
          <LogOutIcon
            className={cn('text-destructive', 'hover:text-destructive')}
          />
          <span className={cn('text-destructive', 'hover:text-destructive')}>
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Header.displayName = 'Header';
MobileHeader.displayName = 'MobileHeader';
DesktopHeader.displayName = 'DesktopHeader';
