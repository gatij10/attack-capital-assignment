import Cookies from 'js-cookie';

export const setToken = (token: string) => {
  Cookies.set('token', token, { expires: 1 }); 
};

export const getToken = () => {
  return Cookies.get('token');
};

export const removeToken = () => {
  Cookies.remove('token');
};

export const isLoggedIn = () => {
  const token = getToken();
  return !!token;
};
