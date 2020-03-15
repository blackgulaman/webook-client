class LocalStorageService {
  setAccessToken(token) {
    localStorage.setItem('access_token', token);
  }
  setRefreshToken(token) {
    localStorage.setItem('refresh_token', token);
  }
  setEmail(email) {
    localStorage.setItem('email', email);
  }
  getAccessToken() {
    return localStorage.getItem('access_token');
  }
  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }
  getEmail() {
    return localStorage.getItem('email');
  }

  clearToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('email');
  }
}

export default new LocalStorageService();
