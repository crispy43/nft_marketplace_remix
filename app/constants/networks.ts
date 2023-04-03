import type { Network, NetworksType } from '~/types/network-types';

export const ETHEREUM_NETWORK: Network = {
  chainId: '0x1',
  chainName: 'Ethereum Main Network',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://mainnet.infura.io/v3/b08fed8350fe4755b30280e2364f9deb'], // custom infura
  blockExplorerUrls: ['https://etherscan.io'],
};

export const ROPSTEN_NETWORK: Network = {
  chainId: '0x3',
  chainName: 'Ropsten Test Network',
  nativeCurrency: {
    name: 'RopstenETH',
    symbol: 'RopstenETH',
    decimals: 18,
  },
  rpcUrls: ['https://ropsten.infura.io/v3/b08fed8350fe4755b30280e2364f9deb'], // custom infura
  blockExplorerUrls: ['https://ropsten.etherscan.io'],
};

export const KLAYTN_NETWORK: Network = {
  chainId: '0x2019',
  chainName: 'Klaytn Mainnet',
  nativeCurrency: {
    name: 'KLAY',
    symbol: 'KLAY',
    decimals: 18,
  },
  rpcUrls: ['https://public-node-api.klaytnapi.com/v1/cypress'],
  blockExplorerUrls: ['https://scope.klaytn.com'],
};

export const BAOBAB_NETWORK: Network = {
  chainId: '0x3e9',
  chainName: 'Klaytn Baobab',
  nativeCurrency: {
    name: 'KLAY',
    symbol: 'KLAY',
    decimals: 18,
  },
  rpcUrls: ['https://api.baobab.klaytn.net:8651'],
  blockExplorerUrls: ['https://baobab.scope.klaytn.com'],
};

export const NETWORKS: NetworksType = {
  baobab: BAOBAB_NETWORK,
  ethereum: ETHEREUM_NETWORK,
  klaytn: KLAYTN_NETWORK,
  ropsten: ROPSTEN_NETWORK,
};
