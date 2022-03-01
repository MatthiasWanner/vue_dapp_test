<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import Form from './components/Form/index.vue';
  import Metamask from './components/WalletInfos';
</script>

<template>
  <img
    alt="Vue logo"
    src="./assets/logo.png"
    width="100"
    height="100"
    class="vue-logo"
  />
  <Metamask />
  <Form />
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 20px;
    position: relative;
    max-width: 1400px;
  }

  .vue-logo {
    position: relative;
    z-index: 10;
  }
</style>
