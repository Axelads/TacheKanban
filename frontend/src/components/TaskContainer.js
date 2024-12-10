import React from 'react';
import TaskDate from './TaskDate';

const TaskContainer = ({ tasks, onTaskClick, onDragStartTask, subcategories = [] }) => {
  console.log('Tasks received in TaskContainer:', tasks);
  console.log('Subcategories received in TaskContainer:', subcategories);

  return (
    <div className="tasks">
      {tasks.map((task) => {
        const subcategory = subcategories.find((sub) => String(sub.id) === String(task.subcategoryId));
        console.log('Rendering task:', task);
        console.log('Subcategory for task:', subcategory);

        return (
          <div
            key={task.id}
            className="task"
            draggable
            onDragStart={() => onDragStartTask(task.id)}
            onClick={() => onTaskClick(task)}
          >
            <h3>{task.title}</h3>
            {subcategory ? (
              <p className="task-subcategory" style={{ color: subcategory.color }}>
                {subcategory.title}
              </p>
            ) : (
              <p className="task-subcategory">Aucune sous-catégorie</p>
            )}
            {task.description && <h4>{task.description}</h4>}
            <TaskDate label="Début" date={task.startDate} />
            <TaskDate label="Fin" date={task.endDate} />
          </div>
        );
      })}
    </div>
  );
};

export default TaskContainer;
