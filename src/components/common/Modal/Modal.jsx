import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="modal-backdrop">
      <div className="modal-content">
        {children}
        {onClose && <button onClick={onClose}>Close Modal</button>}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
