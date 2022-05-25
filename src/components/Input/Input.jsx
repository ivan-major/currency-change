import React from 'react';
import './Input.css';

export const Input = ({ name, value, onChange }) => (
  <>
    <input
      className="input"
      name={name}
      type="number"
      value={value}
      onChange={(event => (
        onChange(event)
      ))}
    />
  </>
);
