import React, { useState, useEffect, useCallback } from 'react';

const AddTaskModal = ({
  show,
  onClose,
  onSaveTask,
  onDeleteTask,
  columns,
  subcategories, // Ajout des sous-catégories passées en prop
  initialTask,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: columns.length > 0 ? columns[0].id : '', // ID de la première colonne par défaut
    subcategory: '', // Pas de sous-catégorie par défaut ("Aucun")
  });

  // Réinitialisation des champs du formulaire
  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      status: columns.length > 0 ? columns[0].id : '', // ID de la première colonne par défaut
      subcategory: '', // Pas de sous-catégorie par défaut ("Aucun")
    });
  }, [columns]);

  // Initialisation du formulaire lorsque `initialTask` ou `columns`/`subcategories` changent
  useEffect(() => {
    if (initialTask) {
      setFormData(initialTask); // Remplit le formulaire avec les données existantes
    } else {
      resetForm(); // Réinitialise le formulaire pour une nouvelle tâche
    }
  }, [initialTask, columns, subcategories, resetForm]);

  // Gère les modifications des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Soumet le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSaveTask(formData);
      resetForm(); // Réinitialise les champs après ajout
      onClose(); // Ferme la modale après soumission
    } else {
      console.error('Le titre est requis.', formData);
    }
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{initialTask ? 'Modifier la tâche' : 'Ajouter une tâche'}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Titre"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            type="datetime-local"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
          <input
            type="datetime-local"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
          <select
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
          >
            <option value="">Aucun</option> {/* Option "Aucun" */}
            {subcategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
          <div className="modal-actions">
            <button type="submit">{initialTask ? 'Mettre à jour' : 'Ajouter'}</button>
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
            >
              Annuler
            </button>
            {initialTask && (
              <button
                type="button"
                onClick={() => {
                  onDeleteTask(initialTask.id);
                  onClose();
                }}
              >
                Supprimer
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
