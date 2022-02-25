<script setup lang="ts">
  import { ButtonHTMLAttributes } from 'vue'

  interface IProps {
    type?: ButtonHTMLAttributes['type']
    children: string
  }

  defineProps<IProps>()
</script>

<template>
  <button v-bind:type="type">{{ children }}</button>
</template>

<style></style>
