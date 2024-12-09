import React from 'react';
import Column from './Column';

const Columns = ({ columns, tasks, subcategories, onTaskClick, onDragStartTask, onDropTask }) => (
  <div className="contain-columns">
    {columns.map((column) => (
      <Column
        key={column.id}
        columnId={column.id}
        columnName={column.name}
        tasks={tasks.filter((task) => task.status === column.id)}
        subcategories={subcategories}
        onTaskClick={onTaskClick}
        onDragStartTask={onDragStartTask}
        onDropTask={(targetColumnId) => onDropTask(targetColumnId)}
      />
    ))}
  </div>
);

export default Columns;
