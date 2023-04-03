import { createCookieSessionStorage } from '@remix-run/node';

import { getServerEnv } from '~/utils/misc';

export const {
  getSession,
  commitSession,
  destroySession,
} = createCookieSessionStorage({
  cookie: {
    name: 'psub_box_access_token',
    secure: true,
    secrets: [getServerEnv('SESSION_SECRET')],
    sameSite: 'lax',
    path: '/',
    maxAge: 86_400, // 1일 후 만료
    httpOnly: true,
  },
});

export const getAccessTokenSession = async (request: Request) => {
  const session = await getSession(request.headers.get('Cookie'));
  return {
    getAccessToken: (): string | null => {
      const tokenValue = session.get('accessToken');
      return tokenValue ? tokenValue : null;
    },
    setAccessToken: (token: string | null) => {
      session.set('accessToken', token);
    },
    commit: () => commitSession(session),
  };
};
