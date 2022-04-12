<script setup lang="ts">
  import Metamask from '../components/WalletInfos/Metamask.vue';
  import Button from '../components/UI/Button.vue';
  import useWindowEthereum from '../hooks/useWindowEthereum';

  const { sendTransaction } = useWindowEthereum();

  const params = {
    // Example of params boby
    from: '0x000000000000000000000000000000000000',
    to: '0x0000000000000000000000000000000000000000',
    value: '0x0',
    data: '0x',
    gas: '0x5208',
    gasPrice: '0x3b9aca00',
    chainId: '0x3',
  };
</script>

<template>
  <h1 class="page-title swap-page-title">Test</h1>

  <Metamask />
  <Button
    children="Test"
    @click="sendTransaction(params)"
    class="submit-button"
  />
</template>

<style scoped lang="scss">
  .page-title {
    color: antiquewhite;
  }
</style>
