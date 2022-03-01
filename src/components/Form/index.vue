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
  import { IBalanceInfos, IFormData } from '../../types';
  import { ContractType } from 'wallet_balancer/types';

  const result = ref<IBalanceInfos | null>(null);
  const requestError = ref<Error | null>(null);
  const contractType = ref<ContractType>('erc20');

  const { handleSubmit, register } = useForm();
  const { ethereum, switchNetwork } = useWindowEthereum();

  const onClick = (newContractType: ContractType) => {
    contractType.value = newContractType;
  };
  const erc20ButtonClasses = () => {
    return `network-button ${contractType.value === 'erc20' ? 'active' : ''}`;
  };
  const erc721ButtonClasses = () => {
    return `network-button ${contractType.value === 'erc721' ? 'active' : ''}`;
  };

  const submitForm = async ({ contractAddress, network }: IFormData) => {
    try {
      requestError.value = null;
      if (!contractAddress) throw new Error('Contract address is required');
      if (!network) throw new Error('Network is required');

      await switchNetwork(network);

      const balanceInfos = await getWalletBalance({
        contractAddress,
        windowEthereum: ethereum,
        contractType: contractType.value,
      });
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
    <aside class="contract-types-buttons-container">
      <Button
        children="ERC-20"
        @click="onClick('erc20')"
        :class="erc20ButtonClasses()"
      />
      <Button
        children="ERC-721"
        @click="onClick('erc721')"
        :class="erc721ButtonClasses()"
      />
    </aside>
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
        label="Network"
        :register="register"
        fieldName="network"
        label-class="network-label"
        select-class="network-select"
      />
      <Button class="form-button" children="Get Balance!" />
    </form>
    <SimpleText
      :text="`${
        result
          ? `Balance: ${result.balance} ${result.symbol}`
          : 'No request sent yet'
      }`"
    />
    <pre v-if="requestError" class="form-error">{{
      JSON.stringify(requestError, ['name', 'message'], 2)
    }}</pre>
  </section>
</template>

<style>
  @import './form.module.css';
</style>
