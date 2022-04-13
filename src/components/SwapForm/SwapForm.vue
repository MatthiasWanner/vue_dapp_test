<script setup lang="ts">
  import { ref } from 'vue';
  import useForm from '../../hooks/useForm';
  import useWindowEthereum from '../../hooks/useWindowEthereum';
  import useParaSwap, {
    IGetRateParams,
    IParaswapTransactionArgs,
  } from '../../hooks/useParaSwap';
  import SelectInput from '../Form/SelectInput/SelectInput.vue';
  import Button from '../UI/Button.vue';
  import Input from '../Form/TextInput.vue';
  interface IFormData {
    'input-token': string;
    'output-token': string;
    'token-amount': string;
  }

  type SwapResult = string;

  const result = ref<SwapResult | null>(null);
  const requestError = ref<Error | null>(null);

  const { currentChainId, network, switchNetwork, account, sendTransaction } =
    useWindowEthereum();

  const { handleSubmit, register } = useForm();

  // FIXME: Manage Network chain Id updated => always null on first render
  const { tokens, getRate, postTransaction } = useParaSwap(
    currentChainId.value
  );

  const submitForm = async (formData: IFormData) => {
    try {
      await switchNetwork('0x3');
      requestError.value = null;
      result.value = null;
      const {
        'input-token': srcToken,
        'output-token': destToken,
        'token-amount': tokenAmount,
      } = formData;

      if (!srcToken || !destToken || !tokenAmount)
        throw new Error('All fields are required');

      const tokenAmountNumber = +tokenAmount.replaceAll(',', '.');

      if (typeof tokenAmountNumber !== 'number' || isNaN(tokenAmountNumber))
        throw new Error('Invalid token amount');

      const srcTokenData = tokens.value.find(
        (token) => token.symbol === srcToken
      );

      const destTokenDatas = tokens.value.find(
        (token) => token.symbol === destToken
      );

      if (!srcTokenData || !destTokenDatas)
        throw new Error('Invalid input or output token');

      const amount = tokenAmountNumber * 10 ** srcTokenData.decimals;

      // const network = parseInt(currentChainId.value || '', 16);
      // FIXME: Manage Network chain Id updated => only ropsten supported for the moment
      const transactionNetwork = parseInt('0x3', 16);

      if (isNaN(transactionNetwork)) throw new Error('Invalid network');

      const side: IGetRateParams['side'] = 'SELL';
      const userAddress = account.value;
      if (!userAddress) throw new Error('No user address connected');

      const getRateParams: IGetRateParams = {
        srcToken: srcTokenData.address,
        srcDecimals: srcTokenData.decimals,
        destToken: destTokenDatas.address,
        destDecimals: destTokenDatas.decimals,
        amount,
        network: transactionNetwork,
        side,
        userAddress,
      };

      const priceRoute = await getRate(getRateParams);

      result.value = `${
        priceRoute.destAmount / 10 ** priceRoute.destDecimals
      } ${destToken}`;

      const transactionBoby: IParaswapTransactionArgs = {
        srcToken: srcTokenData.address,
        srcAmount: priceRoute.srcAmount,
        destToken: destTokenDatas.address,
        destAmount: priceRoute.destAmount,
        userAddress,
        priceRoute,
      };

      const inputData = await postTransaction(
        transactionBoby,
        transactionNetwork
      );

      await sendTransaction(inputData);
    } catch (error) {
      requestError.value = error as Error;
    }
  };
</script>

<template>
  <p class="network-infos">Current network: {{ network }}</p>
  <form id="swap-form">
    <div class="token-select-container">
      <Input
        labelClass="amount-label"
        inputClass="amount-input"
        label="I want to swap"
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
        label="Into"
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
