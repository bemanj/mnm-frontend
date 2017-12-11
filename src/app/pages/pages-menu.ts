import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/charts/echarts',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Customer',
    icon: 'fa fa-address-card',
    children: [
      {
        title: 'Customer List',
        link: '/pages/customer/list',
      },
    ],
  },
  {
    title: 'Supplier',
    icon: 'fa fa-truck',
    children: [
      {
        title: 'Supplier List',
        link: '/pages/supplier/list',
      },
    ],
  },
  {
    title: 'Inventory',
    icon: 'nb-grid-a',
    children: [
      {
        title: 'Inventory List',
        link: '/pages/inventory/list',
      },
    ],
  },
  {
    title: 'Product',
    icon: 'nb-list',
    children: [
      {
        title: 'Product List',
        link: '/pages/product/list',
      },
      {
        title: 'Product Category',
        link: '/pages/product/category',
      },
      {
        title: 'Product Brand',
        link: '/pages/product/brandlist',
      },
    ],
  },
  {
    title: 'Sales',
    icon: 'nb-grid-b-outline',
    children: [
      {
        title: 'Sales Order',
        link: '/pages/sales/order',
      },
      {
        title: 'Sales Dashboard',
        link: '/pages/sales/dashboard',
      },
      {
        title: 'Sales Summary',
        link: '/pages/sales/summary',
      },
      {
        title: 'Sales Report',
        link: '/pages/sales/report',
      },
    ],
  },
  {
    title: 'Charts',
    icon: 'nb-bar-chart',
    children: [
      {
        title: 'Echarts',
        link: '/pages/charts/echarts',
      },
    ],
  },
];
