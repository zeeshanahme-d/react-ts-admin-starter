import { LuInbox, LuLayoutDashboard, LuMapPin, LuSettings, LuStore, LuUsers } from 'react-icons/lu';

import { MenuProps } from 'antd';

// Leaf keys are routes; items with `children` render as collapsible dropdowns.
export const sidebarItems: MenuProps['items'] = [
  {
    type: 'group',
    label: 'Overview',
    children: [
      { key: '/', label: 'Dashboard', icon: <LuLayoutDashboard /> },
      { key: '/cities', label: 'Cities', icon: <LuMapPin /> },
      { key: '/sales-agents', label: 'Sales Agents', icon: <LuUsers /> },
    ],
  },
  {
    type: 'group',
    label: 'Management',
    children: [
      {
        key: 'vendors-menu',
        label: 'Vendors',
        icon: <LuStore />,
        children: [
          { key: '/vendors', label: 'All Vendors' },
          { key: '/vendor-onboarding', label: 'Onboarding' },
        ],
      },
      {
        key: 'requests-menu',
        label: 'Requests',
        icon: <LuInbox />,
        children: [
          { key: '/requests', label: 'All Requests' },
          { key: '/requests-analytics', label: 'Reports & Analytics' },
        ],
      },
    ],
  },
  {
    type: 'group',
    label: 'System',
    children: [{ key: '/settings', label: 'Settings', icon: <LuSettings /> }],
  },
];
