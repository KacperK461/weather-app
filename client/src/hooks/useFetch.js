import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null); // loading, error, done

  const getData = async (url) => {
    setStatus('loading');
    let data;

    try {
      data = await call(url);
    } catch (err) {
      setError(err);
      setStatus('error');
    }

    setData(data);
    setError(null);
    setStatus('done');
  };

  const call = async (url) => {
    const response = await fetch(url);

    if (response.status >= 400)
      throw new Error(`Error: ${response.status} when call: ${url}`);

    return await response.json();
  };

  useEffect(() => url && getData(url), [url]);

  return { status, error, data, getData };
};

export default useFetch;
