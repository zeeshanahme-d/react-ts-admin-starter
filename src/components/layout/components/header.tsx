import { useState } from 'react';
import { GoSidebarCollapse } from 'react-icons/go';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useLocation } from 'react-router-dom';

import { Button, Flex, Layout } from 'antd';

import NotificationDrawer from './NotificationDrawer';

// Page title shown in the header, keyed by the first path segment.
const PAGE_TITLES: Record<string, string> = {
  '': 'Dashboard',
  cities: 'Cities',
  'sales-agents': 'Sales Agents',
  vendors: 'Vendors',
  'vendor-onboarding': 'Vendor Onboarding',
  requests: 'Requests',
  'requests-analytics': 'Reports & Analytics',
  settings: 'Settings',
  profile: 'Profile',
};

function Header({ collapsedStates }: any) {
  const { collapsed, setCollapsed } = collapsedStates;
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { pathname } = useLocation();
  const pageTitle = PAGE_TITLES[pathname.split('/')[1] ?? ''] ?? 'Dashboard';

  return (
    <Layout.Header className='p-0! bg-white h-17.5 border-b border-border'>
      <Flex align='center' justify='space-between' className='h-full px-5'>
        <Flex align='center' gap={14}>
          <Button
            className='
              flex items-center justify-center rounded-sm
              w-7.5 h-7.5 p-0
              hover:bg-[#eaecf0] text-icon-primary transition-colors
            '
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <GoSidebarCollapse size={16} /> : <GoSidebarCollapse className='rotate-180' size={16} />}
          </Button>

          <span className='font-semibold text-base text-icon-primary whitespace-nowrap'>{pageTitle}</span>
        </Flex>

        <Flex align='center' gap={8}>
          <Button
            aria-label='Open notifications'
            onClick={() => setNotificationsOpen(true)}
            className='
              relative flex items-center justify-center rounded-sm
              w-7.5 h-7.5 p-0
              hover:bg-[#eaecf0] transition-colors
            '
          >
            <IoMdNotificationsOutline size={20} color='var(--color-text-secondary)' />
            <span className='absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger border border-white' />
          </Button>
        </Flex>
      </Flex>

      <NotificationDrawer open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </Layout.Header>
  );
}

export default Header;
