/* eslint-disable react-hooks/static-components */
/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState } from 'react';
import {
  useMenu,
  useLink,
  useRefineOptions,
  type TreeMenuItem,
} from '@refinedev/core';
import {
  SidebarRail as ShadcnSidebarRail,
  Sidebar as ShadcnSidebar,
  SidebarContent as ShadcnSidebarContent,
  SidebarHeader as ShadcnSidebarHeader,
  useSidebar as useShadcnSidebar,
  SidebarTrigger as ShadcnSidebarTrigger,
} from '@/components/ui/sidebar';

import { ChevronRight, ListIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

export function Sidebar() {
  const { open } = useShadcnSidebar();
  const { menuItems, selectedKey } = useMenu();

  return (
    <ShadcnSidebar
      collapsible="icon"
      className={cn(
        'border-r border-border/60 bg-sidebar transition-all duration-300 ease-in-out',
      )}
    >
      <ShadcnSidebarRail />
      <SidebarHeader />
      <ShadcnSidebarContent
        className={cn(
          'transition-all duration-300 ease-in-out',
          'flex flex-col gap-1.5 pt-4 pb-4',
          'bg-linear-to-b from-sidebar via-sidebar to-sidebar/95',
          {
            'px-4': open,
            'px-2': !open,
          },
        )}
      >
        {menuItems.map((item: TreeMenuItem) => (
          <SidebarItem
            key={item.key || item.name}
            item={item}
            selectedKey={selectedKey}
          />
        ))}
      </ShadcnSidebarContent>
    </ShadcnSidebar>
  );
}

type MenuItemProps = {
  item: TreeMenuItem;
  selectedKey?: string;
};

function SidebarItem({ item, selectedKey }: MenuItemProps) {
  const { open } = useShadcnSidebar();

  if (item.meta?.group) {
    return <SidebarItemGroup item={item} selectedKey={selectedKey} />;
  }

  if (item.children && item.children.length > 0) {
    if (open) {
      return <SidebarItemCollapsible item={item} selectedKey={selectedKey} />;
    }
    return <SidebarItemDropdown item={item} selectedKey={selectedKey} />;
  }

  return <SidebarItemLink item={item} selectedKey={selectedKey} />;
}

function SidebarItemGroup({ item, selectedKey }: MenuItemProps) {
  const { children } = item;
  const { open } = useShadcnSidebar();

  return (
    <div className="mt-5 mb-2 first:mt-0">
      <span
        className={cn(
          'ml-3 block text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground/60 transition-all duration-300',
          {
            'opacity-100 h-6': open,
            'opacity-0 h-0 overflow-hidden pointer-events-none': !open,
          },
        )}
      >
        {getDisplayName(item)}
      </span>
      {children && children.length > 0 && (
        <div className="flex flex-col gap-1 mt-1">
          {children.map((child: TreeMenuItem) => (
            <SidebarItem
              key={child.key || child.name}
              item={child}
              selectedKey={selectedKey}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarItemCollapsible({ item, selectedKey }: MenuItemProps) {
  const { name, children } = item;

  console.log('name', name);
  console.log('selectedKey', selectedKey);
  const [isOpen, setIsOpen] = useState(false);

  // Check if any child is selected to auto-expand
  const hasActiveChild = React.useMemo(() => {
    return children?.some((child) => child.key === selectedKey) ?? false;
  }, [children, selectedKey]);

  React.useEffect(() => {
    if (hasActiveChild) {
      setIsOpen(true);
    }
  }, [hasActiveChild]);

  return (
    <div className="w-full flex flex-col gap-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex w-full items-center justify-between py-2 px-3 text-sm font-medium text-foreground rounded-lg transition-all duration-200',
          'hover:bg-muted/60 text-muted-foreground hover:text-foreground',
          'group relative overflow-hidden',
        )}
      >
        <div className="flex items-center gap-3">
          <ItemIcon icon={item.meta?.icon ?? item.icon} isSelected={false} />
          <span className="tracking-[-0.01em]">{getDisplayName(item)}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <ChevronRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-foreground transition-colors" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden flex flex-col gap-1 pl-4 ml-3 border-l border-border/50 mt-0.5"
          >
            {children?.map((child: TreeMenuItem) => (
              <SidebarItem
                key={child.key || child.name}
                item={child}
                selectedKey={selectedKey}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarItemDropdown({ item, selectedKey }: MenuItemProps) {
  const { children } = item;
  const Link = useLink();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarButton item={item} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        align="start"
        className="w-48 p-1.5 ml-2"
      >
        <div className="px-2 py-1.5 text-[10px] font-bold tracking-wider uppercase text-muted-foreground/65 border-b border-border/40 mb-1">
          {getDisplayName(item)}
        </div>
        {children?.map((child: TreeMenuItem) => {
          const { key: childKey } = child;
          const isSelected = childKey === selectedKey;

          return (
            <DropdownMenuItem
              key={childKey || child.name}
              asChild
              className="p-0"
            >
              <Link
                to={child.route || ''}
                className={cn(
                  'flex w-full items-center gap-3 px-2.5 py-2 text-xs rounded-md transition-all duration-150',
                  {
                    'bg-primary text-primary-foreground font-semibold shadow-sm':
                      isSelected,
                    'text-muted-foreground hover:text-foreground hover:bg-muted':
                      !isSelected,
                  },
                )}
              >
                <ItemIcon
                  icon={child.meta?.icon ?? child.icon}
                  isSelected={isSelected}
                />
                <span>{getDisplayName(child)}</span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SidebarItemLink({ item, selectedKey }: MenuItemProps) {
  const isSelected = item.key === selectedKey;
  return <SidebarButton item={item} isSelected={isSelected} asLink={true} />;
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function SidebarHeader() {
  const { title } = useRefineOptions();
  const { open, isMobile } = useShadcnSidebar();

  return (
    <ShadcnSidebarHeader
      className={cn(
        'p-0 h-16 border-b border-border/60 flex-row items-center justify-between overflow-hidden transition-all duration-300',
        'bg-sidebar/95 backdrop-blur-md',
      )}
    >
      <div
        className={cn(
          'whitespace-nowrap flex flex-row h-full items-center justify-start gap-3 transition-all duration-300',
          {
            'pl-[7px]': !open,
            'pl-5': open,
          },
        )}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20 shrink-0 transform hover:scale-105 transition-transform duration-200">
          {title.icon ?? 'F'}
        </div>
        <div
          className={cn('flex flex-col transition-all duration-300', {
            'opacity-0 w-0 overflow-hidden': !open,
            'opacity-100 w-auto': open,
          })}
        >
          <span className="text-sm font-bold tracking-tight text-foreground leading-none">
            {title.text}
          </span>
          <span className="text-[9px] font-bold tracking-widest uppercase text-primary mt-1">
            Studio
          </span>
        </div>
      </div>

      <ShadcnSidebarTrigger
        className={cn(
          'text-muted-foreground mr-2 hover:bg-muted/80 rounded-md transition-all duration-200',
          {
            'opacity-0 pointer-events-none': !open && !isMobile,
            'opacity-100 pointer-events-auto': open || isMobile,
          },
        )}
      />
    </ShadcnSidebarHeader>
  );
}

function getDisplayName(item: TreeMenuItem) {
  return item.meta?.label ?? item.label ?? item.name;
}

type IconProps = {
  icon: React.ReactNode;
  isSelected?: boolean;
};

function ItemIcon({ icon, isSelected }: IconProps) {
  return (
    <div
      className={cn(
        'w-4 h-4 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110',
        {
          'text-muted-foreground/80': !isSelected,
          'text-foreground': isSelected,
        },
      )}
    >
      {icon ?? <ListIcon className="w-4 h-4" />}
    </div>
  );
}

type SidebarButtonProps = React.ComponentProps<typeof Button> & {
  item: TreeMenuItem;
  isSelected?: boolean;
  rightIcon?: React.ReactNode;
  asLink?: boolean;
  onClick?: () => void;
};

function SidebarButton({
  item,
  isSelected = false,
  rightIcon,
  asLink = false,
  className,
  onClick,
  ...props
}: SidebarButtonProps) {
  const Link = useLink();
  const { open } = useShadcnSidebar();

  const buttonContent = (
    <div
      className={cn(
        'flex w-full items-center justify-start gap-3 relative z-10',
        {
          'justify-center': !open,
        },
      )}
    >
      <ItemIcon icon={item.meta?.icon ?? item.icon} isSelected={isSelected} />
      <span
        className={cn('tracking-[-0.01em] transition-opacity duration-200', {
          'flex-1 text-left': rightIcon,
          'line-clamp-1 truncate': !rightIcon,
          'font-medium text-muted-foreground hover:text-foreground':
            !isSelected,
          'font-semibold text-foreground': isSelected,
          'opacity-100': open,
          'opacity-0 w-0 md:hidden': !open,
        })}
      >
        {getDisplayName(item)}
      </span>
      {rightIcon}
    </div>
  );

  return (
    <Button
      asChild={!!(asLink && item.route)}
      variant="ghost"
      size="lg"
      className={cn(
        'flex w-full items-center justify-start py-2.5 px-3 text-sm rounded-lg transition-all duration-300 relative group overflow-hidden',
        {
          'bg-neutral-100/90 text-neutral-900 shadow-xs border border-border/10 dark:bg-neutral-800/90 dark:text-neutral-50':
            isSelected,
          'hover:bg-neutral-100/50 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50':
            !isSelected,
          'px-0 justify-center items-center': !open,
        },
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {asLink && item.route ? (
        <Link to={item.route} className="flex w-full items-center gap-3">
          {buttonContent}
          {isSelected && (
            <motion.div
              layoutId="activeBar"
              className="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-r-md bg-neutral-900 dark:bg-neutral-50"
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />
          )}
        </Link>
      ) : (
        <>
          {buttonContent}
          {isSelected && (
            <motion.div
              layoutId="activeBar"
              className="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-r-md bg-neutral-900 dark:bg-neutral-50"
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />
          )}
        </>
      )}
    </Button>
  );
}

Sidebar.displayName = 'Sidebar';
