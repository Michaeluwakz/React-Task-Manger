import React, { useState } from 'react';
import CountdownTimer from '../CountdownTimer/CountdownTimer';

const TaskItem = ({ task, onToggleComplete, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate
    });
  };

  const handleSave = () => {
    if (!editData.title.trim()) {
      alert('Please enter a task title');
      return;
    }
    onEdit(task.id, editData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && !task.completed;
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <div className="form-group">
          <input
            type="text"
            name="title"
            className="form-input"
            value={editData.title}
            onChange={handleChange}
            placeholder="Task title..."
          />
        </div>

        <div className="form-group">
          <textarea
            name="description"
            className="form-input form-textarea"
            value={editData.description}
            onChange={handleChange}
            placeholder="Description..."
            rows="2"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
          <select
            name="priority"
            className="form-input"
            value={editData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            type="date"
            name="dueDate"
            className="form-input"
            value={editData.dueDate}
            onChange={handleChange}
          />
        </div>

        <div className="task-actions">
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <input
            type="checkbox"
            className="task-checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
          />
          <h3 className="task-title">{task.title}</h3>
          <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
            {task.priority}
          </span>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-footer">
          <div className="task-footer-left">
            {task.dueDate && (
              <>
                <span className={`task-due-date ${isOverdue(task.dueDate) ? 'overdue' : ''}`}>
                  {isOverdue(task.dueDate) ? '⚠️ ' : '📅 '}
                  {formatDate(task.dueDate)}
                </span>
                <CountdownTimer dueDate={task.dueDate} completed={task.completed} />
              </>
            )}
          </div>
          <span className="task-created">
            Created {formatDate(task.createdAt)}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button 
          className="btn btn-icon" 
          onClick={handleEdit}
          title="Edit task"
        >
          ✏️
        </button>
        <button 
          className="btn btn-icon btn-danger" 
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

