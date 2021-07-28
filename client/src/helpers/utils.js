export const getUserToken = () => {
    let token = '';
    let userData = localStorage.getItem('userData');
    userData = userData ? JSON.parse(userData) : '';
    if (userData) {
      token = userData ? userData.access : '';
    }
    return token;
  };
  
  export const clearUser = () => {
    localStorage.removeItem('userData');
  };