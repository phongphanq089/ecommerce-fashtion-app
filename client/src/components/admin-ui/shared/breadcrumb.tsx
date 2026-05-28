/* eslint-disable react-hooks/static-components */
'use client';

import { Fragment, useMemo } from 'react';
import { Home, Store } from 'lucide-react';
import {
  matchResourceFromRoute,
  useBreadcrumb,
  useLink,
  useResourceParams,
} from '@refinedev/core';
import {
  BreadcrumbSeparator as ShadcnBreadcrumbSeparator,
  BreadcrumbItem as ShadcnBreadcrumbItem,
  BreadcrumbList as ShadcnBreadcrumbList,
  BreadcrumbPage as ShadcnBreadcrumbPage,
  Breadcrumb as ShadcnBreadcrumb,
} from '@/components/ui/breadcrumb';

export function Breadcrumb() {
  const Link = useLink();
  const { breadcrumbs } = useBreadcrumb();
  const { resources } = useResourceParams();
  const rootRouteResource = matchResourceFromRoute('/', resources);

  const breadCrumbItems = useMemo(() => {
    const list: {
      key: string;
      href: string;
      Component: React.ReactNode;
    }[] = [];

    const homeIcon = rootRouteResource?.resource?.meta?.icon ?? <Store />;

    list.push({
      key: 'breadcrumb-item-home',
      href: rootRouteResource.matchedRoute ?? '/',
      Component: (
        <Link
          to={rootRouteResource.matchedRoute ?? '/'}
          className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors [&_svg]:w-3.5 [&_svg]:h-3.5"
        >
          {homeIcon}
        </Link>
      ),
    });

    for (const { label, href } of breadcrumbs) {
      list.push({
        key: `breadcrumb-item-${label}`,
        href: href ?? '',
        Component: href ? <Link to={href}>{label}</Link> : <span>{label}</span>,
      });
    }

    return list;
  }, [breadcrumbs, Link, rootRouteResource]);

  return (
    <ShadcnBreadcrumb>
      <ShadcnBreadcrumbList>
        {breadCrumbItems.map((item, index) => {
          if (index === breadCrumbItems.length - 1) {
            return (
              <ShadcnBreadcrumbPage key={item.key}>
                {item.Component}
              </ShadcnBreadcrumbPage>
            );
          }

          return (
            <Fragment key={item.key}>
              <ShadcnBreadcrumbItem key={item.key}>
                {item.Component}
              </ShadcnBreadcrumbItem>
              <ShadcnBreadcrumbSeparator />
            </Fragment>
          );
        })}
      </ShadcnBreadcrumbList>
    </ShadcnBreadcrumb>
  );
}

Breadcrumb.displayName = 'Breadcrumb';
