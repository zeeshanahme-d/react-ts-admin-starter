import { useEffect, useState } from 'react';

import { Layout as LayoutAnt } from 'antd';

import useScreenSize from 'hooks/use-viewport-width';

import ScrollToTop from 'helpers/scroll-to-top';

import Content from './components/content';
import Header from './components/header';
import Sidebar from './components/sidebar';

function Layout() {
  const { isMobileOrTablet } = useScreenSize();
  const [collapsed, setCollapsed] = useState(false);
  const collapsedStates = { collapsed, setCollapsed };

  // On small screens the sidebar overlays the content, so keep it collapsed by
  // default and expand automatically once there is room for it on desktop.
  useEffect(() => {
    setCollapsed(isMobileOrTablet);
  }, [isMobileOrTablet]);

  return (
    <LayoutAnt className='main-layout h-screen overflow-hidden'>
      <ScrollToTop />
      <Sidebar collapsedStates={collapsedStates} isOverlay={isMobileOrTablet} />

      {/* Backdrop shown when the overlay sidebar is open on small screens */}
      {isMobileOrTablet && !collapsed && (
        <div className='fixed inset-0 z-40 bg-black/40' onClick={() => setCollapsed(true)} aria-hidden='true' />
      )}

      <LayoutAnt>
        <Header collapsedStates={collapsedStates} />
        <Content />
      </LayoutAnt>
    </LayoutAnt>
  );
}

export default Layout;
