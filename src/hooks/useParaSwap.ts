import { onMounted, ref } from 'vue';
import axios from 'axios';

export interface ParaSwapToken {
  symbol: string;
  address: string;
  decimals: number;
  img: string;
  network: number;
}

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

  onMounted(() => {
    // FIXME: Manage state changement to prevent force ropsten token list
    getTokenList(parseInt(chainId || '0x3', 16));
  });

  return { tokens, error, isLoading, getTokenList };
};

export default useParaSwap;
