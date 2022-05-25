const url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

export const getCurrency = () => {
  return fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`)
      }

      return res.json();
    })
};
