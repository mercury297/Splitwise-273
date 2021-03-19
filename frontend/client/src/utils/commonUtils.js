const formats = ['USD', 'GBP', 'BHD', 'KWD', 'EUR', 'CAD'];

const currencyFormatter = (currency = 'USD', amount) => {
  let formatter = '';
  if (currency === null) {
    formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    });
  } else {
    formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    });
  }

  return formatter.format(amount);
};

const getCurrentUserData = () => {
  let retrievedObject = localStorage.getItem('user');
  if (retrievedObject === null) {
    return false;
  }

  retrievedObject = JSON.parse(retrievedObject);
  return retrievedObject;
};

const updateCurrentUserData = (updatedData) => {
  const update = JSON.stringify(updatedData);
  localStorage.setItem('user', update);
};

export {
  formats,
  currencyFormatter,
  getCurrentUserData,
  updateCurrentUserData,
};
