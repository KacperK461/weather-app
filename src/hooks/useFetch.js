import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const getData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    setData(data);
    setLoading(false);
    return data;
  };

  useEffect(() => {
    if (url) getData(url);
  }, [url]);

  return { loading, data, getData };
};

export default useFetch;
