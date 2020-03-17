import client from '../apis/client';
import { SIGN_IN, SIGN_OUT, SIGN_UP } from './types';

export const signUp = formValues => async dispatch => {
  try {
    console.log(formValues);
    const response = client.post('/signup', formValues);
    dispatch({
      type: SIGN_UP,
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
};

export default {
  signUp
};
