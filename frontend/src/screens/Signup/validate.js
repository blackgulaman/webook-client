export default values => {
  const errors = {};
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'businessName',
    'password'
  ];
  for (const field of requiredFields) {
    if (!values[field]) {
      errors[field] = 'This field is required.';
    }
  }
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  return errors;
};
