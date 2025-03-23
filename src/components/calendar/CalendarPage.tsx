
import React from 'react';
import Layout from '@/components/layout/Layout';
import Calendar from '@/components/calendar/Calendar';

const CalendarPage = () => {
  return (
    <Layout>
      <div className="h-full">
        <Calendar />
      </div>
    </Layout>
  );
};

export default CalendarPage;
