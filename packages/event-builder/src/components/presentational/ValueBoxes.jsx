import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const UnorderedList = styled.ul`
  display: grid;

  grid-column-gap: 5px;
  grid-row-gap: 5px;
`;

const ListItem = styled.li`
  padding: 5px 7px;

  border: 1px solid #b2becd;
  border-radius: 3px;

  text-align: center;
  font-size: 14px;
  line-height: 20px;
  color: #29323d;
  min-height: 3px;
  box-sizing: border-box;
  appearance: none;

  font-family: system-ui, BlinkMacSystemFont, -apple-system, 'Segoe UI', 'Roboto', sans-serif;

  transition: all 200ms ease-out;
  cursor: pointer;
  user-select: none;

  &.selected {
    background: #545f6b;
    border-color: #545f6b;
    color: #ffffff;
  }
`;

const ValueBoxes = ({ name, values = [], options = [], onChangeHandler }) => (
  <UnorderedList style={{ gridTemplateColumns: `repeat(${options.length > 16 ? 16 : options.length}, 1fr)` }}>
    {options.map((option) => (
      <ListItem
        key={option.value}
        data-name={name}
        data-value={option.value}
        className={values.includes(option.value) ? 'selected' : ''}
        onClick={onChangeHandler}
      >
        {option.label}
      </ListItem>
    ))}
  </UnorderedList>
);

ValueBoxes.propTypes = {
  name: PropTypes.string,
  values: PropTypes.array.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  inputSize: PropTypes.number,
  onChangeHandler: PropTypes.func.isRequired,
};

export default ValueBoxes;
