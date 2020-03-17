import { SIGN_IN, SIGN_OUT, SIGN_UP } from '../actions/types';

const INITIAL_STATE = {
  isLogin: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isLogin: true, user: action.payload };
    case SIGN_UP:
      return { ...state, user: action.payload };
    case SIGN_OUT:
      return { ...state, isLogin: false, user: null };
    default:
      return state;
  }
};
