import { Select, MantineProvider } from '@mantine/core';

const customStyles = {
    root: 'custom-select-root',
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
    <MantineProvider theme={{ fontFamily: 'Poppins', colorScheme: 'dark' }} >
    <Select
      size='md'
      maw={320}
      mx="auto"
      placeholder="Pick a Charity"
      data={[
        { value: '0xF4e2f322b955f2378F9852E38313e393A6a61359', label: 'Self Help Africa' },
        { value: '0x1Eb43EBde750C57AaCEE85777e7c063218B0e1B4', label: 'GiveDirectly: Kenya and Uganda' },
        { value: '0xc09AA2837EF2f70a33b4d49C59DCD4e779eF92Eb', label: 'FoodForward South Africa' },
        { value: '0x6a049dF1eD7F83B0668575748290b19c19540566', label: 'UNICEF' },
        { value: '0xEE8062a19bF3B9a66A222F9bc15aC8b97f56A2FA', label: 'Make-A-Wish Foundation' },
        { value: '0x632C794340F9b8FF64a0C954B841e3E9fffC5d86', label: 'United Nations Foundation' },
        { value: '0xe7EA3f54db1CCE6f2d0D678283d3b1C399aba948', label: 'WildAid' },
        { value: '0x8362CC2c192292238b5A6626f536f51eEacC74EC', label: 'Young Lives Foundation' },
        { value: '0xE46Cb9CA18520D3F0394F570C35259c188B33B98', label: 'Youth with a Mission' },
        { value: '0x3132f35475c4fB7223B8Bb4b90aB02293084aCc2', label: 'World Medical Relief' },
        { value: '0xfb47DB48229309C74019d686C6Cd1E77c4580373', label: 'Vancouver Foundation' },
        { value: '0xE003d76E8Acb044f4EED393c10F30744BdB72B8f', label: 'GlobalGiving' },
        { value: '0x2DE8BABd2dF548107e9c1506f8363E8378CFE025', label: 'Omar-Sultan Foundation' },
        { value: '0x039D083771c8d169fE23CdA9Dc0F3A2E6AafB9B9', label: 'Oaktree Foundation' },
        { value: '0x16F77c26123ec5ECB342413B54F032A26EdfFB49', label: 'FINCA International' },
        { value: '0x7fC27Da91A8f1ff790827c16Aa5b49c1F2598a5f', label: 'Feeding America' },
        { value: '0xf3d15Ac3ced3768CCd7b64100014fA2698A1A4F9', label: 'Feed the Children' },
        { value: '0xd0735E08B730325c427fed7c3611314120e4d2D6', label: 'Care India' },
      ]}
      transitionProps={{ transition: 'pop-top-left', duration: 80, timingFunction: 'ease' }}
      withinPortal
      onChange={(newValue) => onSelect(newValue)}
      classNames={customStyles}
    />
    </MantineProvider>
  );
}