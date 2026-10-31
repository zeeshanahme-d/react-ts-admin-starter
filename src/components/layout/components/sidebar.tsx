import { useState } from 'react';
import { LuChevronsUpDown, LuLogOut, LuSettings, LuUser } from 'react-icons/lu';
import { useLocation, useNavigate } from 'react-router-dom';

import { ConfigProvider, Dropdown, Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useSessionStore } from 'store/useSessionStore';

import ConfirmationModal from 'components/core-ui/confirmation-modal/confirmation-modal';

import { sidebarItems } from '../core/_data';

// Compact dark menu tokens, scoped to the sidebar only.
const menuTheme = {
  components: {
    Menu: {
      darkItemBg: 'transparent',
      darkSubMenuItemBg: 'transparent',
      darkItemColor: '#9CA3B8',
      darkItemHoverColor: '#fff',
      darkItemHoverBg: 'rgba(255, 255, 255, 0.05)',
      darkItemSelectedColor: '#fff',
      darkItemSelectedBg: 'rgba(255, 255, 255, 0.08)',
      darkGroupTitleColor: '#5F6680',
      itemHeight: 38,
      itemBorderRadius: 8,
      itemMarginInline: 10,
      itemMarginBlock: 2,
      iconSize: 17,
      fontSize: 14,
      groupTitleFontSize: 11,
    },
  },
};

const userMenuItems: MenuProps['items'] = [
  { key: '/profile', label: 'Profile', icon: <LuUser /> },
  { key: '/settings', label: 'Settings', icon: <LuSettings /> },
  { type: 'divider' },
  { key: 'logout', label: 'Log out', icon: <LuLogOut />, danger: true },
];

function Sidebar({ collapsedStates, isOverlay = false }: any) {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { collapsed, setCollapsed } = collapsedStates;
  const user = useSessionStore((s) => s.user);

  const selectedKey = `/${pathname.split('/')[1] ?? ''}`;
  // Open the dropdown that holds the current page on first render.
  const parentKey = sidebarItems
    ?.flatMap((group) => (group && 'children' in group ? (group.children ?? []) : []))
    .find((item) => item && 'children' in item && item.children?.some((child) => child?.key === selectedKey))?.key;

  const goTo = (key: string) => {
    navigate(key);
    // Close the overlay sidebar after navigating on small screens.
    if (isOverlay) setCollapsed(true);
  };

  const onUserMenuClick: MenuProps['onClick'] = ({ key }) => (key === 'logout' ? setLogoutOpen(true) : goTo(key));

  return (
    <Sider
      collapsible
      trigger={null}
      collapsed={collapsed}
      collapsedWidth={0}
      breakpoint='md'
      width={248}
      className={`h-screen overflow-hidden border-r border-white/5 bg-foreground! ${isOverlay ? 'fixed! top-0 left-0 z-50' : ''}`}
    >
      <div className='flex h-full flex-col'>
        <div className='flex h-17.5 shrink-0 items-center border-b border-white/5 px-5'>
          <img src='/images/main-logo.svg' alt='Logo' className='h-8 w-auto' />
        </div>

        <ConfigProvider theme={menuTheme}>
          <Menu
            theme='dark'
            mode='inline'
            selectedKeys={[selectedKey]}
            defaultOpenKeys={parentKey ? [String(parentKey)] : []}
            onClick={({ key }) => goTo(key)}
            items={sidebarItems}
            className='sidebar-menu flex-1 overflow-y-auto border-none! bg-transparent! py-2'
          />
        </ConfigProvider>

        <div className='shrink-0 border-t border-white/5 p-3'>
          <Dropdown menu={{ items: userMenuItems, onClick: onUserMenuClick }} trigger={['click']} placement='top'>
            <button
              type='button'
              className='flex w-full cursor-pointer items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-white/5'
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                className='size-9 shrink-0 rounded-full object-cover ring-2 ring-white/10'
              />
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-medium text-white'>{user?.name}</p>
                <p className='truncate text-xs text-text-secondary'>{user?.email}</p>
              </div>
              <LuChevronsUpDown size={16} className='shrink-0 text-text-secondary' />
            </button>
          </Dropdown>
        </div>
      </div>

      <ConfirmationModal
        open={logoutOpen}
        danger
        icon={<LuLogOut size={24} />}
        title='Log out?'
        description='You will be signed out of your account and returned to the login screen.'
        confirmText='Log out'
        cancelText='Cancel'
        onCancel={() => setLogoutOpen(false)}
        onConfirm={() => {
          setLogoutOpen(false);
          navigate('/logout');
        }}
      />
    </Sider>
  );
}

export default Sidebar;
