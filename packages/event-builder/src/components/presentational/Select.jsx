import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { size } from '@cal/event-builder/constants/inputs';

const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;

  :after {
    right: 9px;
    font-family: 'Craft';
    speak: none;
    font-feature-settings: 'liga', 'dlig';
    text-rendering: optimizeLegibility;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: inline-block;
    text-align: center;
    font-style: normal;
    vertical-align: middle;
    word-wrap: normal !important;
    user-select: none;
    opacity: 0.8;
    position: absolute;
    z-index: 1;
    top: calc(50% - 5px);
    font-size: 10px;
    content: 'downangle';
    pointer-events: none;
  }
`;

const StyledSelect = styled.select`
  display: block;
  position: relative;
  border: none;
  font-size: 14px;
  line-height: 20px;
  color: #3f4d5a;
  background-color: rgba(96, 125, 159, 0.25);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  white-space: pre;
  padding: 7px 22px 7px 10px;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    background-color: #bac6d6;
  }
`;

const Select = ({ name, value = '', options = [], inputSize = size.normal, onChangeHandler }) => (
  <div>
    <SelectWrapper>
      <StyledSelect
        type="text"
        name={name}
        value={value}
        style={{
          width: inputSize || size.normal,
        }}
        onChange={onChangeHandler}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </SelectWrapper>
  </div>
);

Select.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  inputSize: PropTypes.number,
  onChangeHandler: PropTypes.func.isRequired,
};

export default Select;
