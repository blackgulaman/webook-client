import { SIGN_IN, SIGN_OUT, CHECK_ONLINE_STATUS } from '../actions/types';
const INITIAL_STATE = {
  isSignedIn: null,
  userId: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, user: action.payload };
    case CHECK_ONLINE_STATUS:
      return { ...state, isSignedIn: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, user: null };
    default:
      return state;
  }
};
