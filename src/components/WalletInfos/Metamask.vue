<script setup lang="ts">
  import useWallet from '../../hooks/useWindowEthereum';
  import { getTruncatedString } from '../../utils';
  import ConnectButton from './ConnectButton.vue';

  const { account, network, status, connect } = useWallet();
</script>

<template>
  <aside class="aside-wallet">
    <h3 class="wallet-title">Wallet</h3>
    <p class="account-text wallet-infos-text">
      <span>Account: </span>
      <span>{{ getTruncatedString(account, 4) || 'Disconnected' }}</span>
    </p>
    <p class="network-text wallet-infos-text">
      <span>Network: </span>
      <span>{{ network }}</span>
    </p>
    <ConnectButton
      v-if="status === 'disconnected' || status === 'connecting'"
      class="base"
      :text="status === 'disconnected' ? 'Connect' : 'Connecting'"
      :onClick="connect"
    ></ConnectButton>
  </aside>
</template>

<style lang="scss">
  .aside-wallet {
    text-align: start;
    margin-bottom: 20px;
    height: 180px;
    box-sizing: border-box;
    background-image: linear-gradient(
      15deg,
      rgba(2, 0, 36, 100) 0,
      rgba(9, 121, 33, 98) 30%,
      rgba(110, 253, 254, 100) 94%
    );
    color: aqua;
    padding: 1rem;
    transform: translateY(-35%);
    border-radius: 10px;
    box-shadow: 4px 4px 20px rgba(255, 255, 255, 0.3);
  }

  .wallet-title {
    margin-top: 0;
  }

  .wallet-infos-text {
    margin-top: 0;
  }

  .hidden-button {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
  }

  @media screen and (min-width: 768px) {
    .aside-wallet {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      padding: 10px;
      box-shadow: 5px 5px 5px rgba(250, 249, 249, 0.2);
      position: absolute;
      top: 0.5rem;
      right: 1rem;
      width: 200px;
      height: 250px;
      margin-bottom: 0;
      transform: translateY(0);
    }

    .wallet-infos-text {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .wallet-title {
      color: darkslategrey;
    }
  }
</style>
