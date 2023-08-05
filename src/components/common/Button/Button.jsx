import React from 'react';
import './Button.css';

const Button = ({ children, isLoading, color = 'blue', size = 'md', ...rest }) => {
  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'button-sm';
      case 'lg':
        return 'button-lg';
      default:
        return 'button-md';
    }
  };

  return (
    <button className={`button ${isLoading ? 'progress' : ''} ${getSizeClass()} ${color}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
