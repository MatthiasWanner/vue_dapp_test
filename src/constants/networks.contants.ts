import { INetwork, Networks } from '../types/useWindowEthereum.types';

const networks: INetwork[] = [
  {
    name: Networks.MAINNET,
    address: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    chainId: '0x1',
    blockExplorerUrl: 'https://etherscan.io',
  },
  {
    name: Networks.ROPSTEN,
    address: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    chainId: '0x3',
    blockExplorerUrl: 'https://ropsten.etherscan.io',
  },
  {
    name: Networks.RINKEBY,
    address: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    chainId: '0x4',
    blockExplorerUrl: 'https://rinkey.etherscan.io',
  },
  {
    name: Networks.KOVAN,
    address: 'https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    chainId: '0x6',
    blockExplorerUrl: 'https://kovan.etherscan.io',
  },
  {
    name: Networks.MATIC,
    address: 'https://polygon-rpc.com/',
    chainId: '0x89',
    blockExplorerUrl: 'https://polygonscan.com/',
  },
  {
    name: Networks.FANTOM,
    address: 'https://rpc.ftm.tools',
    chainId: '0xfa',
    blockExplorerUrl: 'https://ftmscan.com',
  },
  {
    name: Networks.BINANCE,
    address: 'https://bsc-dataseed.binance.org',
    chainId: '0x38',
    blockExplorerUrl: 'https://bscscan.com',
  },
  {
    name: Networks.XDAI,
    address: 'https://rpc.xdaichain.com',
    chainId: '0x64',
    blockExplorerUrl: 'https://blockscout.com/xdai/mainnet',
  },
];

export default networks;
