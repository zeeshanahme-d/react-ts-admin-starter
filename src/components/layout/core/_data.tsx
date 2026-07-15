import { MenuProps } from 'antd';

export const sidebarItems: MenuProps['items'] = [
  {
    label: '',
    key: 'SubMenu',
    type: 'group',
    children: [
      {
        type: 'group',
        label: 'Main',
        children: [
          { label: 'Dashboard', key: '/' },
          { label: 'Cities', key: '/cities' },
          { label: 'Sales Agents', key: '/sales-agents' },
          { label: 'Vendors', key: '/vendors' },
          { label: 'Vendor Onboarding', key: '/vendor-onboarding' },
        ],
      },
      {
        type: 'group',
        label: 'Operations',
        children: [
          { label: 'Requests', key: '/requests' },
          { label: 'Reports & Analytics', key: '/requests-analytics' },
        ],
      },
      {
        type: 'group',
        label: 'System',
        children: [{ label: 'Settings', key: '/settings' }],
      },
    ],
  },
];
