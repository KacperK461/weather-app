import React, { useState, useRef } from 'react';
import useFetch from '../../hooks/useFetch';
import useData from '../../hooks/useData';

const PlaceAutocomplete = () => {
  const [address, setAddress] = useState('');
  const [focus, setFocus] = useState(false);
  const [data, setData] = useState([]);
  const [focused, setFocused] = useState({ index: -1, title: null });
  const [error, setError] = useState(false);

  const { getData } = useFetch();
  const { setCallInfo } = useData();

  const input = useRef(null);

  const handleChange = async ({ target }) => {
    setAddress(target.value);
    const { items } = await getData(
      `/api/autocomplete?q=${target.value.replaceAll(' ', '+')}`
    );

    items && setData(items);
  };

  const handleOnKeyDown = (event) => {
    const index = focused.index;

    if (event.keyCode === 40 && index + 1 < data.length)
      setFocused({ index: index + 1, title: data[index + 1].title });

    if (event.keyCode === 38) {
      event.preventDefault();
      if (index > 0)
        setFocused({ index: index - 1, title: data[index - 1].title });
      if (index === 0) setFocused({ index: -1, title: null });
    }

    if (event.keyCode === 13) {
      setFocus(false);
      input.current.blur();

      if (focused.title) {
        setAddress(focused.title);
        terminate(focused.title);
      } else terminate(event.target.value);
    }

    if (!/40|38|13/.test(event.keyCode)) {
      setFocused({ index: -1, title: null });
    }
  };

  const handleClick = (title) => {
    setFocus(false);
    input.current.blur();
    setAddress(title);
    terminate(title);
  };

  const terminate = async (result) => {
    const { items } = await getData(
      `/api/geocode?q=${result.replaceAll(' ', '+')}`
    );

    if (items && items[0]) {
      const { lat, lng } = items[0].position;

      setCallInfo((prevState) => {
        return { ...prevState, lat, lon: lng, address };
      });
      setError(false);
    } else setError(true);
  };

  return (
    <div>
      <input
        ref={input}
        value={address}
        onChange={handleChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onKeyDown={(event) => handleOnKeyDown(event)}
        onClick={() => setFocused({ index: -1, title: null })}
      />
      {focus && address && (
        <Autocomplete
          data={data}
          handleClick={handleClick}
          focusedIndex={focused.index}
        />
      )}
      <span>{error ? 'Incorrect location' : ''}</span>
    </div>
  );
};

const Autocomplete = ({ data, handleClick, focusedIndex }) => {
  return (
    <div>
      {data.map((item, index) => (
        <div
          key={item.id}
          style={index === focusedIndex ? { background: '#999999' } : null}
          onMouseDown={() => handleClick(item.title)}>
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default PlaceAutocomplete;
