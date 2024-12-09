import React, { useState, useEffect } from 'react';

const Calendar = ({ tasks, columns }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);

  // Calcule les dates de la semaine en fonction de `currentDate`
  const calculateWeekDates = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay()); // Commence le dimanche
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  // Met à jour les dates de la semaine visible
  useEffect(() => {
    setWeekDates(calculateWeekDates(currentDate));
  }, [currentDate]);

  // Change la semaine (suivante ou précédente)
  const changeWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction * 7);
    setCurrentDate(newDate);
  };

  // Filtrer les tâches correspondant à une date donnée
  const getTasksForDate = (date) => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.startDate).toDateString();
      return taskDate === date.toDateString();
    });
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => changeWeek(-1)}>← Semaine précédente</button>
        <h3>Semaine du {weekDates[0]?.toLocaleDateString()} au {weekDates[6]?.toLocaleDateString()}</h3>
        <button onClick={() => changeWeek(1)}>Semaine suivante →</button>
      </div>
      <div className="calendar-week">
        {weekDates.map((date, index) => (
          <div key={index} className="calendar-day">
            <p>{date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
            <div className="tasks-for-day">
              {getTasksForDate(date).map((task) => {
                const column = columns.find((col) => col.id === task.status); // Trouver la colonne associée
                return (
                  <div
                    key={task.id}
                    className="task"
                    style={{
                      backgroundColor: column ? column.color : '#ddd', // Utiliser la couleur de la colonne
                    }}
                  >
                    <p>{task.title}</p>
                    {task.description && <h4>{task.description}</h4>} {/* Affiche la description si elle existe */}

                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
