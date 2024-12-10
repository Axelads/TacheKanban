import React, { useState } from 'react';
import { useSubcategory } from './SubcategoryData';

const AddTaskModal = ({ show, onClose, onSaveTask, columns }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const { subcategories } = useSubcategory();

  const handleSaveTask = () => {
    if (!columns?.length) {
      alert('Merci d’ajouter une colonne avant d’ajouter une tâche.');
      return;
    }

    if (taskTitle.trim() === '') {
      alert('Le titre de la tâche ne peut pas être vide.');
      return;
    }

    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      alert('La date de début doit être antérieure à la date de fin.');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
      startDate,
      endDate,
      columnId: columns[0]?.id,
      subcategoryId: subcategoryId || null,
    };

    console.log('Task being added in AddTaskModal:', newTask);
    onSaveTask(newTask);

    setTaskTitle('');
    setTaskDescription('');
    setStartDate('');
    setEndDate('');
    setSubcategoryId('');
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Ajouter une tâche</h3>
        {columns?.length > 0 ? (
          <>
            <input
              type="text"
              placeholder="Titre de la tâche"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <textarea
              placeholder="Description de la tâche"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            <label htmlFor="start-date">Date et heure de début :</label>
            <input
              type="datetime-local"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label htmlFor="end-date">Date et heure de fin :</label>
            <input
              type="datetime-local"
              id="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <label htmlFor="subcategory">Sous-catégorie :</label>
            <select
              id="subcategory"
              value={subcategoryId}
              onChange={(e) => setSubcategoryId(e.target.value)}
            >
              <option value="">Aucun</option>
              {subcategories.map((sub) => (
                <option key={`subcategory-${sub.id}`} value={sub.id}>
                  {sub.title}
                </option>
              ))}
            </select>
            <div className="modal-actions">
              <button onClick={handleSaveTask}>Ajouter</button>
              <button onClick={onClose}>Annuler</button>
            </div>
          </>
        ) : (
          <p>Aucune colonne disponible. Ajoutez une colonne d'abord.</p>
        )}
      </div>
    </div>
  );
};

export default AddTaskModal;
