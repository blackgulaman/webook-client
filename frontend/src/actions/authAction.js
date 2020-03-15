import { SIGN_IN, SIGN_OUT, CHECK_ONLINE_STATUS } from './types';
import gmail from '../apis/gmail';
import LocalStorageService from '../services/LocalStorageService';
export const gmailSignIn = gmailAccount => async dispatch => {
  const response = await gmail.post('/signin', gmailAccount);

  LocalStorageService.setEmail(response.data.user.email);
  LocalStorageService.setAccessToken(response.data.token);
  LocalStorageService.setRefreshToken(response.data.refreshToken);

  dispatch({
    type: SIGN_IN,
    payload: response.data.user
  });
};

export const gmailSignOut = () => async dispatch => {
  const email = LocalStorageService.getEmail();
  console.log(email)
  const response = await gmail.post('/signout', { email });
  LocalStorageService.clearToken();
  dispatch({
    type: SIGN_OUT
  });
};
export const checkLoginStatus = () => async dispatch => {
  const email = LocalStorageService.getEmail();
  let status = false;
  if (email) {
    const response = await gmail.post('/check-online-status', { email });
    status = response.data.status;
  }

  dispatch({
    type: CHECK_ONLINE_STATUS,
    payload: status
  });
};

export default {
  gmailSignIn,
  gmailSignOut,

  checkLoginStatus
};
