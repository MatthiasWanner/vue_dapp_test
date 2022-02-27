import networks from '../constants/networks.contants';
import {
  INetwork,
  IMetamaskState,
  Status,
} from '../types/useWindowEthereum.types';

const useWindowEthereum = () => {
  const metamaskState: IMetamaskState = {
    network: null,
    account: null,
    status: Status.DISCONNECTED,
    error: null,
  };

  const ethereum = (window as any).ethereum;

  const getStatus = () => {
    if (!ethereum) return Status.UNINSTALLED;
    if (!ethereum.isConnected()) return Status.DISCONNECTED;
    return Status.CONNECTED;
  };

  ethereum.on('accountsChanged', (accounts: string[]) => {
    metamaskState.account = accounts[0];
  });

  ethereum.on('chainChanged', (chainId: string) => {
    metamaskState.network =
      networks.find((network) => network.chainId === chainId)?.name || null;
  });

  ethereum.on('disconnect', () => {
    metamaskState.status = Status.DISCONNECTED;
  });

  const switchNetwork = async (chainId: INetwork['chainId']) => {
    try {
      if (!chainId) throw new Error('chainId is required');
      if (getStatus() !== Status.CONNECTED)
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
          const network = networks.find((n) => n.chainId === chainId);
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
      }
      throw new Error(`Error connecting to ${chainId} network`);
    }
  };

  return {
    ethereum,
    switchNetwork,
    metamaskState,
  };
};

export default useWindowEthereum;
