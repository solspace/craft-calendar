import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { size } from '@cal/event-builder/constants/inputs';

export const StyledInput = styled.input`
  position: relative;
  width: 100%;

  padding: 6px 13px;
  margin: 0;

  background: #fbfcfe;
  border: 1px solid rgba(96, 125, 159, 0.25);
  border-radius: 3px;
  box-shadow: inset 0 1px 4px -1px rgba(96, 125, 159, 0.25);
  transition: border linear 50ms;

  font-size: 14px;
  line-height: 20px;
  color: #3f4d5a;
  min-height: 3px;
  box-sizing: border-box;
  appearance: none;

  font-family: system-ui, BlinkMacSystemFont, -apple-system, 'Segoe UI', 'Roboto', sans-serif;

  :focus {
    border-color: #0d99f2;
    outline: none;
  }
`;

const Input = ({ name, value = '', type = 'text', inputSize = size.normal, onChangeHandler }) => (
  <div>
    <StyledInput
      type={type}
      name={name}
      value={value}
      style={{
        width: inputSize || size.normal,
      }}
      onChange={onChangeHandler}
    />
  </div>
);

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputSize: PropTypes.number,
  onChangeHandler: PropTypes.func.isRequired,
};

export default Input;
