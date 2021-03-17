const formats = ['USD', 'GBP', 'BHD', 'KWD', 'EUR', 'CAD'];

const currencyFormatter = (currency = 'USD', amount) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
};

export {
  formats,
  currencyFormatter,
};
