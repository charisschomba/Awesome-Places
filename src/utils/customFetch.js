const fetchApi = (uri, ...args) => {
  console.log(uri, args)
  return fetch(uri,{
    ...args
  })
};
export default fetchApi;
