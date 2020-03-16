const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = (values /*, dispatch */) => {
  return sleep(1000).then(() => {
    console.log(values);
    // simulate server latency
    if (['john', 'paul', 'george', 'ringo'].includes(values.businessName)) {
      // eslint-disable-next-line
      throw { email: 'That username is taken' };
    }
  });
};

export default asyncValidate;
