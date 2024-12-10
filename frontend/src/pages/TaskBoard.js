import React, { useState } from 'react';
import { useSubcategory } from '../components/SubcategoryData';
import ButtonBoardAdd from '../components/ButtonBoardAdd';
import ColumnModal from '../components/ColumnModal';
import AddTaskModal from '../components/AddTaskModal';
import AddSubcategoryModal from '../components/AddSubcategoryModal';
import ModalTaskContain from '../components/ModalTaskContain';
import Columns from '../components/Columns';
import Calendar from '../components/Calendar';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]); // Liste des tâches
  const [columns, setColumns] = useState([]); // Liste des colonnes
  const [showTaskModal, setShowTaskModal] = useState(false); // Modal pour ajouter une tâche
  const [showTaskEditModal, setShowTaskEditModal] = useState(false); // Modal pour modifier une tâche
  const [showColumnModal, setShowColumnModal] = useState(false); // Modal pour ajouter une colonne
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false); // Modal pour ajouter une sous-catégorie
  const [currentTask, setCurrentTask] = useState(null); // Tâche actuellement sélectionnée
  const [draggedTaskId, setDraggedTaskId] = useState(null); // ID de la tâche en cours de drag

  const { subcategories } = useSubcategory(); // Récupère les sous-catégories

  // Ajouter une colonne
  const addColumn = (columnName) => {
    if (columnName.trim() === '') {
      alert('Le nom de la colonne ne peut pas être vide.');
      return;
    }

    const newColumn = {
      id: Date.now(),
      name: columnName,
    };

    setColumns((prev) => [...prev, newColumn]);
  };

  // Ajouter ou mettre à jour une tâche
  const handleSaveTask = (task) => {
    if (!columns.length) {
      alert('Merci d’ajouter une colonne avant d’ajouter une tâche.');
      return;
    }

    const updatedTasks = task.id
      ? tasks.map((t) => (t.id === task.id ? { ...task } : t)) // Mise à jour de la tâche existante
      : [...tasks, { ...task, id: Date.now(), status: task.status || columns[0]?.id }]; // Nouvelle tâche

    setTasks(updatedTasks);

    setShowTaskModal(false);
    setShowTaskEditModal(false);
    setCurrentTask(null);
  };

  // Supprimer une tâche
  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setShowTaskEditModal(false);
    setCurrentTask(null);
  };

  // Gérer le drag and drop
  const handleDragStart = (taskId) => {
    setDraggedTaskId(taskId);
  };

  const handleDrop = (targetColumnId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggedTaskId ? { ...task, status: targetColumnId } : task
      )
    );
    setDraggedTaskId(null);
  };

  const handleTaskClick = (task) => {
    setCurrentTask(task); // Définit la tâche actuelle pour la modification
    setShowTaskEditModal(true); // Affiche la modale de modification
  };

  return (
    <div className="task-board">
      <ButtonBoardAdd
        onAddColumn={() => setShowColumnModal(true)}
        onAddTask={() => setShowTaskModal(true)}
        onAddSubcategory={() => setShowSubcategoryModal(true)}
      />

      <div className="subcategory-list">
        <h3>Sous-catégories</h3>
        <ul>
          {subcategories.map((sub) => (
            <li key={sub.id} style={{ color: sub.color }}>
              {sub.title}
            </li>
          ))}
        </ul>
      </div>

      <Columns
        columns={columns}
        tasks={tasks}
        subcategories={subcategories}
        onTaskClick={handleTaskClick} // Ouvre la modale pour modifier la tâche
        onDragStartTask={handleDragStart}
        onDropTask={handleDrop}
      />

      <Calendar tasks={tasks} columns={columns} />

      <ColumnModal
        show={showColumnModal}
        onClose={() => setShowColumnModal(false)}
        addColumn={addColumn}
      />

      <AddTaskModal
        show={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSaveTask={handleSaveTask}
        columns={columns}
      />

      <AddSubcategoryModal
        show={showSubcategoryModal}
        onClose={() => setShowSubcategoryModal(false)}
      />

      <ModalTaskContain
        show={showTaskEditModal} // Ouvre la modale pour modifier une tâche
        onClose={() => {
          setShowTaskEditModal(false);
          setCurrentTask(null);
        }}
        onSaveTask={handleSaveTask} // Sauvegarde la tâche mise à jour
        onDeleteTask={handleDeleteTask} // Supprime la tâche
        task={currentTask} // Passe la tâche actuelle
        subcategories={subcategories} // Passe les sous-catégories
      />
    </div>
  );
};

export default TaskBoard;
