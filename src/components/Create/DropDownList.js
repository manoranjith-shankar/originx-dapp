import React, { useState } from 'react';

const DropdownList = ({ onChange }) => {
  const [selectedItem, setSelectedItem] = useState('');

  const handleSelect = (event) => {
    const value = event.target.value;
    setSelectedItem(value);
    onChange(value);
  };

  return (
    <div className="dropdown-area">
      <div className="dropdown-container">
        <select
          value={selectedItem}
          onChange={handleSelect}
          className="dropdown-select"
        >
          <option value="0x8362CC2c192292238b5A6626f536f51eEacC74EC">
            UNICEF Australia
          </option>
          <option value="0xb1bE5E4C68B16c5b434B24D55c252E5852f7Aa29">
            Self Help Africa
          </option>
          <option value="0xEE8062a19bF3B9a66A222F9bc15aC8b97f56A2FA">
            Farm Africa
          </option>
          <option value="0x632C794340F9b8FF64a0C954B841e3E9fffC5d86">
            FoodForward SA
          </option>
          <option value="0x750EF1D7a0b4Ab1c97B7A623D7917CcEb5ea779C">
            GiveDirectly: Kenya and Uganda
          </option>
        </select>
      </div>
    </div>
  );
};

export default DropdownList;