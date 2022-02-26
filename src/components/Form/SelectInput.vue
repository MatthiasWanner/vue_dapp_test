<script setup lang="ts">
  import { RegisterInput } from '/@/types/useForm.types';

  interface SelectItem {
    label: string;
    value: string;
  }

  interface IProps {
    label: string;
    items: SelectItem[];
    labelClass?: string;
    selectClass?: string;
    fieldName: string;
    register: RegisterInput;
  }

  defineProps<IProps>();
</script>

<template>
  <label :class="labelClass || ''">
    {{ label }}
    <select v-bind="register(fieldName)">
      <option value="">--Please choose an option--</option>
      <option v-for="item in items" :value="item.value">
        {{ item.label }}
      </option>
    </select>
  </label>
</template>

<style></style>
