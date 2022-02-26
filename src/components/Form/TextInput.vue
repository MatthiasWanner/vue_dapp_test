<script setup lang="ts">
  interface IProps {
    label: string;
    register: string;
    labelClass?: string;
    inputClass?: string;
  }

  defineProps<IProps>();
</script>

<template>
  <label :class="labelClass || ''">
    {{ label }}
    <input :class="inputClass || ''" type="text" :name="register" />
  </label>
</template>

<style></style>
