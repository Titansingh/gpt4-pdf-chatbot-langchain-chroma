import '@/styles/base.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { NextUIProvider } from '@nextui-org/react';
import { RecoilRoot } from 'recoil';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
      <NextUIProvider>
      <main className={inter.variable}>
        <Component {...pageProps} />
      </main>
      </NextUIProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
