import React from 'react';

// Fonction pour formater les dates
const formatDateTime = (dateString) => {
  if (!dateString) return 'Non spécifiée';

  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  return new Date(dateString).toLocaleString('fr-FR', options);
};

const TaskDate = ({ label, date }) => {
  return (
    <p className="task-dates">
      <span className="date-label">{label} :</span> {formatDateTime(date)}
    </p>
  );
};

export default TaskDate;
