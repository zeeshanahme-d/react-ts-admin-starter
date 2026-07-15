import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from 'components/layout/layout';

import CitiesManagement from 'pages/cities-mangement/cities-management';
import Dashboard from 'pages/dashboard/dashboard';
import Profile from 'pages/profile/profile';
import RequestsAnalytics from 'pages/requests-analytics/requests-analytics';
import Requests from 'pages/requests/requests';
import SalesAgents from 'pages/sales-agents/sales-agents';
import Settings from 'pages/settings/settings';
import VendorOnboarding from 'pages/vendor-onboarding/vendor-onboarding';
import Vendors from 'pages/vendors/vendors';

function PrivateRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Dashboard />} />
        <Route path='/cities' element={<CitiesManagement />} />
        <Route path='/sales-agents' element={<SalesAgents />} />
        <Route path='/vendors' element={<Vendors />} />
        <Route path='/vendor-onboarding' element={<VendorOnboarding />} />
        <Route path='/requests-analytics' element={<RequestsAnalytics />} />
        <Route path='/requests' element={<Requests />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/profile' element={<Profile />} />
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}

export { PrivateRoutes };
