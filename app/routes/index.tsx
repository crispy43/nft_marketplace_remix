import type { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { ethers } from 'ethers';
import { useMetaMask } from 'metamask-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NETWORKS } from '~/constants/networks';
import { useTheme } from '~/hooks/theme-provider';
import { abiLoad } from '~/services/common/loaders.server';
import { Theme } from '~/types/common-types';
import type { NetworkNames } from '~/types/network-types';

export const loader: LoaderFunction = async ({ request }) => {
  return await abiLoad(request);
};

export default function Index() {
  const { t } = useTranslation();
  const { connect, ethereum, status } = useMetaMask();
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [, setTheme] = useTheme();

  console.log(status, ethereum);
  
  const verifyMessage = async () => {
    try {
      console.log(message, signature);
      const signerAddr = await ethers.utils.verifyMessage(message, signature);
      console.log(signerAddr, ethereum.selectedAddress);
      if (signerAddr == ethers.utils.getAddress(ethereum.selectedAddress)) {
        alert('검증 성공');
      } else {
        alert('검증 실패');
      }
  
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const signPersonal = async (message: string) => {
    console.log('account', ethereum.selectedAddress);
    console.log('message', message);

    try {
      const result = await ethereum.request({
        method: 'personal_sign',
        params: [ethereum.selectedAddress, message],
        from: ethereum.selectedAddress,
      });
      console.log('signPersonal', result);
      setSignature(result);

    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const requestAccounts = async () => {
    try {
      const result = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log('requestAccounts', result);

    } catch (error) {
      console.error(error);
    }
  };

  const getPermissions = async () => {
    try {
      const result = await ethereum.request({ method: 'wallet_getPermissions' });
      console.log('getPermissions', result);

    } catch (error) {
      console.error(error);
    }
  };

  const requestPermissions = async () => {
    try {
      const result = await ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
      });
      console.log('requestPermissions', result);

    } catch (error) {
      console.error(error);
    }
  };

  const switchEthereumChain = async (networkName: NetworkNames) => {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: NETWORKS[networkName].chainId }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              NETWORKS[networkName],
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (status == 'connected') {
      requestAccounts();
      getPermissions();
      ethereum.on('disconnect', (error: any) => console.log('disconnect', error));
      ethereum.on('accountsChanged', (accounts: Array<string>) => console.log('accountsChanged', accounts));
      ethereum.on('chainChanged', (chainId: string) => console.log('chainChanged', chainId));
    }
  }, [status]);

  // * NFT, marketplace
  const abis = useLoaderData();
  const erc721Address = '0xd0357566AFBF98F378c554184319F9fa46EDaC0c';
  const erc1155Address = '0x57f13EA747958584294d84c5A6aEF35ef5729B57';
  const exchangeAddress = '0xEA9375abA36458C87b4977E0b131730c3b817B4c';

  const getProvider = () => new ethers.providers.Web3Provider(ethereum);

  // const erc20 = new ethers.Contract(exchangeAddress, abis.ERC20Abi, getProvider());
  // const erc721 = new ethers.Contract(exchangeAddress, abis.ERC721Abi, getProvider());
  // const erc1155 = new ethers.Contract(exchangeAddress, abis.ERC1155Abi, getProvider());
  // const nftExchange = new ethers.Contract(exchangeAddress, abis.ExchangeAbi, getProvider());

  const getOwner = async () => {
    const nftExchange = new ethers.Contract(exchangeAddress, abis.ExchangeAbi, getProvider());
    const owner = await nftExchange.owner();
    console.log('owner', owner);
  };

  const getChainID = async () => {
    const nftExchange = new ethers.Contract(exchangeAddress, abis.ExchangeAbi, getProvider());
    const chainId = await nftExchange.getChainID();
    console.log('chainId', chainId.toString());
  };

  const [erc721OwnerAddress, setErc721OwnerAddress] = useState('');
  const [erc721TokenId, setErc721TokenId] = useState('');

  const erc721BalanceOf = async () => {
    const erc721 = new ethers.Contract(erc721Address, abis.ERC721Abi, getProvider());
    const balanceOf = await erc721.balanceOf(erc721OwnerAddress);
    console.log('balanceOf', balanceOf.toString());
  };

  const erc721OwnerOf = async () => {
    const erc721 = new ethers.Contract(erc721Address, abis.ERC721Abi, getProvider());
    const ownerOf = await erc721.ownerOf(erc721TokenId);
    console.log('ownerOf', ownerOf.toString());
  };

  const erc721TokenUri = async () => {
    const erc721 = new ethers.Contract(erc721Address, abis.ERC721Abi, getProvider());
    const tokenURI = await erc721.tokenURI(erc721TokenId);
    console.log('tokenURI', tokenURI);
  };

  const [ipfsUrl, setIpfsUrl] = useState('');
  const [erc721To, setErc721To] = useState('');

  const erc721Create = async () => {
    const provider = getProvider();
    const feeData = await provider.getFeeData();
    const signer = provider.getSigner();
    const erc721 = new ethers.Contract(erc721Address, abis.ERC721Abi, signer);
    const create = await erc721.create(
      erc721To,
      ipfsUrl,
      [
        [
          erc721To,
          1000,
        ],
      ],
      {
        maxFeePerGas: feeData.maxFeePerGas!.toString(),
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas!.toString(),
      },
    );
    console.log('erc721Create', create);
  };

  return (
    <>
      <div>
        <h1>
          {t('app-name')}
        </h1>
        <h2>
          랜딩 페이지
        </h2>
        <Link
          to='/main'
        >
          메인 페이지로
        </Link>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h1>
          메타마스크
        </h1>
        <button onClick={() => connect()}>
          연결
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <input type='text'
          onChange={(e) => setMessage(e.target.value)}
        />
        <p>
          {message}
        </p>
        <button
          onClick={() => signPersonal(message)}
        >
          서명

        </button>
        <button
          onClick={() => verifyMessage()}
        >
          검증

        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => getPermissions()}
        >
          퍼미션 확인

        </button>
        <button
          onClick={() => requestPermissions()}
        >
          퍼미션 요청

        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => switchEthereumChain('ethereum')}
        >
          이더리움으로 전환

        </button>
        <button
          onClick={() => switchEthereumChain('ropsten')}
        >
          로프스텐으로 전환

        </button>
        <button
          onClick={() => switchEthereumChain('klaytn')}
        >
          클레이튼으로 전환

        </button>
        <button
          onClick={() => switchEthereumChain('baobab')}
        >
          바오밥으로 전환

        </button>
      </div>

      <div style={{ marginTop: '40px' }}>
        <button
          onClick={() => setTheme(Theme.LIGHT)}
        >
          라이트 테마

        </button>
        <button
          onClick={() => setTheme(Theme.DARK)}
        >
          다크 테마

        </button>
      </div>

      <div style={{ marginTop: '40px' }}>
        <button
          onClick={() => getChainID()}
        >
          Chain ID 조회

        </button>
        <button
          onClick={() => getOwner()}
        >
          NFT Exchange contract Owner 조회

        </button>
      </div>

      <div style={{ marginTop: '40px' }}>
        <button
          onClick={() => setTheme(Theme.LIGHT)}
        >
          라이트 테마

        </button>
        <button
          onClick={() => setTheme(Theme.DARK)}
        >
          다크 테마

        </button>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h1>
          NFT 거래
        </h1>
        <div>
          <button
            onClick={() => getChainID()}
          >
            Chain ID 조회

          </button>
          <button
            onClick={() => getOwner()}
          >
            NFT Exchange contract Owner 조회

          </button>
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h1>
          ERC-721
        </h1>
        <div>
          <input type='text'
            onChange={(e) => setErc721OwnerAddress(e.target.value)}
            value={erc721OwnerAddress}
            placeholder='보유 주소...'
          />
          <input type='text'
            onChange={(e) => setErc721TokenId(e.target.value)}
            value={erc721TokenId}
            placeholder='토큰 ID...'
          />
          <button
            onClick={() => erc721BalanceOf()}
          >
            토큰 보유 개수 조회

          </button>
          <button
            onClick={() => erc721OwnerOf()}
          >
            토큰 보유 주소 조회

          </button>
          <button
            onClick={() => erc721TokenUri()}
          >
            토큰 URI 조회

          </button>
        </div>
        <div>
          <input type='text'
            onChange={(e) => setIpfsUrl(e.target.value)}
            value={ipfsUrl}
            placeholder='IPFS URL...'
          />
          <input type='text'
            onChange={(e) => setErc721To(e.target.value)}
            value={erc721To}
            placeholder='NFT 받는 주소...'
          />
          <button
            onClick={() => erc721Create()}
          >
            ERC721 민팅

          </button>
        </div>
      </div>
    </>
  );
}
