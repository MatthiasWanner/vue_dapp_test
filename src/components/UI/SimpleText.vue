<script setup lang="ts">
  interface IProps {
    text: string
  }

  defineProps<IProps>()
</script>

<template>
  <p>{{ text }}</p>
</template>

<style></style>
