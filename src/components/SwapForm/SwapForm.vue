<script setup lang="ts">
  import SelectInput from '../Form/SelectInput/SelectInput.vue';
  import useForm from '../../hooks/useForm';
  import useWindowEthereum from '../../hooks/useWindowEthereum';
  import useParaSwap from '../../hooks/useParaSwap';
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

  const { currentChainId, network } = useWindowEthereum();

  const { handleSubmit, register } = useForm();

  // FIXME: Manage Network chain Id updated => always null on first render
  const { tokens } = useParaSwap(currentChainId.value);

  const submitForm = (formData: IFormData) => {
    requestError.value = null;
    result.value = null;
    const {
      'input-token': inputToken,
      'output-token': outputToken,
      'token-amount': tokenAmount,
    } = formData;

    if (!inputToken || !outputToken || !tokenAmount) {
      requestError.value = new Error('All fields are required');
      return;
    }
    const inputTokenData = tokens.value.find(
      (token) => token.symbol === inputToken
    );

    if (!inputTokenData) {
      requestError.value = new Error('Invalid input token');
      return;
    }

    result.value = `${inputToken}-${outputToken}-${tokenAmount}`;
  };
</script>

<template>
  <p class="network-infos">Current network: {{ network }}</p>
  <form id="swap-form">
    <div class="token-select-container">
      <Input
        labelClass="amount-label"
        inputClass="amount-input"
        label="Input Token Amount"
        fieldName="token-amount"
        :register="register"
      />
      <SelectInput
        :items="tokens.map((n) => ({ label: n.symbol, value: n.symbol }))"
        label="Input Token"
        :register="register"
        fieldName="input-token"
        select-class="token-select"
        :show-label="true"
      />
    </div>
    <div class="token-select-container">
      <Input
        labelClass="amount-label"
        inputClass="amount-output"
        label="Output Token Amount"
        fieldName="token-amount"
        :register="register"
        :disabled="true"
      />
      <SelectInput
        :items="tokens.map((n) => ({ label: n.symbol, value: n.symbol }))"
        label="Output Token"
        :register="register"
        fieldName="output-token"
        select-class="token-select"
        :show-label="true"
      />
    </div>
    <Button
      type="submit"
      children="Swap"
      @click="handleSubmit(submitForm)"
      class="submit-button"
    />
  </form>
</template>

<style scoped lang="scss">
  .network-infos {
    font-size: 20px;
    color: antiquewhite;
  }

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
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
  }

  @media screen and (min-width: 768px) {
    .token-select-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      width: 75%;
    }
  }
</style>
