import { request } from './utils';

const BASE_URL = 'https://auth.nomoreparties.co';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const authorize = (password, email) => {
  return request(`${BASE_URL}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ password, email }),
  });
};

export const register = (password, email) => {
  return request(`${BASE_URL}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ password, email }),
  });
};

export const getContent = () => {
  return request(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  });
};
