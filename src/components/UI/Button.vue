<script setup lang="ts">
  import { ButtonHTMLAttributes } from 'vue';

  interface IProps {
    type?: ButtonHTMLAttributes['type'];
    children: string;
    onClick?: () => void;
  }

  defineProps<IProps>();
</script>

<template>
  <button :type="type" @click="onClick">{{ children }}</button>
</template>

<style></style>
