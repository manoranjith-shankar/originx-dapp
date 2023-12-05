import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerComponent = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const date1 = new Date(date);
      const unixTime = Math.floor(date1.getTime() / 1000);
      onDateSelect(unixTime)
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div className="datepicker-container">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        minDate={tomorrow}
        dateFormat="dd/MM/yyyy"
        placeholderText="Raffle End date"
      />
    </div>
  );
};

export default DatePickerComponent;