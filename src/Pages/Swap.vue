<script setup lang="ts">
  import SwapForm from '../components/SwapForm/SwapForm.vue';
  import Metamask from '../components/WalletInfos/Metamask.vue';
</script>

<template>
  <h1 class="page-title swap-page-title">Swap Tokens</h1>

  <Metamask />
  <SwapForm />
</template>

<style scoped lang="scss">
  .page-title {
    color: antiquewhite;
  }
</style>
