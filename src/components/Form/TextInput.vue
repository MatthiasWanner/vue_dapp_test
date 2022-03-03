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
  <div class="form__group field">
    <input
      :class="`form__field`"
      type="text"
      :placeholder="label"
      v-bind="register(fieldName)"
    />
    <label :for="fieldName" :class="`form__label`">{{ label }}</label>
  </div>
</template>

<style lang="scss" scoped>
  @import './text-input.scss';
</style>
