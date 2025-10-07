import React from 'react';
import TaskForm from '../components/TaskForm/TaskForm';
import TaskList from '../components/TaskList/TaskList';
import TaskStats from '../components/TaskStats/TaskStats';

const MainView = ({
  tasks,
  filter,
  setFilter,
  onAddTask,
  onToggleComplete,
  onDeleteTask,
  onEditTask
}) => {
  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'high':
        return tasks.filter(task => task.priority === 'high');
      case 'medium':
        return tasks.filter(task => task.priority === 'medium');
      case 'low':
        return tasks.filter(task => task.priority === 'low');
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <>
      <TaskStats tasks={tasks} />
      
      <div className="content-grid">
        <TaskForm onAddTask={onAddTask} />
        
        <TaskList
          tasks={filteredTasks}
          currentFilter={filter}
          onFilterChange={setFilter}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      </div>
    </>
  );
};

export default MainView;

