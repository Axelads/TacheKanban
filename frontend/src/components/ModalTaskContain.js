import React, { useState, useEffect } from 'react';

const ModalTaskContain = ({
  show,
  onClose,
  onSaveTask,
  onDeleteTask,
  task, // Tâche à modifier
  subcategories = [],
}) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');

  useEffect(() => {
    if (task) {
      setTaskTitle(task.title);
      setTaskDescription(task.description);
      setStartDate(task.startDate);
      setEndDate(task.endDate);
      setSubcategoryId(task.subcategoryId || '');
    }
  }, [task]);

  const handleSaveTask = () => {
    if (taskTitle.trim() === '') {
      alert('Le titre de la tâche ne peut pas être vide.');
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      alert('La date de début doit être antérieure à la date de fin.');
      return;
    }

    onSaveTask({
      ...task,
      title: taskTitle,
      description: taskDescription,
      startDate,
      endDate,
      subcategoryId: subcategoryId || null,
    });

    onClose();
  };

  const handleDeleteTask = () => {
    onDeleteTask(task.id);
    onClose();
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal')) {
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="modal" onClick={handleOutsideClick}>
      <div className="modal-content">
        <h3>Modifier la tâche</h3>
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
            <option key={sub.id} value={sub.id}>
              {sub.title}
            </option>
          ))}
        </select>
        <div className="modal-actions">
          <button onClick={handleSaveTask}>Mettre à jour</button>
          <button onClick={handleDeleteTask}>Supprimer</button>
          <button onClick={onClose}>Annuler</button>
        </div>
      </div>
    </div>
  );
};

export default ModalTaskContain;
