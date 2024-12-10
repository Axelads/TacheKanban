import React, { useState } from 'react';
import Modal from './Modal';

const ColumnModal = ({ show, onClose, addColumn }) => {
  const [columnsToAdd, setColumnsToAdd] = useState(['']); // Liste des noms de colonnes

  // Gestion des changements dans les champs de colonne
  const handleColumnNameChange = (index, value) => {
    setColumnsToAdd((prev) =>
      prev.map((col, i) => (i === index ? value : col))
    );
  };

  // Ajout d'un champ pour une nouvelle colonne
  const handleAddField = () => {
    setColumnsToAdd((prev) => [...prev, '']);
  };

  // Suppression d'un champ de colonne
  const handleRemoveField = (index) => {
    setColumnsToAdd((prev) => prev.filter((_, i) => i !== index));
  };

  // Validation et ajout de toutes les colonnes
  const handleAddColumns = () => {
    const validColumns = columnsToAdd.filter((name) => name.trim() !== ''); // Vérifie que les champs ne sont pas vides

    if (validColumns.length === 0) {
      alert('Veuillez entrer au moins un nom de colonne valide.');
      return;
    }

    validColumns.forEach((name) => addColumn(name.trim())); // Ajoute chaque colonne
    setColumnsToAdd(['']); // Réinitialise les champs
    onClose();
  };

  const handleClose = () => {
    setColumnsToAdd(['']); // Réinitialise les champs
    onClose();
  };

  if (!show) return null;

  return (
    <Modal show={show} title="Ajouter des colonnes" onClose={handleClose}>
      {columnsToAdd.map((col, index) => (
        <div key={index} className="column-input">
          <input
            type="text"
            placeholder={`Nom de la colonne ${index + 1}`}
            value={col}
            onChange={(e) => handleColumnNameChange(index, e.target.value)}
          />
          {columnsToAdd.length > 1 && (
            <button
              type="button"
              className="remove-field"
              onClick={() => handleRemoveField(index)}
            >
              Supprimer
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={handleAddField} className="add-field">
        + Ajouter un champ
      </button>

      <div className="modal-actions">
        <button onClick={handleAddColumns}>Ajouter toutes</button>
        <button onClick={handleClose}>Annuler</button>
      </div>
    </Modal>
  );
};

export default ColumnModal;
