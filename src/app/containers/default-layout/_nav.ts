import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },  
  {
    title: true,
    name: 'Modules'
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-calculator'
  },
  {
    name: 'Reports',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Users',
        url: '/reports',
        icon: 'icon-cursor'
      },
      {
        name: 'Transactions',
        url: '/transactions',
        icon: 'icon-cursor'
      }
    ]
  },
];
