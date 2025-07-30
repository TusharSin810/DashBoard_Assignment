import { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay } from 'date-fns';

const CalendarSection = ({ selectedUser }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [markedDates, setMarkedDates] = useState([]);
  const [newEvent, setNewEvent] = useState('');

  useEffect(() => {
    setMarkedDates([]);
    setNewEvent('');
  }, [selectedUser]);

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

 const handleDateClick = (day) => {
  const existingEvent = markedDates.find(e => isSameDay(e.date, day));

  if (existingEvent) {
    setMarkedDates(prev => prev.filter(e => !isSameDay(e.date, day)));
  } else {
    if (!newEvent) return;
    setMarkedDates(prev => [...prev, { date: day, label: newEvent }]);
    setNewEvent('');
  }
 };

  const getMarkedLabel = (day) => {
    const event = markedDates.find(e => isSameDay(e.date, day));
    return event ? event.label : null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-4">📅 Team Calendar</h2>
      
      <input
        type="text"
        placeholder="Enter event (e.g. Meeting)"
        value={newEvent}
        onChange={(e) => setNewEvent(e.target.value)}
        className="w-full p-2 rounded-md border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 mb-4"
      />

      <div className="grid grid-cols-7 gap-2 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="font-semibold text-sm">{day}</div>
        ))}
        {days.map((day, index) => {
          const label = getMarkedLabel(day);
          return (
            <div
              key={index}
              className={`p-2 rounded-md cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-700 transition duration-150 ${
                label ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700'
              }`}
              onClick={() => handleDateClick(day)}
            >
              <div className="text-sm font-medium">{format(day, 'd')}</div>
              {label && <div className="text-xs">{label}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarSection;
