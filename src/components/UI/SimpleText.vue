<script setup lang="ts">
  interface IProps {
    text: string;
    className?: string;
  }

  defineProps<IProps>();
</script>

<template>
  <p :class="className || ''">{{ text }}</p>
</template>

<style></style>
