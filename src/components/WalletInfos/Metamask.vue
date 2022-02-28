<script setup lang="ts">
  import useWallet from '../../hooks/useWindowEthereum';
  import { getTruncatedString } from '../../utils';
  import Button from '../UI/Button.vue';

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
    <div v-if="status === 'disconnected' || status === 'connecting'">
      <Button
        :children="status === 'disconnected' ? 'Connect' : 'Connecting...'"
        :onClick="connect"
        :disabled="status === 'connecting'"
      ></Button>
    </div>
  </aside>
</template>

<style scoped>
  .aside-wallet {
    text-align: start;
    margin-bottom: 20px;
  }

  .wallet-infos-text {
    margin-top: 0;
  }

  @media screen and (min-width: 768px) {
    .aside-wallet {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
      padding: 10px;
      box-sizing: border-box;
      background: #fafafa;
      border-radius: 0.5rem;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 200px;
      height: 250px;
      margin-bottom: 0;
    }

    .wallet-infos-text {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>
