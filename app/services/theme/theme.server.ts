import { createCookieSessionStorage } from '@remix-run/node';

import { isTheme } from '~/hooks/theme-provider';
import { Theme } from '~/types/common-types';
import { getServerEnv } from '~/utils/misc';

export const {
  getSession,
  commitSession,
  destroySession,
} = createCookieSessionStorage({
  cookie: {
    name: 'psub_box_theme',
    secure: true,
    secrets: [getServerEnv('SESSION_SECRET')],
    sameSite: 'lax',
    path: '/',
    maxAge: 31_536_000_000, // 1년
    httpOnly: true,
  },
});

export const getThemeSession = async (request: Request) => {
  const session = await getSession(request.headers.get('Cookie'));
  return {
    getTheme: () => {
      const themeValue = session.get('theme');
      return isTheme(themeValue) ? themeValue : Theme.DARK;
    },
    setTheme: (theme: Theme) => session.set('theme', theme),
    commit: () => commitSession(session),
  };
};
