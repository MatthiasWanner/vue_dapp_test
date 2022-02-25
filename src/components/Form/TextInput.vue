<script setup lang="ts">
  interface IProps {
    label: string
    register: string
    labelClass?: string
    inputClass?: string
  }

  defineProps<IProps>()
</script>

<template>
  <label v-bind:class="labelClass || ''">
    {{ label }}
    <input v-bind:class="inputClass || ''" type="text" v-bind:name="register" />
  </label>
</template>

<style></style>
