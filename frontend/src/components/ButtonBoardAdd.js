import React from 'react';

const ButtonBoardAdd = ({ onAddColumn, onAddTask, onAddSubcategory }) => {
  return (
    <div className="button-container">
      <button onClick={onAddColumn}>Ajouter une colonne</button>
      <button onClick={onAddTask}>Ajouter une tâche</button>
      <button onClick={onAddSubcategory}>Ajouter une sous-catégorie</button>
    </div>
  );
};

export default ButtonBoardAdd;
