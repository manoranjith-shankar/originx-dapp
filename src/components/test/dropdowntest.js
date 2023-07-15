import React, { useState } from 'react';
import { Select } from '@mantine/core';
const data = [
  {
    label: 'UNICEF Australia',
    value: '0x8362CC2c192292238b5A6626f536f51eEacC74EC',
  },
  {
    label: 'Self Help Africa',
    value: '0xb1bE5E4C68B16c5b434B24D55c252E5852f7Aa29',
  },
  {
    label: 'Farm Africa',
    value: '1',
  },
  {
    label: 'name1',
    value: '2',
  },
  {
    label: 'name2',
    value: '3',
  },
  {
    label: 'name3',
    value: '4',
  },
  {
    label: 'name4',
    value: '5',
  },
  {
    label: 'name5',
    value: '6',
  },
];

const DropTest = ({ onChange }) => {

  const [selectedItem, setSelectedItem] = useState('');

  const handleSelect = (event) => {
    const value = event.target.value;
    setSelectedItem(value);
    onChange(value);
  };

  return (
    <Select
      maw={320}
      mx="auto"
      placeholder="Pick one"
      data={data}
      required='required'
      maxDropdownHeight={275}
      transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
      withinPortal
    />
  );
}

export default DropTest;