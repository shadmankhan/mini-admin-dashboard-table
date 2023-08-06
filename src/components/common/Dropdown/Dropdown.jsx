import React, { useEffect, useRef, useState } from 'react';
import './Dropdown.css';

const Dropdown = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [title, setTitle] = useState('');

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionToggle = option => {
    let len = 0;
    let updatedOptions = [];
    if (option === 'Select all') {
      updatedOptions = selectedOptions.includes('Select all') ? [] : ['Select all', ...options];
      len = updatedOptions.length;
      if (updatedOptions.length - 1 === options.length) {
        len -= 1;
      }
    } else {
      updatedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter(item => item !== option).filter(i => i !== 'Select all')
        : [...selectedOptions, option];

      len = updatedOptions.length;
    }

    setTitle(`Company (${len})`);
    setSelectedOptions(updatedOptions);
    onChange(updatedOptions.filter(i => i !== 'Select all')); // Notify parent component about the selected options
  };

  return (
    <div ref={dropdownRef} className="custom-dropdown">
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        {selectedOptions.length ? title : 'Select Company'} {isOpen ? '▲' : '▼'}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {['Select all', ...options].map(option => (
            <label key={option}>
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionToggle(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
