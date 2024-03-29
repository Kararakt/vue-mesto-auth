import { UserData } from './../models/models';
import { request } from './utils';

const BASE_URL = 'https://auth.nomoreparties.co';
const headers: HeadersInit = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const authorize = (user: UserData): Promise<Response> => {
  return request(`${BASE_URL}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ password: user.password, email: user.email }),
  });
};

export const register = (user: UserData): Promise<Response> => {
  return request(`${BASE_URL}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ password: user.password, email: user.email }),
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
