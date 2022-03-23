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
    showLabel?: boolean;
  }

  defineProps<IProps>();
</script>

<template>
  <!-- <span v-if="showLabel" :class="`select-label ${labelClass || ''}`">{{
    label
  }}</span> -->
  <label class="custom-select">
    <select :class="selectClass" v-bind="register(fieldName)">
      <option v-for="item in items" :value="item.value">
        {{ item.label }}
      </option>
    </select>
  </label>
</template>

<style lang="scss" scope>
  @import './select-input.sass';
</style>
