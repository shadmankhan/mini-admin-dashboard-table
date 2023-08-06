import React from 'react';
import './Button.css';

const Button = ({ children, isLoading, color = 'blue', size = 'md', ...rest }) => (
  <button className={`button ${isLoading ? 'progress' : ''} button-md ${color}`} {...rest}>
    {children}
  </button>
);

export default Button;
