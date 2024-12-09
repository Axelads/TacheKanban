import React from 'react';

const Modal = ({ show, title, children, onClose }) => {
  if (!show) return null;

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal')) {
      onClose(); // Ferme la modale si le clic est à l'extérieur
    }
  };

  return (
    <div className="modal" onClick={handleOutsideClick}>
      <div className="modal-content">
        <h3>{title}</h3>
        {children}
        <button className="close-btn" onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
};

export default Modal;
