<script setup lang="ts">
  import { ref } from 'vue';
  import { getWalletBalance } from 'wallet_balancer/src';
  import useWindowEthereum from '../../hooks/useWindowEthereum';
  import Input from './TextInput.vue';
  import Button from '../UI/Button.vue';
  import SimpleText from '../UI/SimpleText.vue';
  import useForm from '../../hooks/useForm';
  import SelectInput from './SelectInput.vue';
  import networks from '../../constants/networks.contants';

  interface IFormData {
    contractAddress: string;
    network: string;
  }
  interface BalanceInfos {
    balance: string;
    symbol: string;
  }

  const result = ref<BalanceInfos | null>(null);
  const requestError = ref<Error | null>(null);

  const { handleSubmit, register } = useForm();
  const { ethereum, switchNetwork, metamaskState } = useWindowEthereum();

  const submitForm = async ({ contractAddress, network }: IFormData) => {
    try {
      requestError.value = null;
      if (!contractAddress) throw new Error('Contract address is required');
      if (!network) throw new Error('Network is required');

      await switchNetwork(network);

      const balanceInfos = await getWalletBalance(contractAddress, ethereum);
      result.value = balanceInfos;
    } catch (error) {
      requestError.value = {
        name: 'submitForm',
        message: (error as Error).message,
      };
    }
  };
</script>

<template>
  <section class="container">
    <form
      class="control-form"
      @submit.prevent="handleSubmit(submitForm)"
      id="wallet"
    >
      <Input
        labelClass="contract-label"
        inputClass="contract-input"
        label="Contract Address"
        fieldName="contractAddress"
        :register="register"
      />
      <SelectInput
        :items="networks.map((n) => ({ label: n.name, value: n.chainId }))"
        label="Réseau"
        :register="register"
        fieldName="network"
        label-class="network-label"
        select-class="network-select"
      />
      <Button class="form-button" children="Controler" />
    </form>
    <SimpleText
      :text="`${
        result
          ? `Balance: ${result.balance} ${result.symbol}`
          : 'Pas de requête émise'
      }`"
    />
    <pre v-if="requestError" class="form-error">{{
      JSON.stringify(requestError, ['name', 'message'], 2)
    }}</pre>
  </section>
</template>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    box-sizing: border-box;
  }
  .control-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 300px;
  }

  .contract-input {
    display: flex;
    text-align: center;
  }

  .form-button {
    margin-top: 20px;
  }

  .network-label {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }

  .network-select {
    text-align: center;
  }

  .form-error {
    color: red;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    justify-content: start;
    text-align: start;
    overflow: auto;
    background-color: rgba(240, 122, 122, 0.3);
    padding: 10px;
    width: 100%;
  }

  @media screen and (min-width: 768px) {
    .container {
      padding: 50px;
    }
  }
</style>
