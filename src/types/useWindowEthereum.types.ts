import networks from '../constants/networks.contants';

export enum Networks {
  MAINNET = 'Mainnet',
  ROPSTEN = 'Ropsten',
  RINKEBY = 'Rinkeby',
  KOVAN = 'Kovan',
  MATIC = 'Matic',
  FANTOM = 'Fantom',
  BINANCE = 'Binance',
  XDAI = 'XDai',
}

export enum Status {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  UNINSTALLED = 'uninstalled',
  INSTALLED = 'installed',
  LOADING = 'loading',
}

export interface INetwork {
  name: Networks;
  address: string;
  chainId: string;
  blockExplorerUrl: string;
}

export interface IMetamaskState {
  network: Networks | null;
  account: string | null;
  status: Status;
  error: string | null;
}
