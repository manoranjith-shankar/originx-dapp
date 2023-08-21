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
          { value: 'poverty alleviation', label: 'poverty alleviation' },
          { value: 'agricultural development', label: 'agricultural development' },
          { value: 'Child rights', label: 'Child rights' },
          { value: 'Clean Water & Sanitization', label: 'Clean Water & Sanitization' },
          { value: 'Sustainable agriculture', label: 'Sustainable agriculture' },
          { value: 'Reduce Inequalities', label: 'Reduce Inequalities' },
          { value: 'Climate Action', label: 'Climate Action' },
          { value: 'entrepreneurship', label: 'entrepreneurship' },
          { value: 'education', label: 'education' },
          { value: 'healthcare', label: 'healthcare' },
          { value: 'child protection', label: 'child protection' },
          { value: 'hunger relief', label: 'hunger relief' },
          { value: 'food waste reduction', label: 'food waste reduction' },
          { value: 'rural livelihoods', label: 'rural livelihoods' },
          { value: 'food security', label: 'food security' },
        ]}
        placeholder="Select any 5 causes"
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        max='3'
        nothingFound="Nothing found"
        classNames={customStyles}
      />
    </MantineProvider>
  );
}