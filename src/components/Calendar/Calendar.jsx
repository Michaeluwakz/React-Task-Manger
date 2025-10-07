import React, { useState } from 'react';

const Calendar = ({ tasks, onAddTask, onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium'
  });

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getTasksForDate = (date) => {
    const dateStr = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString().split('T')[0];
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate).toISOString().split('T')[0];
      return taskDate === dateStr;
    });
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    setShowTaskForm(true);
    
    const dateStr = clickedDate.toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, dueDate: dateStr }));
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    onAddTask({
      ...formData,
      dueDate: selectedDate.toISOString().split('T')[0]
    });

    setFormData({
      title: '',
      description: '',
      priority: 'medium'
    });
    setShowTaskForm(false);
    setSelectedDate(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const today = new Date();
  const isToday = (day) => {
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayTasks = getTasksForDate(date);
    const isSelected = selectedDate && 
                       day === selectedDate.getDate() && 
                       currentDate.getMonth() === selectedDate.getMonth() &&
                       currentDate.getFullYear() === selectedDate.getFullYear();

    days.push(
      <div
        key={day}
        className={`calendar-day ${isToday(day) ? 'today' : ''} ${isSelected ? 'selected' : ''} ${dayTasks.length > 0 ? 'has-tasks' : ''}`}
        onClick={() => handleDateClick(day)}
      >
        <span className="day-number">{day}</span>
        {dayTasks.length > 0 && (
          <div className="task-indicators">
            {dayTasks.slice(0, 3).map((task, idx) => (
              <div
                key={idx}
                className={`task-dot priority-${task.priority}`}
                title={task.title}
              ></div>
            ))}
            {dayTasks.length > 3 && (
              <span className="more-tasks">+{dayTasks.length - 3}</span>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>📅 Calendar View</h2>
        <div className="calendar-controls">
          <button className="btn btn-secondary" onClick={handlePrevMonth}>
            ← Prev
          </button>
          <button className="btn btn-secondary" onClick={handleToday}>
            Today
          </button>
          <button className="btn btn-secondary" onClick={handleNextMonth}>
            Next →
          </button>
        </div>
      </div>

      <div className="calendar-month-title">
        <h3>{monthName}</h3>
      </div>

      <div className="calendar-grid">
        <div className="calendar-weekday">Sun</div>
        <div className="calendar-weekday">Mon</div>
        <div className="calendar-weekday">Tue</div>
        <div className="calendar-weekday">Wed</div>
        <div className="calendar-weekday">Thu</div>
        <div className="calendar-weekday">Fri</div>
        <div className="calendar-weekday">Sat</div>
        {days}
      </div>

      {selectedDate && (
        <div className="selected-date-info">
          <h3>
            Tasks for {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </h3>
          
          {getTasksForDate(selectedDate).length > 0 && (
            <div className="date-tasks-list">
              {getTasksForDate(selectedDate).map(task => (
                <div key={task.id} className={`date-task-item ${task.completed ? 'completed' : ''}`}>
                  <span className={`priority-badge priority-${task.priority}`}>
                    {task.priority}
                  </span>
                  <span className="date-task-title">{task.title}</span>
                </div>
              ))}
            </div>
          )}

          {showTaskForm ? (
            <form onSubmit={handleSubmit} className="calendar-task-form">
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  className="form-input"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Task title..."
                  autoFocus
                />
              </div>

              <div className="form-group">
                <textarea
                  name="description"
                  className="form-input form-textarea"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description (optional)..."
                  rows="2"
                />
              </div>

              <div className="form-group">
                <select
                  name="priority"
                  className="form-input"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn btn-primary">
                  Add Task
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowTaskForm(false);
                    setFormData({ title: '', description: '', priority: 'medium' });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button 
              className="btn btn-primary"
              onClick={() => setShowTaskForm(true)}
            >
              + Add Task for this Date
            </button>
          )}
        </div>
      )}

      <div className="calendar-legend">
        <div className="legend-item">
          <div className="legend-dot today-indicator"></div>
          <span>Today</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot has-tasks-indicator"></div>
          <span>Has Tasks</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot priority-high"></div>
          <span>High Priority</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot priority-medium"></div>
          <span>Medium Priority</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot priority-low"></div>
          <span>Low Priority</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;

