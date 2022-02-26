<script setup lang="ts">
  import { RegisterInput } from '/@/types/useForm.types';

  interface IProps {
    label: string;
    labelClass?: string;
    inputClass?: string;
    register: RegisterInput;
    fieldName: string;
  }

  defineProps<IProps>();
</script>

<template>
  <label :class="labelClass || ''">
    {{ label }}
    <input :class="inputClass || ''" type="text" v-bind="register(fieldName)" />
  </label>
</template>

<style></style>
