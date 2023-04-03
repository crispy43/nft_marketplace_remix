import { json } from '@remix-run/node';

import { ERC20Abi, ERC721Abi, ERC1155Abi, ExchangeAbi } from '~/constants/contracts';
import type { Theme } from '~/types/common-types';

import { getAccessTokenSession } from '../auth/access-token.server';
import i18next from '../localization/i18next.server';
import { getThemeSession } from '../theme/theme.server';

// * loadBaseData
export type BaseLoaderData = {
  locale: string;
  theme: Theme | null;
  accessToken: string | null;
}

type LoadBaseData = (
  request: Request,
) => Promise<BaseLoaderData>

export const loadBaseData: LoadBaseData = async (request: Request) => {
  const result = await Promise.all([
    i18next.getLocale(request),
    getThemeSession(request),
    getAccessTokenSession(request),
  ]);
  return {
    locale: result[0],
    theme: result[1].getTheme(),
    accessToken: result[2].getAccessToken(),
  };
};

// * loadAbis
export const abiLoad = async (request: Request) => {
  return json({
    ERC20Abi: ERC20Abi,
    ERC721Abi: ERC721Abi,
    ERC1155Abi: ERC1155Abi,
    ExchangeAbi: ExchangeAbi,
  });
};
