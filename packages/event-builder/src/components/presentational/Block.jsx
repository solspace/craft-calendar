import PropTypes from 'prop-types';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import '@cal/event-builder/styles/block-animation.scss';
import countChildren from '@cal/event-builder/utilities/count-children';
import translate from '@cal/event-builder/utilities/translations';

const Children = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 -2.5px;

  > * {
    padding: 0 2.5px !important;
  }
`;

const Label = styled.label`
  display: block;
  min-height: 20px;
  margin-bottom: 5px;

  color: #576575;
  white-space: nowrap;
  font-weight: bold;
`;

const Block = ({ show = true, width, label, required, children }) => (
  <CSSTransition in={show} timeout={{ enter: 200, exit: 0 }} classNames="block" unmountOnExit>
    <div style={{ width: width || 'auto' }}>
      {label !== false && <Label className={required ? 'required' : ''}>{translate(label)}</Label>}
      <Children style={{ gridTemplateColumns: `repeat(${countChildren(children)}, auto)` }}>{children}</Children>
    </div>
  </CSSTransition>
);

Block.propTypes = {
  required: PropTypes.bool,
  show: PropTypes.bool,
  width: PropTypes.number,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default Block;
