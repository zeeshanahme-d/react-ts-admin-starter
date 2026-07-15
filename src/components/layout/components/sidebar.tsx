import { useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';

import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';

import Button from 'components/core-ui/button/button';
import ConfirmationModal from 'components/core-ui/confirmation-modal/confirmation-modal';

import { sidebarItems } from '../core/_data';

function Sidebar({ collapsedStates, isOverlay = false }: any) {
  const [selectedKeys, setSelectedKeys] = useState('');
  const [logoutOpen, setLogoutOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { collapsed, setCollapsed } = collapsedStates;

  useEffect(() => {
    const path = pathname.split('/')[1];
    setSelectedKeys(path ? `/${path}` : '/');
  }, [pathname]);

  const handleClick = (e: { key: string }) => {
    setSelectedKeys(e.key);
    navigate(e.key);
    // Close the overlay sidebar after navigating on small screens.
    if (isOverlay) setCollapsed(true);
  };

  return (
    <Sider
      collapsible
      trigger={null}
      collapsed={collapsed}
      collapsedWidth={0}
      breakpoint='md'
      width={240}
      className={`h-screen min-h-screen overflow-auto overflow-x-hidden bg-foreground ${isOverlay ? 'fixed! top-0 left-0 z-50' : ''
        }`}
    >
      <div className=''>
        <div className='px-2 my-3.5 flex justify-center'>
          <img src='/images/main-logo.svg' alt='Logo' width={100} height={100} className='w-32 h-auto' />
        </div>
        <Menu
          theme='light'
          mode='vertical'
          selectedKeys={[selectedKeys]}
          onClick={handleClick}
          items={sidebarItems}
          tooltip={false}
          className='bg-foreground border-none -mt-1'
          classNames={{
            itemTitle: 'text-text-secondary text-sm',
            item: 'text-white hover:bg-primary-hover [&.ant-menu-item-selected]:bg-primary-hover',
          }}
        />
      </div>
      <div className={`w-full flex flex-col gap-1 mt-auto`}>
        <div className='flex items-center gap-2 p-4.5'>
          <img
            src='https://img.magnific.com/free-photo/artist-white_1368-6282.jpg?semt=ais_hybrid&w=740&q=80'
            width={32}
            height={32}
            className='w-8 h-8 object-cover rounded-full'
          />
          <div className='flex flex-col gap-1'>
            <span className='text-white text-sm'>Sara Ahmed</span>
            <span className='text-text-secondary text-xs truncate max-w-36'>example@example.com</span>
          </div>
          <Button
            className={'flex-centered'}
            variant='text'
            aria-label='Profile settings'
            onClick={() => navigate('/profile')}
          >
            <IoSettingsOutline color='#fff' size={16} />
          </Button>
        </div>
        <Button
          className={
            'w-full gap-3 text-white h-12 flex items-center justify-start px-6 bg-[#3E4458] transition-all duration-150 hover:bg-[#4b5268] active:bg-[#343a4a] active:scale-[0.99]'
          }
          variant='text'
          onClick={() => setLogoutOpen(true)}
        >
          <FiLogOut size={16} />
          Logout
        </Button>
      </div>

      <ConfirmationModal
        open={logoutOpen}
        danger
        icon={<FiLogOut size={24} />}
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
