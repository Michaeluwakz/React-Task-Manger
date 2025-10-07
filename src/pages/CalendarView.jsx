import React from 'react';
import Calendar from '../components/Calendar/Calendar';

const CalendarView = ({ tasks, onAddTask }) => {
  return (
    <div className="calendar-view">
      <Calendar 
        tasks={tasks} 
        onAddTask={onAddTask}
      />
    </div>
  );
};

export default CalendarView;

