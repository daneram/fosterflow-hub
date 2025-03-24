
export const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const getMonthStartDate = (date: Date) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  return start;
};

export const getMonthEndDate = (date: Date) => {
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return end;
};

export const getWeekStartDate = (date: Date) => {
  const day = date.getDay();
  const diff = date.getDate() - day;
  return new Date(date.getFullYear(), date.getMonth(), diff);
};

export const getWeekEndDate = (date: Date) => {
  const start = getWeekStartDate(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return end;
};

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const isSameDay = (d1: Date, d2: Date) => {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};

export const getEventTypeColor = (type: string) => {
  switch(type) {
    case 'visit': return 'bg-blue-500';
    case 'meeting': return 'bg-green-500';
    case 'appointment': return 'bg-purple-500';
    case 'court': return 'bg-red-500';
    case 'deadline': return 'bg-amber-500';
    default: return 'bg-gray-500';
  }
};
