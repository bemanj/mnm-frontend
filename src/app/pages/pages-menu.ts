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
