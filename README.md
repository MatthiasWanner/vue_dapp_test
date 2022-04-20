# Vue Lab dApp

This repo is my lab application to test dApp protocols using Metamask, ethers.js and Paraswap api. It's made to play with different methods provided by these tools. There is no navbar yet but you can test several things by going manually to the following urls 👇

> 1️⃣ `/` Check your wallet ERC-20 or ERC-721 balance  
> 2️⃣ `/swap` Make a token swap on the ropsten testnet thanks to Paraswap Api / Smart contract  
> 3️⃣ `/pay` Pay a fixed Dai value using a choosen ERC-20 token (Ropsten testnet) to a specified wallet applying fees percentage into another wallet  
> 4️⃣ `/test` Test Metamask sendTransaction function. Copy/Paste your body into the `src/Pages/Test.vue` file into `params` variable, save, and clic the page button in your web browser 😎.

```js
const params = {
  // Example of params boby
  from: '0x000000000000000000000000000000000000',
  to: '0x0000000000000000000000000000000000000000',
  value: '0x0',
  data: '0x',
  gas: '0x5208',
  gasPrice: '0x3b9aca00',
  chainId: '0x3',
};
```

It's a dev app for devs, this is why errors are not yet handled on the front end, but you can debug it with your browser devtool and `Vue Devtools` extension to display error messages and different states

## Environment variables

```bash
VITE_PARTNER_WALLET_ADDRESS=<FEE_RECEIVER_WALLET_ADDRESS>
VITE_PARTNER_FEE_PERCENTAGE=<200_FOR_2%>
VITE_PAYMENT_WALLET_ADDRESS=<RECEIVER_WALLET_ADDRESS_FOR_PAY_PAGE>
```

## Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.
