async function fetchData(path, callback) {
  let fetchPromise = fetch(path);
  let res = await fetchPromise;
  let status = res.status;

  if (status < 200 || status >= 300) {
    // useData(status, res)
    return error(status)
  }

  const text = await res.text();

  // useData(null, text);
  callback(text)
}

  export default fetchData;