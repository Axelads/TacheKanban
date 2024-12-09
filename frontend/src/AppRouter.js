import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TaskBoard from './pages/TaskBoard';
import CalendarView from './pages/CalendarView';

const AppRouter = () => {
    return (
        <Router>
          <nav>
            <Link to="/">Tableau des tâches</Link> | <Link to="/calendar">Calendrier</Link>
          </nav>
          <Routes>
            <Route path="/" element={<TaskBoard />} />
            <Route path="/calendar" element={<CalendarView />} />
          </Routes>
        </Router>
      );
    };

export default AppRouter;
