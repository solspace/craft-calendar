import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import '@cal/event-builder/styles/row-animation.scss';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 -10px 24px;

  > * {
    padding: 0 10px;
  }

  .errorMessage {
    color: red;
  }
`;

export const rowSuffixes = {
  normal: 'normal',
  labellessTwoRow: 'labelless-two-row',
};

const Row = ({ show = true, suffix = rowSuffixes.normal, children }) => (
  <CSSTransition in={show} timeout={200} classNames={`calendar-item-row-${suffix}`} unmountOnExit>
    <Container>{children}</Container>
  </CSSTransition>
);

Row.propTypes = {
  show: PropTypes.bool,
  height: PropTypes.number,
};

export default Row;
