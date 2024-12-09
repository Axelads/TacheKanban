import React, { useState } from 'react';
import Column from '../components/Column';
import Modal from '../components/Modal';
import AddTaskModal from '../components/AddTaskModal';
import Calendar from '../components/Calendar'; // Importation du calendrier

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]); // Liste des tâches
  const [columns, setColumns] = useState([]); // Liste des colonnes
  const [subcategories, setSubcategories] = useState([]); // Liste des sous-catégories
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false); // État pour la modale de sous-catégorie
  const [newColumnName, setNewColumnName] = useState('');
  const [newSubcategory, setNewSubcategory] = useState({ name: '', color: '#000000' });
  const [errorMessage, setErrorMessage] = useState('');
  const [currentTask, setCurrentTask] = useState(null);
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  // Palette de couleurs pour les colonnes
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFC300', '#DAF7A6', '#C70039', '#581845', '#FF33C4', '#33FFF3', '#FF9633'];

  // Ajouter une colonne
  const addColumn = () => {
    if (newColumnName.trim() !== '') {
      const newColumnId = columns.length + 1;
      setColumns((prevColumns) => [
        ...prevColumns,
        {
          id: newColumnId,
          name: newColumnName.trim(),
          color: colors[(newColumnId - 1) % colors.length],
        },
      ]);
      setNewColumnName('');
      setShowColumnModal(false);
    } else {
      setErrorMessage('Le nom de la colonne ne peut pas être vide.');
    }
  };

  // Ajouter une sous-catégorie
  const addSubcategory = () => {
    if (newSubcategory.name.trim()) {
      setSubcategories((prev) => [...prev, { ...newSubcategory, id: Date.now() }]);
      setNewSubcategory({ name: '', color: '#000000' }); // Réinitialise le formulaire
      setShowSubcategoryModal(false); // Ferme la modale
    } else {
      setErrorMessage('Le nom de la sous-catégorie ne peut pas être vide.');
    }
  };

  // Ajouter ou modifier une tâche
  const saveTask = (task) => {
    if (!columns.length) {
      setErrorMessage('Merci d’ajouter une colonne avant d’ajouter une tâche.');
      return;
    }

    if (task.id) {
      // Modification d'une tâche existante
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === task.id ? { ...task, status: task.status || columns[0].id } : t
        )
      );
    } else {
      // Ajout d'une nouvelle tâche
      const newTask = {
        id: Date.now(),
        ...task,
        status: task.status || columns[0].id, // Par défaut, première colonne
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    setShowTaskModal(false);
    setCurrentTask(null);
    setErrorMessage('');
  };

  // Déplacer une tâche entre colonnes
  const moveTask = (taskId, targetColumnId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: targetColumnId } : task
      )
    );
  };

  return (
    <div className="task-board">
      <div className="button-container">
        <button className="add-column-btn" onClick={() => setShowColumnModal(true)}>
          Ajouter une colonne
        </button>
        <button
          className="add-task-btn"
          onClick={() => {
            setShowTaskModal(true);
            setCurrentTask(null); // Réinitialise pour créer une nouvelle tâche
          }}
        >
          Ajouter une tâche
        </button>
        <button
          className="add-subcategory-btn"
          onClick={() => setShowSubcategoryModal(true)}
        >
          Ajouter une sous-catégorie
        </button>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="contain-columns">
  {columns.map((column) => (
    <Column
      key={column.id}
      columnId={column.id}
      columnName={column.name}
      tasks={tasks.filter((task) => task.status === column.id)} // Filtrer les tâches par ID de colonne
      color={column.color}
      subcategories={subcategories} // Transmettre les sous-catégories
      onTaskClick={(task) => {
        setCurrentTask(task);
        setShowTaskModal(true);
      }}
      onDragStartTask={(taskId) => setDraggedTaskId(taskId)}
      onDropTask={() => moveTask(draggedTaskId, column.id)}
    />
  ))}
</div>

      {/* Ajout du calendrier en dessous des colonnes */}
      <Calendar tasks={tasks} columns={columns} />

      {/* Modale pour ajouter une colonne */}
      <Modal
        show={showColumnModal}
        title="Ajouter une colonne"
        onClose={() => setShowColumnModal(false)}
      >
        <input
          type="text"
          placeholder="Nom de la colonne"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
        />
        <button onClick={addColumn}>Ajouter</button>
      </Modal>

      {/* Modale pour ajouter une sous-catégorie */}
      <Modal
        show={showSubcategoryModal}
        title="Ajouter une sous-catégorie"
        onClose={() => setShowSubcategoryModal(false)}
      >
        <input
          type="text"
          placeholder="Nom de la sous-catégorie"
          value={newSubcategory.name}
          onChange={(e) =>
            setNewSubcategory((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          type="color"
          value={newSubcategory.color}
          onChange={(e) =>
            setNewSubcategory((prev) => ({ ...prev, color: e.target.value }))
          }
        />
        <button onClick={addSubcategory}>Ajouter</button>
      </Modal>

      {/* Modale pour ajouter ou modifier une tâche */}
      <AddTaskModal
        show={showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          setCurrentTask(null);
        }}
        onSaveTask={saveTask}
        onDeleteTask={(taskId) => setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))}
        columns={columns.map((col) => ({ id: col.id, name: col.name }))} // Passe les colonnes au format attendu
        subcategories={subcategories} // Passe les sous-catégories
        initialTask={currentTask}
      />
    </div>
  );
};

export default TaskBoard;
