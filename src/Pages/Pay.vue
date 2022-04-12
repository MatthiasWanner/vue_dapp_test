<script setup lang="ts">
  import Metamask from '../components/WalletInfos/Metamask.vue';
  import PayAmount from '../components/PayAmount/PayAmount.vue';
</script>

<template>
  <h1 class="page-title swap-page-title">Pay an amount</h1>

  <Metamask />
  <PayAmount />
</template>

<style scoped lang="scss">
  .page-title {
    color: antiquewhite;
  }
</style>
