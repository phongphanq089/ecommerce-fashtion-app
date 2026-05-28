'use client';

import * as React from 'react';
import { useMenu, useGo } from '@refinedev/core';
import { SearchIcon } from 'lucide-react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

interface CommandPaletteProps {
  /** Custom trigger element. Defaults to a search-bar style button. */
  trigger?: React.ReactNode;
  /** Extra class names for the default trigger button. */
  className?: string;
}

export function CommandPalette({ trigger, className }: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false);
  const { menuItems } = useMenu();
  const go = useGo();

  // Global keyboard shortcut: ⌘K / Ctrl+K
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  function handleSelect(url: string) {
    setOpen(false);
    go({ to: url });
  }

  /** Flatten menu items recursively, keeping track of parent label */
  function flattenItems(
    items: typeof menuItems,
    parentLabel?: string,
  ): Array<{
    key: string;
    label: string;
    icon?: React.ReactNode;
    route: string;
    group: string;
  }> {
    const result: ReturnType<typeof flattenItems> = [];

    for (const item of items) {
      // Items with children are group headers (e.g., "settings", "finance")
      if (item.children && item.children.length > 0) {
        result.push(...flattenItems(item.children, item.label));
      } else if (item.route) {
        result.push({
          key: item.key,
          label: item.label || '',
          icon: item.icon,
          route: item.route,
          group: parentLabel ?? 'Navigation',
        });
      }
    }

    return result;
  }

  const flatItems = flattenItems(menuItems);

  // Group items by their group label
  const grouped = flatItems.reduce<Record<string, typeof flatItems>>(
    (acc, item) => {
      if (!acc[item.group]) acc[item.group] = [];
      acc[item.group].push(item);
      return acc;
    },
    {},
  );

  const groupEntries = Object.entries(grouped);

  const defaultTrigger = (
    <button
      onClick={() => setOpen(true)}
      className={cn(
        'hidden sm:flex items-center gap-2',
        'h-8 px-3 rounded-md',
        'border border-border',
        'bg-muted/40 hover:bg-muted',
        'text-muted-foreground text-sm font-normal',
        'transition-colors',
        className,
      )}
      aria-label="Open command palette (⌘K)"
    >
      <SearchIcon className="h-3.5 w-3.5 shrink-0" />
      <span>Search resources...</span>
      <kbd className="ml-1 pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[10px] text-muted-foreground/80">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  );

  return (
    <>
      {/* Trigger */}
      <div
        onClick={() => setOpen(true)}
        className="contents cursor-pointer"
        role="button"
        aria-label="Open command palette"
      >
        {trigger ?? defaultTrigger}
      </div>

      {/* Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Search resources..." />
          <CommandList>
            <CommandEmpty>No resources found.</CommandEmpty>

            {groupEntries.map(([group, items], idx) => (
              <React.Fragment key={group}>
                {idx > 0 && <CommandSeparator />}
                <CommandGroup heading={group}>
                  {items.map((item) => (
                    <CommandItem
                      key={item.key}
                      value={item.label}
                      onSelect={() => handleSelect(item.route)}
                    >
                      {item.icon && (
                        <span className="[&>svg]:size-4">{item.icon}</span>
                      )}
                      <span className="capitalize">{item.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </React.Fragment>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}

CommandPalette.displayName = 'CommandPalette';
