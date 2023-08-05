import React from 'react';
import './Input.css';

const Input = ({ label, value, onChange, type = 'text', ...rest }) => {
  return (
    <div className="input-container">
      {label && <label htmlFor={rest.id}>{label}</label>}
      <input type={type} value={value} onChange={onChange} className="input effect" {...rest} />
      <span className="focus-border" />
    </div>
  );
};

export default Input;
