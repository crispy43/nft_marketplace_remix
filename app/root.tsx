import type { HeadersFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import clsx from 'clsx';
import { MetaMaskProvider } from 'metamask-react';
import { useTranslation } from 'react-i18next';
import { useChangeLanguage } from 'remix-i18next';

import { NonFlashOfWrongThemeEls, ThemeProvider } from '~/hooks/theme-provider';
import i18next from '~/services/localization/i18next.server';
import { getThemeSession } from '~/services/theme/theme.server';
import classStyles from '~/styles/class.css';
import darkStyles from '~/styles/dark.css';
import dataStyles from '~/styles/data.css';
import flexStyles from '~/styles/flex.css';
import globalStyles from '~/styles/global.css';
import lightStyles from '~/styles/light.css';
import resetStyles from '~/styles/reset.css';

import type { Theme } from './types/common-types';

type LoaderRootData = {
  locale: string;
  theme: Theme | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const locale = await i18next.getLocale(request);
  const { getTheme } = await getThemeSession(request);

  return json<LoaderRootData>({
    locale,
    theme: getTheme(),
  });
};

export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'no-cache',
  };
};

export const meta: MetaFunction = () => {
  return {
    charSet: 'utf-8',
    viewport: 'width=device-width, initial-scale=1',
    title: 'PsuBox',
    description: 'NFT Marketplace',
    keywords: 'NFT, Marketplace',
  };
};

export const links = () => {
  return [
    {
      rel: 'icon',
      href: '/favicon.ico',
      type: 'image/ico',
    },
    {
      rel: 'stylesheet',
      href: resetStyles,
    },
    {
      rel: 'stylesheet',
      href: globalStyles,
    },
    {
      rel: 'stylesheet',
      href: dataStyles,
    },
    {
      rel: 'stylesheet',
      href: flexStyles,
    },
    {
      rel: 'stylesheet',
      href: classStyles,
    },
    {
      rel: 'stylesheet',
      href: lightStyles,
    },
    {
      rel: 'stylesheet',
      href: darkStyles,
    },
    {
      rel: 'stylesheet',
      as: 'style',
      crossOrigin: 'true',
      href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.4/dist/web/static/pretendard.css',
    },
  ];
};

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: 'common',
};

const App = () => {
  const { locale, theme } = useLoaderData<LoaderRootData>();
  const { i18n } = useTranslation();

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);

  return (
    <html lang={locale}
      dir={i18n.dir()}
      className={clsx(theme)}
    >
      <head>
        <Meta />
        <Links />
        <NonFlashOfWrongThemeEls ssrTheme={Boolean(theme)} />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
};

export default function Root() {
  const { theme } = useLoaderData<LoaderRootData>();

  return (
    <ThemeProvider specifiedTheme={theme}>
      <MetaMaskProvider>
        <App />
      </MetaMaskProvider>
    </ThemeProvider>
  );
};
