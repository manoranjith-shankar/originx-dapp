import { MultiSelect, createStyles, MantineProvider } from '@mantine/core';
import { useState } from 'react';


const darkTheme = createStyles((theme, customTheme) => ({
  wrapper: {
    backgroundColor: theme.backgroundColor('#09080d'),
    color: theme.colorScheme.darkText,
  },
  dropdown: {
    backgroundColor: theme.colorScheme.dark,
    borderColor: theme.colorScheme.darkAccent,
  },
  item: {
    borderBottom: `1px solid ${theme.colorScheme.darkAccent}`,
  },
  values: {
    backgroundColor: theme.colorScheme.dark,
  },
  value: {
    backgroundColor: theme.colorScheme.darkAccent,
  },
  searchInput: {
    backgroundColor: theme.colorScheme.darkAccent,
    color: theme.colorScheme.darkText,
  },
  nothingFound: {
    color: theme.colorScheme.darkText,
  },
}));

// Rest of your component code
export default function MultiSelectComp() {
  const [searchValue, onSearchChange] = useState('');

  return (
      <MantineProvider theme={{ fontFamily: 'Poppins', colorScheme: 'dark', style: {darkTheme} }}>
        <MultiSelect
          data={['No Poverty', 'Zero Hunger', 'Quality Education', 'Clean Water & Sanitization', 'Reduce Inequalities', 'Climate Action', 'Life Below Water']}
          placeholder="Select UN Sdgs"
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          sx={{
            borderRadius: '100px'
          }}
        />
      </MantineProvider>
  );
}