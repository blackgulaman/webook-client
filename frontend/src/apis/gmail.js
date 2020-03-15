import axios from 'axios';
import JWTDecode from 'jwt-decode';
import LocalStorageSerice from '../services/LocalStorageService';
import history from '../history';

const instance = axios.create({
  baseURL: 'http://localhost:9000/client'
});

instance.interceptors.request.use(
  config => {
    const token = LocalStorageSerice.getAccessToken();
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const originalRequest = error.config;
    const response = error.response;
    const logout = () => {
      originalRequest._retry = false;
      LocalStorageSerice.clearToken();
      history.push('/client/signin');
    };
    // These condition is to prevent to infinite loop of request
    if (response.config.url.includes('/client/signin'))
      return Promise.reject(error);
    if (response.status !== 401) return Promise.reject(error);
    if (response.status === 403) return logout();

    const refreshToken = LocalStorageSerice.getRefreshToken();
    if (!refreshToken) return logout();

    // Check if the refresh token was expired
    try {
      if (JWTDecode(refreshToken).exp < new Date().getTime() / 1000)
        return logout();
    } catch (error) {
      return logout();
    }

    if (response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Request again the new token
      return instance.post('/token', { refreshToken }).then(res => {
        if (res.status === 200 || res.status === 201) {
          // Assign the new tokens
          LocalStorageSerice.setAccessToken(res.data.token);
          LocalStorageSerice.setRefreshToken(res.data.refreshToken);
          console.log(LocalStorageSerice.getAccessToken());
          instance.defaults.headers[
            'Authorization'
          ] = `Bearer ${LocalStorageSerice.getAccessToken()}`;
          // Return the original request
          return instance(originalRequest);
        }
      });
    }

    return Promise.reject(error);
  }
);

export default instance;
