import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ dueDate, completed }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [isOverdue, setIsOverdue] = useState(false);

  useEffect(() => {
    if (!dueDate || completed) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const deadline = new Date(dueDate).getTime();
      const difference = deadline - now;

      if (difference < 0) {
        setIsOverdue(true);
        const overdueDiff = Math.abs(difference);
        const days = Math.floor(overdueDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((overdueDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h overdue`);
        } else {
          const minutes = Math.floor((overdueDiff % (1000 * 60 * 60)) / (1000 * 60));
          setTimeLeft(`${hours}h ${minutes}m overdue`);
        }
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setIsOverdue(false);

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else if (minutes > 0) {
        setTimeLeft(`${minutes}m ${seconds}s`);
      } else {
        setTimeLeft(`${seconds}s`);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [dueDate, completed]);

  if (!dueDate || completed) return null;

  return (
    <span className={`countdown-timer ${isOverdue ? 'overdue' : ''}`}>
      ⏰ {timeLeft}
    </span>
  );
};

export default CountdownTimer;

