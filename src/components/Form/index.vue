<script setup lang="ts">
  import { ref } from 'vue'
  import { getWalletBalance } from 'wallet_balancer/getWalletBalance'
  import useWindowEthereum from '../../hooks/useWindowEthereum'
  import Input from './TextInput.vue'
  import Button from '../UI/Button.vue'
  import SimpleText from '../UI/SimpleText.vue'
  import useForm from '../../hooks/useForm'

  interface IFormData {
    contractAddress: string
  }
  interface BalanceInfos {
    balance: string
    symbol: string
  }

  const result = ref<BalanceInfos | null>(null)
  const requestError = ref<Error | null>(null)

  const { handleSubmit } = useForm()
  const { ethereum } = useWindowEthereum()

  const submitForm = async ({ contractAddress }: IFormData) => {
    try {
      requestError.value = null
      const balanceInfos = await getWalletBalance(contractAddress, ethereum)
      console.log(balanceInfos)
      result.value = balanceInfos
    } catch (error) {
      requestError.value = error as Error
    }
  }
</script>

<template>
  <section class="container">
    <form class="control-form" @submit="handleSubmit(submitForm)">
      <Input
        label-class="contract-label"
        input-class="contract-input"
        label="Contract Address"
        register="contractAddress"
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
    <pre>
        {{ requestError }}
      </pre
    >
  </section>
</template>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 50px;
    box-sizing: border-box;
    height: 500px;
  }
  .control-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .contract-input {
    display: flex;
  }

  .form-button {
    margin-top: 20px;
  }
</style>
