import React, { useState } from 'react';

const DropdownList = ({ onChange }) => {
  const [selectedItem, setSelectedItem] = useState('');

  const handleSelect = (event) => {
    const value = event.target.value;
    setSelectedItem(value);
    onChange(value);
  };

  return (
    <div>
      <select
        value={selectedItem}
        onChange={handleSelect}
        style={{
          padding: '8px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      >
        <option value="0x8362CC2c192292238b5A6626f536f51eEacC74EC">UNICEF South Africa</option>
        <option value="0xE46Cb9CA18520D3F0394F570C35259c188B33B98">Self Help Africa</option>
        <option value="0xEE8062a19bF3B9a66A222F9bc15aC8b97f56A2FA">Farm Africa</option>
        <option value="0x632C794340F9b8FF64a0C954B841e3E9fffC5d86">FoodForward SA</option>
        <option value="0xe7EA3f54db1CCE6f2d0D678283d3b1C399aba948">GiveDirectly: Kenya and Uganda</option>
      </select>
    </div>
  );
};

export default DropdownList;