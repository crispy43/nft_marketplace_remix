/* eslint-disable react-hooks/exhaustive-deps */
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { ethers } from 'ethers';
import { useMetaMask } from 'metamask-react';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { personalSign } from '~/apis/metamask-api';
import { requestSignVerify } from '~/apis/wallet-api.server';
import DefaultLayout from '~/layouts/default-layout';
import { getAccessTokenSession } from '~/services/auth/access-token.server';
import { type BaseLoaderData, loadBaseData } from '~/services/common/loaders.server';

export const loader: LoaderFunction = async ({ request }) => {
  return json(await loadBaseData(request));
};

// * 서명 데이터 검증 및 인증 토큰 세션 생성
export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const result = await requestSignVerify(
    body.get('chainId') as string,
    body.get('messageKey') as string,
    body.get('signature') as string,
  );
  const accessTokenSession = await getAccessTokenSession(request);
  accessTokenSession.setAccessToken(result.token.accessToken);
  return redirect('/main', {
    headers: { 'Set-Cookie': await accessTokenSession.commit() },
  });
};

export default function Connect() {
  // TODO: locale에 따라 언어 처리
  const { t } = useTranslation();
  // TODO: accessToken 존재할때 분기 처리
  const { locale, theme, accessToken } = useLoaderData<BaseLoaderData>();
  const { connect, ethereum, status } = useMetaMask();
  const signMessageFetcher = useFetcher();
  const submitFetcher = useFetcher();

  // * handleConnect
  type HandleConnect = (
    status: string,
    address: string,
  ) => Promise<void>

  const handleConnect: HandleConnect = useCallback(
    async (status, address) => {
      switch (status) {
        case 'unavailable':
          alert('메타마스크를 사용할 수 없습니다.');
          break;
        case 'initializing':
          alert('잠시 기다려 주세요.');
          break;
        case 'notConnected':
          connect();
          break;
        case 'connecting':
          alert('이미 연결 중입니다.');
          break;
        case 'connected':
          signMessageFetcher.submit(
            { address: ethers.utils.getAddress(address) },
            { action: 'api/v1/wallet/sign-message', method: 'get' },
          );
          break;
      }
    }, [ethereum],
  );

  // * signMessage
  type SignMessage = (
    key: string,
    message: string,
  ) => Promise<void>

  const signMessage: SignMessage = useCallback(
    async (key, message) => {
      const signHash = await personalSign(ethereum, message);
      submitFetcher.submit({
        chainId: ethereum.chainId,
        messageKey: key,
        signature: signHash,
      }, { method: 'post' });
    }, [ethereum],
  );

  // * signMessageFetcher effect
  useEffect(() => {
    console.log('state', signMessageFetcher.state);
    console.log('type', signMessageFetcher.type);
    console.log('data', signMessageFetcher.data);
    console.log('submission', signMessageFetcher.submission);
    const { type, data } = signMessageFetcher;
    switch (type) {
      case 'done':
        signMessage(data.key, data.message);
        break;
      default:
        return;
    }
  }, [signMessageFetcher]);

  return (
    <DefaultLayout
      locale={locale}
      theme={theme}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
        data-view='device-with-header'
      >

        {/* 로고 및 설명 텍스트 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h3 >
            나의 일상에서 발견하는 대체 불가능한 가치
          </h3>
          <p
            style={{
              marginTop: '15px',
            }}
          >
            일상의 모든 분야에 가치를 부여하고 당신을 표현해 보세요.
          </p>
        </div>

        {/* 지갑 선택 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '500px',
          }}
        >
          <button
            style={{
              padding: '15px 30px',
            }}
          >
            <h1>
              MetaMask
            </h1>
          </button>
          <button
            style={{
              padding: '15px 30px',
            }}
            onClick={() => alert('준비 중입니다.')}
          >
            <h1>
              PsubWallet
            </h1>
          </button>
        </div>

        {/* 연결 버튼 */}
        <div>
          <button
            style={{
              padding: '15px 30px',
              backgroundColor: 'red',
            }}
            onClick={() => handleConnect(status, ethereum.selectedAddress)}
          >
            <h1>
              연결
            </h1>
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
}
