import { Select } from '@mantine/core';

const customStyles = {
    dropdown: 'custom-dropdown',
    item: 'custom-item',
    input: 'custom-input-select',
    value: 'custom-value',
    values: 'custom-values',
    searchInput: 'custom-searchInput',
    itemsWrapper: 'custom-items-wrapper',
  };

export default function SelectComp({ onSelect }) {

  return (
    <Select
      maw={320}
      mx="auto"
      placeholder="Pick a Charity"
      data={[
        { value: 'react', label: 'UNICEF Australia' },
        { value: 'ng', label: 'Self Help Africa' },
        { value: 'svelte', label: 'GiveDirectly: Kenya and Uganda' },
        { value: 'vue', label: 'FoodForward South Africa' },
        { value: '1', label: 'UNICEF Australia' },
        { value: '2', label: 'Self Help Africa' },
        { value: '3', label: 'GiveDirectly: Kenya and Uganda' },
        { value: '4', label: 'FoodForward South Africa' },
        { value: '5', label: 'UNICEF Australia' },
        { value: '6', label: 'Self Help Africa' },
        { value: '7', label: 'GiveDirectly: Kenya and Uganda' },
        { value: '8', label: 'FoodForward South Africa' },
        { value: '9', label: 'UNICEF Australia' },
        { value: '0', label: 'Self Help Africa' },
        { value: '11', label: 'GiveDirectly: Kenya and Uganda' },
        { value: '12', label: 'FoodForward South Africa' },
        { value: '13', label: 'UNICEF Australia' },
        { value: '14', label: 'Self Help Africa' },
        { value: '15', label: 'GiveDirectly: Kenya and Uganda' },
        { value: '16', label: 'FoodForward South Africa' },
      ]}
      transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
      withinPortal
      onChange={(newValue) => onSelect(newValue)}
      classNames={customStyles}
    />
  );
}