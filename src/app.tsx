import { ReactNode } from 'react';
import ConfigProvider from '@taroify/core/config-provider';
import '@taroify/core/button/style';
import '@taroify/core/cell/style';
import '@taroify/core/empty/style';
import '@taroify/core/field/style';
import '@taroify/core/input/style';
import '@taroify/core/notice-bar/style';
import '@taroify/core/radio/style';
import '@taroify/core/tag/style';
import { useLaunch } from '@tarojs/taro';
import { useAppStore } from '@/features/app-context/store';

function App(props: { children?: ReactNode }) {
  useLaunch(() => {
    useAppStore.getState().hydrateFromStorage();
  });

  return (
    <ConfigProvider
      theme={{
        colorPrimary: '#8c5f2a',
        buttonPrimaryBackgroundColor: '#8c5f2a',
        buttonPrimaryBorderColor: '#8c5f2a',
        cellBackgroundColor: '#fffaf3',
        fieldLabelColor: '#4f4030',
        fieldInputTextColor: '#2f2418',
        noticeBarBackgroundColor: '#fff8e8',
      }}
    >
      {props.children}
    </ConfigProvider>
  );
}

export default App;
