<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import useForm from '../../hooks/useForm';
  import useWindowEthereum from '../../hooks/useWindowEthereum';
  import useParaSwap, {
    IGetRateParams,
    IParaswapTransactionArgs,
  } from '../../hooks/useParaSwap';
  import SelectInput from '../Form/SelectInput/SelectInput.vue';
  import Button from '../UI/Button.vue';
  import paymentDetails from '../../constants/payment.constants';
  import tokensList from '../../constants/tokens.constants';
  interface IFormData {
    'payment-token': string;
  }

  type SwapResult = string;

  const amountToPay = ref<number>(15.99);
  const result = ref<SwapResult | null>(null);
  const requestError = ref<Error | null>(null);

  const { currentChainId, network, switchNetwork, account, sendTransaction } =
    useWindowEthereum();

  const { handleSubmit, register } = useForm();

  // FIXME: Manage Network chain Id updated => always null on first render
  const { getRate, postTransaction } = useParaSwap(currentChainId.value);

  const submitForm = async (formData: IFormData) => {
    try {
      await switchNetwork('0x3');
      requestError.value = null;
      result.value = null;
      const { 'payment-token': inputToken } = formData;

      if (!inputToken) throw new Error('Please select a token');

      const inputTokenDatas = tokensList.find(
        (token) => token.symbol === inputToken
      );

      const paymentTokenDatas = tokensList.find(
        (token) => token.symbol === paymentDetails.paymentCurrency
      );

      if (!inputTokenDatas || !paymentTokenDatas)
        throw new Error('Invalid tokens infos provided');

      const amount = amountToPay.value * 10 ** paymentTokenDatas.decimals;

      // const network = parseInt(currentChainId.value || '', 16);
      // FIXME: Manage Network chain Id updated => only ropsten supported for the moment
      const transactionNetwork = parseInt('0x3', 16);

      if (isNaN(transactionNetwork)) throw new Error('Invalid network');

      const side: IGetRateParams['side'] = 'BUY';
      const userAddress = account.value;
      if (!userAddress) throw new Error('No user address connected');

      const getRateParams: IGetRateParams = {
        srcToken: inputTokenDatas.address,
        srcDecimals: inputTokenDatas.decimals,
        destToken: paymentTokenDatas.address,
        destDecimals: paymentTokenDatas.decimals,
        amount,
        network: transactionNetwork,
        side,
        excludeDirectContractMethods: 'true',
        otherExchangePrices: 'true',
        userAddress,
      };

      const priceRoute = await getRate(getRateParams);

      result.value = `${
        priceRoute.destAmount / 10 ** priceRoute.destDecimals
      } ${inputToken}`;

      const transactionBoby: IParaswapTransactionArgs = {
        srcToken: inputTokenDatas.address,
        srcAmount: priceRoute.srcAmount,
        destToken: paymentTokenDatas.address,
        destAmount: priceRoute.destAmount,
        userAddress,
        priceRoute,
        receiver: paymentDetails.paymentAddress,
        partnerAddress: paymentDetails.partnerAddress,
        partnerFeeBps: paymentDetails.partnerFeePercentage,
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
  <p class="network-infos text">Current network: {{ network }}</p>
  <p class="text">You have to pay {{ amountToPay }} DAI</p>
  <p class="text">Please select the token you wish to pay with</p>
  <form id="payment-form">
    <div class="token-select-container">
      <SelectInput
        :items="
          tokensList
            .filter((token) => token.symbol !== paymentDetails.paymentCurrency)
            .map((n) => ({ label: n.symbol, value: n.symbol }))
        "
        label="Payment Token"
        :register="register"
        fieldName="payment-token"
        select-class="token-select"
        :show-label="true"
      />
    </div>
    <Button
      type="submit"
      children="Pay"
      @click="handleSubmit(submitForm)"
      class="submit-button"
    />
  </form>
</template>

<style scoped lang="scss">
  .text {
    color: antiquewhite;
  }
  .network-infos {
    font-size: 20px;
  }

  #payment-form {
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
