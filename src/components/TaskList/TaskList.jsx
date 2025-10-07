import React from 'react';
import TaskItem from '../TaskItem/TaskItem';

const TaskList = ({
  tasks,
  currentFilter,
  onFilterChange,
  onToggleComplete,
  onDeleteTask,
  onEditTask
}) => {
  const filters = [
    { key: 'all', label: 'All Tasks' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
    { key: 'high', label: 'High Priority' },
    { key: 'medium', label: 'Medium Priority' },
    { key: 'low', label: 'Low Priority' }
  ];

  return (
    <div>
      <div className="filters-container">
        {filters.map(filter => (
          <button
            key={filter.key}
            className={`filter-btn ${currentFilter === filter.key ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks found</h3>
            <p>
              {currentFilter === 'all' 
                ? 'Start by adding your first task above!'
                : `No tasks match the "${filters.find(f => f.key === currentFilter)?.label}" filter`}
            </p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
