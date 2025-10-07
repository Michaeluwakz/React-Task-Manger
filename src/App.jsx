import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import MainView from './pages/MainView';
import CalendarView from './pages/CalendarView';
import { getTasks, saveTasks } from './utils/localStorage';

function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="app-nav">
      <Link 
        to="/" 
        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
      >
        📋 Task List
      </Link>
      <Link 
        to="/calendar" 
        className={`nav-link ${location.pathname === '/calendar' ? 'active' : ''}`}
      >
        📅 Calendar
      </Link>
    </nav>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  // Load tasks from localStorage on mount
  useEffect(() => {
    const loadedTasks = getTasks();
    setTasks(loadedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const toggleComplete = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }
  };

  const editTask = (taskId, updatedData) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, ...updatedData }
          : task
      )
    );
  };

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>📝 Task Manager</h1>
          <p>Organize your tasks efficiently</p>
        </header>

        <Navigation />

        <main className="app-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <MainView
                  tasks={tasks}
                  filter={filter}
                  setFilter={setFilter}
                  onAddTask={addTask}
                  onToggleComplete={toggleComplete}
                  onDeleteTask={deleteTask}
                  onEditTask={editTask}
                />
              } 
            />
            <Route 
              path="/calendar" 
              element={
                <CalendarView
                  tasks={tasks}
                  onAddTask={addTask}
                />
              } 
            />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>Built with React & Vite</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

