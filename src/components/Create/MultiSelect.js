import { MultiSelect, MantineProvider } from '@mantine/core';
import { useState } from 'react';

export default function MultiSelectComp() {
  const [searchValue, onSearchChange] = useState('');
  const [ value, setValue ] = useState([]);

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

  return (
    <MantineProvider theme={{ fontFamily: 'Poppins', colorScheme: 'dark' }}>
      <MultiSelect
      size='md'
      value = { value }
      onChange={setValue}
        data={[
          {value: '1', label: 'No Poverty'},
          {value: '2', label: 'Zero Hunger'},
          {value: '3', label: 'Quality Education'},
          {value: '4', label: 'Clean Water & Sanitization'},
          {value: '5', label: 'Reduce Inequalities'},
          {value: '6', label: 'Climate Action'},
          {value: '7', label: 'Life Below Water'},
        ]}
        placeholder="Select UN Sdgs"
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        max='3'
        nothingFound="Nothing found"
        classNames={customStyles} // Pass the custom styles object to the classNames prop
      />
    </MantineProvider>
  );
}