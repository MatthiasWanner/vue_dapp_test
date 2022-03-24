import { onMounted, ref } from 'vue';
import axios from 'axios';

export interface ParaSwapToken {
  symbol: string;
  address: string;
  decimals: number;
  img: string;
  network: number;
}

export interface IGetRateParams {
  srcToken: string;
  srcDecimals: number;
  destToken: string;
  destDecimals: number;
  amount: number;
  network: number;
  side: 'BUY' | 'SELL';
}

export interface IParaswapTransactionBoby {
  srcToken: string;
  destToken: string;
  srcAmount: string;
  destAmount: string;
  userAddress: string;
  partner: 'paraswap.io';
  priceRoute: any;
}
export type IParaswapTransactionArgs = Omit<
  IParaswapTransactionBoby,
  'partner'
>;

const apiUrl = 'https://apiv5.paraswap.io';

const useParaSwap = (chainId: string | null) => {
  const tokens = ref<ParaSwapToken[]>([]);
  const error = ref<Error | null>(null);
  const isLoading = ref<boolean>(false);

  const getTokenList = async (chainNumber: number) => {
    // FIXME: use one of NetworkID to check the network
    if (!chainNumber || chainNumber !== 3) return;
    try {
      isLoading.value = true;
      const { tokens: tokenList } = (
        await axios.get<{ tokens: ParaSwapToken[] }>(
          `${apiUrl}/tokens/${chainNumber}`
        )
      ).data;

      tokens.value = tokenList;
    } catch (e) {
      error.value = e as Error;
    } finally {
      isLoading.value = false;
    }
  };

  const getRate = async (params: IGetRateParams): Promise<any> => {
    const {
      srcToken,
      srcDecimals,
      destToken,
      destDecimals,
      amount,
      network,
      side,
    } = params;
    try {
      isLoading.value = true;
      const { priceRoute } = (
        await axios.get<{ priceRoute: any }>(
          `${apiUrl}/prices?srcToken=${srcToken}&srcDecimals=${srcDecimals}&destToken=${destToken}&destDecimals=${destDecimals}&amount=${amount}&network=${network}&side=${side}`
        )
      ).data;
      return priceRoute;
    } catch (e) {
      error.value = e as Error;
    } finally {
      isLoading.value = false;
    }
  };

  const postTransaction = async (
    body: IParaswapTransactionArgs,
    network: number
  ): Promise<any> => {
    try {
      isLoading.value = true;
      return (
        await axios.post(`${apiUrl}/transactions/${network}`, {
          ...body,
          partner: 'paraswap.io',
        })
      ).data;
    } catch (e) {
      error.value = e as Error;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    // FIXME: Manage state changement to prevent force ropsten token list
    getTokenList(parseInt(chainId || '0x3', 16));
  });

  return { tokens, error, isLoading, getTokenList, getRate, postTransaction };
};

export default useParaSwap;
