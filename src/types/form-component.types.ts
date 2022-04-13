export interface IBalanceInfos {
  balance: string;
  symbol: string;
}

export interface IFormData {
  contractAddress: string;
  network: string;
}

export type ContractType = 'erc20' | 'erc721';
