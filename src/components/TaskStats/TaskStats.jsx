import React from 'react';

const TaskStats = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const highPriorityTasks = tasks.filter(task => task.priority === 'high' && !task.completed).length;

  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <span className="stat-number">{totalTasks}</span>
        <span className="stat-label">Total Tasks</span>
      </div>
      
      <div className="stat-card">
        <span className="stat-number">{activeTasks}</span>
        <span className="stat-label">Active</span>
      </div>
      
      <div className="stat-card">
        <span className="stat-number">{completedTasks}</span>
        <span className="stat-label">Completed</span>
      </div>
      
      <div className="stat-card">
        <span className="stat-number">{highPriorityTasks}</span>
        <span className="stat-label">High Priority</span>
      </div>
      
      <div className="stat-card">
        <span className="stat-number">{completionPercentage}%</span>
        <span className="stat-label">Completion</span>
      </div>
    </div>
  );
};

export default TaskStats;