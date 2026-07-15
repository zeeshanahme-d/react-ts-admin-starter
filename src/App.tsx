import { StyleProvider } from '@ant-design/cssinjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider, theme } from 'antd';
import { AuthInit, AuthProvider } from 'auth/core/auth-context';
import { setupAxios } from 'auth/core/auth-helpers';
import rqConfigs from 'configs/rq-configs';

import Router from 'routes/router';

const lightTokens = {
  colorPrimary: '#44BD32',
  colorPrimaryHover: '#16A34A',
  colorPrimaryBg: '#E5E7EB',
  colorBgBase: '#E5E7EB',
  colorBgContainer: '#F8F9FA',
  colorBgLayout: '#F4F6F8',
  colorText: '#1B1E28',
  colorTextSecondary: '#7D859D',
  colorTextDisabled: 'rgba(31, 31, 31, 0.45)',
  colorBorder: '#E5E7EB',
  colorBorderSecondary: '#E5E7EB',
  colorBgMask: 'rgba(29, 29, 40, 0.43);',
  colorSplit: '#E5E7EB',
  colorError: '#E8545B',
  colorSuccess: '#16A34A',
  colorWarning: '#F5880B',
  colorInfo: '#5395EB',
};

setupAxios();
const queryClient = new QueryClient(rqConfigs);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthInit>
          <StyleProvider layer>
            <ConfigProvider
              theme={{
                algorithm: theme.defaultAlgorithm,
                token: {
                  ...lightTokens,
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 16,
                  borderRadius: 5,
                },
                components: {
                  Input: {
                    paddingBlock: 12,
                    fontSize: 16,
                    controlHeight: 40,
                  },
                  Button: {
                    fontSize: 14,
                    controlHeight: 40,
                    fontWeight: 500,
                  },
                  Form: {
                    labelFontSize: 14,
                  },
                  Select: {
                    fontSize: 16,
                    controlHeight: 40,
                    optionSelectedBg: '#44BD3214',
                    optionActiveBg: '#44BD3214',
                    colorBgBase: '#fff',
                    colorBgElevated: '#fff',
                  },
                  DatePicker: {
                    paddingBlock: 12,
                    fontSize: 16,
                  },
                  Modal: {
                    contentBg: '#fff',
                  },
                },
              }}
            >
              <Router />
            </ConfigProvider>
          </StyleProvider>
        </AuthInit>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
    </QueryClientProvider>
  );
}

export default App;
