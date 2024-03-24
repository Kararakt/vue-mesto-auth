const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка ${res.status}`);
};

export const request = (url: string, options: RequestInit) => {
  return fetch(url, options).then(checkResponse);
};
