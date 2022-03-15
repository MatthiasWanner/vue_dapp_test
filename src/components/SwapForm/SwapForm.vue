<script setup lang="ts">
  import SelectInput from '../Form/SelectInput/SelectInput.vue';
  import useForm from '../../hooks/useForm';
  import entryTokens from '../../constants/tokens.constants';
  import Button from '../UI/Button.vue';
  import Input from '../Form/TextInput.vue';
  import { ref } from 'vue';
  interface IFormData {
    'input-token': string;
    'output-token': string;
    'token-amount': string;
  }

  type SwapResult = string;

  const result = ref<SwapResult | null>(null);
  const requestError = ref<Error | null>(null);

  const { handleSubmit, register } = useForm();

  const submitForm = (formData: IFormData) => {
    requestError.value = null;
    result.value = null;
    const {
      'input-token': inputToken,
      'output-token': outputToken,
      'token-amount': tokenAmount,
    } = formData;
    console.log('submitForm', { inputToken, outputToken, tokenAmount });

    if (!inputToken || !outputToken || !tokenAmount) {
      requestError.value = new Error('All fields are required');
      return;
    }
    result.value = `${inputToken}-${outputToken}-${tokenAmount}`;
  };
</script>

<template>
  <form id="swap-form">
    <div class="token-select-container">
      <SelectInput
        :items="entryTokens.map((n) => ({ label: n.symbol, value: n.address }))"
        label="Input Token"
        :register="register"
        fieldName="input-token"
        select-class="token-select"
        :show-label="true"
      />
    </div>
    <div class="token-select-container">
      <SelectInput
        :items="entryTokens.map((n) => ({ label: n.symbol, value: n.address }))"
        label="Output Token"
        :register="register"
        fieldName="output-token"
        select-class="token-select"
        :show-label="true"
      />
    </div>
    <Input
      labelClass="amount-label"
      inputClass="amount-input"
      label="Amount"
      fieldName="token-amount"
      :register="register"
    />
    <Button
      type="submit"
      children="Swap"
      @click="handleSubmit(submitForm)"
      class="submit-button"
    />
  </form>
</template>

<style scoped lang="scss">
  #swap-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .submit-button {
    margin-top: 20px;
  }

  .token-select-container {
    margin-bottom: 20px;
  }
</style>
