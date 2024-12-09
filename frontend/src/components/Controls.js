import React from 'react';

const Controls = ({ onAddColumn, onAddTask }) => (
  <div className="button-container">
    <button className="add-column-btn" onClick={onAddColumn}>
      Ajouter une colonne
    </button>
    <button className="add-task-btn" onClick={onAddTask}>
      Ajouter une tâche
    </button>
  </div>
);

export default Controls;
