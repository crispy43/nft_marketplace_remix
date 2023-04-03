export interface Network {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: Array<string>;
  blockExplorerUrls: Array<string>
}

export type NetworkNames = 'ethereum' | 'ropsten' | 'klaytn' | 'baobab'

export type NetworksType = { [key in NetworkNames]: Network }
