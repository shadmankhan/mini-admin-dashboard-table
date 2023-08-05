import React, { useState, forwardRef, useImperativeHandle } from 'react';
import './Snackbar.css';
import { SNACKBAR_TYPE } from '../../../utils/constants';

const Snackbar = forwardRef((_props, ref) => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 5000);
    },
    message: '',
    type: ''
  }));

  return (
    <div
      className="snackbar"
      id={showSnackbar ? 'show' : 'hide'}
      style={{
        backgroundColor: ref.current?.type === SNACKBAR_TYPE.success ? '#00F593' : '#FF0033',
        color: ref.current?.type === SNACKBAR_TYPE.success ? 'black' : 'white'
      }}
    >
      <div className="symbol">{ref.current?.type === SNACKBAR_TYPE.success ? <h1>&#x2713;</h1> : <h1>&#x2613;</h1>}</div>
      <div className="message">{ref.current?.message}</div>
    </div>
  );
});

export default Snackbar;
