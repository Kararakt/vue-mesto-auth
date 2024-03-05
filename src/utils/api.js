import { request } from './utils';

const BASE_URL = 'https://mesto.nomoreparties.co/v1/cohort-76';
const AUTH_TOKEN = 'f0dba71b-d2b0-43ce-9b43-97ba5085a42c';

const headers = {
  authorization: AUTH_TOKEN,
  'Content-Type': 'application/json',
};

export const getUserInfo = () => {
  return request(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers,
  });
};

export const editUserProfile = (name, about) => {
  return request(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      name,
      about,
    }),
  });
};

export const getInitialCards = () => {
  return request(`${BASE_URL}/cards`, {
    method: 'GET',
    headers,
  });
};

export const deleteCard = (cardId) => {
  return request(`${BASE_URL}/cards/${cardId}`, {
    method: 'DELETE',
    headers,
  });
};

export const changeLikeCardStatus = (cardId, isLiked) => {
  return request(`${BASE_URL}/cards/${cardId}/likes`, {
    method: `${!isLiked ? 'DELETE' : 'PUT'}`,
    headers,
  });
};

export const addCard = (name, link) => {
  return request(`${BASE_URL}/cards`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name,
      link,
    }),
  });
};

export const editUserAvatar = (avatar) => {
  return request(`${BASE_URL}/users/me/avatar`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      avatar,
    }),
  });
};
