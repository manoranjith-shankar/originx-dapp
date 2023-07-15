import { useState } from 'react';
import { DatePickerInput } from '@mantine/dates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

function DatePicker() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <DatePickerInput
      icon={<FontAwesomeIcon icon={faCalendar} />}
      label="Pick date"
      placeholder="Pick date"
      value={value}
      onChange={setValue}
      mx="auto"
      maw={400}
    />
  );
}

export default DatePicker;