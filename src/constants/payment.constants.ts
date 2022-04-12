const paymentDetails = {
  paymentAddress: import.meta.env.VITE_PAYMENT_WALLET_ADDRESS,
  paymentCurrency: 'DAI',
  partnerName: 'metashop.io',
  partnerAddress: import.meta.env.VITE_PARTNER_WALLET_ADDRESS,
  partnerFeePercentage: +import.meta.env.VITE_PARTNER_FEE_PERCENTAGE,
};

export default paymentDetails;
