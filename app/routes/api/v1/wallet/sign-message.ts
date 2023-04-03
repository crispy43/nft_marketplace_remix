import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { ethers } from 'ethers';
import httpStatus from 'http-status';
import invariant from 'tiny-invariant';

import { requestSignMessage } from '~/apis/wallet-api.server';
import { getQueriesFromUrl } from '~/utils/filters';

export const loader: LoaderFunction = async ({ request }) => {
  const { address } = getQueriesFromUrl(request.url);
  invariant(address, 'Expected address param');

  const signMessage = await requestSignMessage(ethers.utils.getAddress(address));
  return json({
    key: signMessage.key,
    message: signMessage.body.message,
  }, { status: httpStatus.OK });
};
