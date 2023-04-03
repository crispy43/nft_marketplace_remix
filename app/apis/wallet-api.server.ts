import { handleResponse } from '~/utils/handlers';
import { getServerEnv } from '~/utils/misc';

// * requestSignMessage
// 서명 메세지 요청
type RequestSignMessage = (
  address: string,
) => Promise<any>

export const requestSignMessage: RequestSignMessage = async (
  address,
) => {
  try {
    return await handleResponse(
      await fetch(`${getServerEnv('SERVER_BASE_URL')}/api/v1/wallet/${address}/sign-message`)
    );

  } catch (error) {
    console.error(error);
    throw error;
  }
};

// * requestSignVerify
// 메세지 서명 검증
type RequestSignVerify = (
  chainId: string,
  messageKey: string,
  signature: string,
) => Promise<any>

export const requestSignVerify: RequestSignVerify = async (
  chainId,
  messageKey,
  signature,
) => {
  try {
    return await handleResponse(
      await fetch(`${getServerEnv('SERVER_BASE_URL')}/api/v1/wallet/sign-verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chainId,
          messageKey,
          signature,
        }),
      })
    );

  } catch (error) {
    console.error(error);
    throw error;
  }
};
