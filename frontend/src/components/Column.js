import React from 'react';
import TaskDate from '../components/TaskDate';

const Column = ({ columnId, columnName, tasks, onTaskClick, onDragStartTask, onDropTask, subcategories }) => {
  return (
    <div
      className="column"
      data-id={columnId} // Ajout de l'ID de la colonne
      onDragOver={(e) => e.preventDefault()} // Permet le drop
      onDrop={onDropTask} // Appelle la fonction pour gérer le drop
    >
      <h2>{columnName}</h2>
      <div className="tasks">
        {tasks.map((task) => {
          // Recherche de la sous-catégorie associée à la tâche
          const subcategory = subcategories.find((sub) => sub.id === task.subcategory);

          return (
            <div
              key={task.id}
              className="task"
              draggable
              onDragStart={() => onDragStartTask(task.id)} // Appelle la fonction passée en prop
              onClick={() => onTaskClick(task)} // Ouvre la modale pour modifier la tâche
            >
              <h3>{task.title}</h3>
              {subcategory && (
                <p
                  className="task-subcategory"
                  style={{ backgroundColor: subcategory.color }}
                >
                  {subcategory.name}
                </p>
              )}
              <h4 className="task-description">{task.description}</h4>
              <TaskDate label="Début" date={task.startDate} />
              <TaskDate label="Fin" date={task.endDate} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Column;
