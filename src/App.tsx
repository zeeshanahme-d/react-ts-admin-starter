import { StyleProvider } from '@ant-design/cssinjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider, theme } from 'antd';
import { setupAxios } from 'auth/core/auth-helpers';
import rqConfigs from 'configs/rq-configs';
import { useTheme } from 'store/useTheme';

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
  colorBgMask: 'rgba(29, 29, 40, 0.43)',
  colorSplit: '#E5E7EB',
  colorError: '#E8545B',
  colorSuccess: '#16A34A',
  colorWarning: '#F5880B',
  colorInfo: '#5395EB',
};

// Same brand colors; only the neutrals change. Keep in sync with [data-theme='dark'] in styles/variable.css.
const darkTokens = {
  ...lightTokens,
  colorPrimaryBg: '#262A36',
  colorBgBase: '#0F1117',
  colorBgContainer: '#161922',
  colorBgElevated: '#1A1D26',
  colorBgLayout: '#0F1117',
  colorText: '#E6E8EF',
  colorTextSecondary: '#8B93A7',
  colorTextDisabled: 'rgba(230, 232, 239, 0.35)',
  colorBorder: '#2A2E3A',
  colorBorderSecondary: '#2A2E3A',
  colorBgMask: 'rgba(0, 0, 0, 0.6)',
  colorSplit: '#2A2E3A',
};

setupAxios();
const queryClient = new QueryClient(rqConfigs);

function App() {
  const isDark = useTheme((s) => s.theme === 'dark');
  const elevatedBg = isDark ? darkTokens.colorBgElevated : '#fff';

  return (
    <QueryClientProvider client={queryClient}>
      <StyleProvider layer>
        <ConfigProvider
          theme={{
            algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
            token: {
              ...(isDark ? darkTokens : lightTokens),
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
                colorBgBase: elevatedBg,
                colorBgElevated: elevatedBg,
              },
              DatePicker: {
                paddingBlock: 12,
                fontSize: 16,
              },
              Modal: {
                contentBg: elevatedBg,
              },
            },
          }}
        >
          <Router />
        </ConfigProvider>
      </StyleProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
    </QueryClientProvider>
  );
}

export default App;
