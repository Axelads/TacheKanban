import React from 'react';
import Modal from './Modal';

const ColumnModal = ({ show, onClose, newColumnName, setNewColumnName, addColumn }) => (
  <Modal show={show} title="Ajouter une colonne" onClose={onClose}>
    <input
      type="text"
      placeholder="Nom de la colonne"
      value={newColumnName}
      onChange={(e) => setNewColumnName(e.target.value)}
    />
    <button onClick={addColumn}>Ajouter</button>
  </Modal>
);

export default ColumnModal;
