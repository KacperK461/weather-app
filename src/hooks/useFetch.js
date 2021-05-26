import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState({ hasError: false, err: null });

  const getData = async (url) => {
    let data;

    try {
      const response = await fetch(url);
      if (response.status >= 400)
        throw new Error(`Error: ${response.status} when call: ${url}`);

      data = await response.json();
    } catch (err) {
      setError({ hasError: true, err });
      setLoading(false);

      return false;
    }

    setData(data);
    setLoading(false);

    return data;
  };

  useEffect(() => {
    if (url) getData(url);
  }, [url]);

  return { loading, data, error, getData };
};

export default useFetch;
