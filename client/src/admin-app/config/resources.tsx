import type { ResourceProps } from '@refinedev/core';
import {
  BellIcon,
  CreditCardIcon,
  DollarSignIcon,
  FileIcon,
  FolderIcon,
  Store,
  SettingsIcon,
  UserIcon,
} from 'lucide-react';

export const resources: ResourceProps[] = [
  {
    name: 'dashboard',
    list: '/',
    meta: {
      label: 'Dashboard',
      icon: <Store />,
    },
  },
  {
    name: 'posts',
    list: '/posts',
    create: '/posts/create',
    edit: '/posts/edit/:id',
    show: '/posts/show/:id',
    clone: '/posts/clone/:id',
    meta: {
      icon: <FileIcon />,
    },
  },
  {
    name: 'users',
    list: '/users',
    meta: { icon: <UserIcon /> },
  },
  {
    name: 'settings',
    meta: { icon: <SettingsIcon /> },
  },
  {
    name: 'Directory',
    list: '/directory',
    meta: { icon: <FolderIcon /> },
  },
  {
    name: 'profile',
    list: '/profile',
    meta: {
      parent: 'settings',
    },
  },
  {
    name: 'notifications',
    list: '/settings/notifications',
    edit: '/settings/notifications/:id/edit',
    meta: {
      icon: <BellIcon />,
      parent: 'settings',
    },
  },
  {
    name: 'finance',
    meta: {
      group: true,
    },
  },
  {
    name: 'expenses',
    list: '/expenses',
    meta: {
      icon: <CreditCardIcon />,
      parent: 'finance',
    },
  },
  {
    name: 'income',
    list: '/income',
    meta: {
      icon: <DollarSignIcon />,
      parent: 'finance',
    },
  },
];
