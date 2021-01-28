import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const size = 20;
const bgOn = 'linear-gradient(to right, #27AB83, #27AB83)';
const bgOff = 'linear-gradient(to right, #9aa5b1, #9aa5b1)';

const Handle = styled.div`
  position: relative;
  left: 0;

  width: ${size}px;
  height: ${size}px;

  border: none;
  border-radius: 10px;
  background: white;

  transition: all 0.2s ease-in-out;
`;

const Container = styled.div`
  margin: 5px 0 0;
  padding: 1px !important;

  background: ${bgOff};

  border: none;
  border-radius: 11px;
  width: 34px;

  transition: all 0.2s ease-in-out;
  user-select: none;

  :hover {
    cursor: pointer;
  }

  &.on {
    background: ${bgOn};

    > div {
      left: calc(50% - 3px);
    }
  }
`;

const Lightswitch = ({ on = false, toggleHandler }) => (
  <Container onClick={() => toggleHandler(!on)} aria-checked={!!on} role="checkbox" className={on ? 'on' : ''}>
    <Handle />
  </Container>
);

Lightswitch.propTypes = {
  on: PropTypes.bool,
  toggleHandler: PropTypes.func,
};

export default Lightswitch;
