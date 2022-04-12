import { ref } from 'vue';
import networks from '../constants/networks.contants';
import {
  INetwork,
  Status,
  ConnectInfos,
} from '../types/useWindowEthereum.types';

const useWindowEthereum = () => {
  const status = ref<Status>(Status.DISCONNECTED);
  const account = ref<string | null>(null);
  const network = ref<string | null>(null);
  const currentChainId = ref<string | null>(null);

  const ethereum = (window as any).ethereum;

  const getNetwork = (chainId: string) =>
    networks.find((n) => n.chainId === chainId);

  const getAccount = async () => {
    if (!ethereum) return null;
    const [connectedAccount] = await ethereum.request({
      method: 'eth_accounts',
    });

    return (connectedAccount as string) || null;
  };

  const connect = async () => {
    status.value = Status.CONNECTING;
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
      status.value = Status.CONNECTED;
    } catch (error) {
      status.value = Status.DISCONNECTED;
    }
  };

  const getConnectedNetworkChainId = async () => {
    const currentChainId = await ethereum.request({
      method: 'eth_chainId',
    });

    return (currentChainId as string) || null;
  };

  const sendTransaction = async (body: any) => {
    const TxHash = await ethereum.request({
      method: 'eth_sendTransaction',
      params: [body],
    });
  };

  const getWalletInfos = () => {
    getAccount()
      .then((connectedAccount) => {
        if (connectedAccount) {
          status.value = Status.CONNECTED;
          account.value = connectedAccount;
        }
      })
      .then(() => {
        getConnectedNetworkChainId().then((connectedNetworkChainId) => {
          if (connectedNetworkChainId) {
            currentChainId.value = connectedNetworkChainId;
            network.value = getNetwork(connectedNetworkChainId)?.name || null;
          }
        });
      });
  };

  ethereum.on('accountsChanged', (accounts: string[]) => {
    account.value = accounts[0];
  });

  ethereum.on('chainChanged', (chainId: string) => {
    currentChainId.value = chainId;
    network.value = getNetwork(chainId)?.name || null;
  });

  ethereum.on('disconnect', () => {
    status.value = Status.DISCONNECTED;
    network.value = null;
    account.value = null;
    currentChainId.value = null;
  });

  ethereum.on('connect', ({ chainId }: ConnectInfos) => {
    getWalletInfos();
  });

  const switchNetwork = async (chainId: INetwork['chainId']) => {
    try {
      if (!chainId) throw new Error('chainId is required');
      if (status.value !== Status.CONNECTED)
        throw new Error('Please connect to Metamask');

      const currentChainId = (await ethereum.request({
        method: 'eth_chainId',
      })) as string;

      if (currentChainId.toLowerCase() === chainId.toLowerCase()) return;

      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }], // chainId must be in hexadecimal numbers
      });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if ((error as any).code === 4902) {
        try {
          const network = getNetwork(chainId);
          if (!network) throw new Error('Network not supported yet');

          const {
            address: rpcUrl,
            name: chainName,
            blockExplorerUrl,
          } = network;

          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainName,
                chainId,
                rpcUrls: [rpcUrl],
                blockExplorerUrls: [blockExplorerUrl],
              },
            ],
          });
        } catch (addError) {
          throw new Error(
            `Please manually install the ${chainId} network into MetaMask`
          );
        }
      } else {
        throw new Error(`Error connecting to ${chainId} network`);
      }
    }
  };

  getWalletInfos();

  return {
    ethereum,
    switchNetwork,
    status,
    account,
    network,
    currentChainId,
    connect,
    sendTransaction,
  };
};

export default useWindowEthereum;
