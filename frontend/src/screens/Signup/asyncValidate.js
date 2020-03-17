import client from '../../apis/client';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const validateEmail = async value => {
  try {
    if (value) {
      const response = await client.post('/validate-signup', { email: value });
      if (response.data.isExisting)
        return { email: 'The provided email is already exist.' };
    }
  } catch (error) {
    return {
      email: 'Something went wrong while scanning for identical email.'
    };
  }
};
export const validateBusinessName = async value => {
  try {
    if (value) {
      const response = await client.post('/validate-signup', {
        businessName: value
      });
      if (response.data.isExisting)
        return { email: 'The provided email is already exist.' };
    }
  } catch (error) {
    return {
      email: 'Something went wrong while scanning for identical email.'
    };
  }
};
const asyncValidate = async (values /*, dispatch */) => {
  await sleep(700);
  if (values.businessName) {
    const invalid = await validateBusinessName(values.businessName);
    if (invalid) throw { ...invalid };
  }
  if (values.email) {
    const invalid = await validateEmail(values.email);
    if (invalid) throw { ...invalid };
  }

  return {};
};

export default asyncValidate;
