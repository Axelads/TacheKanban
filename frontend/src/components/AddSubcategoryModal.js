import React, { useState } from 'react';
import { SketchPicker } from 'react-color'; // Bibliothèque pour la sélection de couleur
import { useSubcategory } from './SubcategoryData'; // Import du contexte

const AddSubcategoryModal = ({ show, onClose }) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#FF5733'); // Couleur par défaut
  const { addSubcategory } = useSubcategory(); // Utilisation du contexte

  const handleSave = () => {
    if (title.trim() !== '') {
      addSubcategory({ title, color }); // Ajout via le contexte
      setTitle(''); // Réinitialise le formulaire
      setColor('#FF5733'); // Couleur par défaut
      onClose(); // Ferme la modal
    } else {
      alert('Le nom de la sous-catégorie ne peut pas être vide.');
    }
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Ajouter une sous-catégorie</h3>
        <input
          type="text"
          placeholder="Nom de la sous-catégorie"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <SketchPicker
          color={color}
          onChangeComplete={(color) => setColor(color.hex)} // Met à jour la couleur
        />
        <div className="modal-actions">
          <button onClick={handleSave}>Ajouter</button>
          <button onClick={onClose}>Annuler</button>
        </div>
      </div>
    </div>
  );
};

export default AddSubcategoryModal;
