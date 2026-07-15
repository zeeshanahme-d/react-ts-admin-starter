import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';

import WithSuspense from 'routes/with-suspense';

function Content() {
  return (
    <Layout.Content className='p-5 max-h-[calc(100vh-70px)] overflow-y-auto'>
      <WithSuspense>
        <Outlet />
      </WithSuspense>
    </Layout.Content>
  );
}

export default Content;
