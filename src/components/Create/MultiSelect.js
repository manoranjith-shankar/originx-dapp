import { MultiSelect, MantineProvider } from '@mantine/core';
import { useState } from 'react';

export default function MultiSelectComp({ onSelectedValuesChange }) {
  const [searchValue, onSearchChange] = useState('');
  const [value, setValue] = useState([]);

  // Custom styles object
  const customStyles = {
    dropdown: 'custom-dropdown',
    item: 'custom-item',
    input: 'custom-input',
    value: 'custom-value',
    values: 'custom-values',
    searchInput: 'custom-searchInput',
    itemsWrapper: 'custom-items-wrapper',
  };

  const handleValueChange = (newValue1) => {
    if (newValue1.length <= 5) {
      setValue(newValue1);
      onSelectedValuesChange(newValue1);
    }
  };

  return (
    <MantineProvider theme={{ fontFamily: 'Poppins', colorScheme: 'dark' }}>
      <MultiSelect
        size='md'
        value={value}
        onChange={handleValueChange}
        data={[
          { value: 'No Poverty', label: 'No Poverty' },
          { value: 'Zero Hunger', label: 'Zero Hunger' },
          { value: 'Quality Education', label: 'Quality Education' },
          { value: 'Clean Water & Sanitization', label: 'Clean Water & Sanitization' },
          { value: 'Reduce Inequalities', label: 'Reduce Inequalities' },
          { value: 'Climate Action', label: 'Climate Action' },
          { value: 'Life Below Water', label: 'Life Below Water' },
        ]}
        placeholder="Select UN Sdgs"
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        max='3'
        nothingFound="Nothing found"
        classNames={customStyles}
      />
    </MantineProvider>
  );
}