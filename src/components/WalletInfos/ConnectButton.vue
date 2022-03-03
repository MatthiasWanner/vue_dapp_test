<script setup lang="ts">
  interface IProps {
    text: string;
    onClick?: () => void;
  }

  defineProps<IProps>();

  const iTags = new Array(300).fill(0).map((_, i) => i);
</script>

<template>
  <button type="button" @click="onClick">
    <i v-for="item in iTags" :key="item"></i>
    <div class="bg">{{ text }}</div>
  </button>
</template>

<style lang="scss" scoped>
  @import './button.scss';
</style>
