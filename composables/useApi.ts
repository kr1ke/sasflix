export const useApi = () => {
  const req = $fetch.create({
    baseURL: 'https://dummyjson.com/',
  });

  return async <T>(url: () => string, options = {}) =>
    (await req(url(), options)) as T;
};
