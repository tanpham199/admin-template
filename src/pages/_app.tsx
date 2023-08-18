import Auth from '@/auth';
import HomeLayout from '@/layouts/HomeLayout';
import '@/styles/globals.scss';
import { ConfigProvider, App as AntApp } from 'antd';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  Layout?: () => ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const Layout = Component.Layout ?? HomeLayout;

  return (
    <ConfigProvider>
      <AntApp>
        <Auth>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Auth>
      </AntApp>
    </ConfigProvider>
  );
};

// disabled ssr for entire app
export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
