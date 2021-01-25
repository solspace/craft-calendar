import { format } from 'date-fns';
import * as locales from 'date-fns/locale';
import { dateFnsLocale } from '@cal/event-builder/utilities/config';
import PropTypes from 'prop-types';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import '@cal/event-builder/styles/date-list-animation.scss';
import { fromUnixTimeUTC } from '@cal/event-builder/utilities/date';

const Container = styled.ul`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  margin: 0 -5px;
`;

const Item = styled.li`
  padding: 0 5px 10px;

  > div {
    position: relative;

    min-width: 140px;
    padding: 5px 22px 5px 10px;

    background: #f4f7fc;
    border: 1px solid #d9dee6;
    border-radius: 3px;

    user-select: none;

    > a.icon.delete {
      position: absolute;
      right: 5px;
      top: 4px;
    }
  }
`;

const DatesList = ({ dates = [], onRemoveHandler }) => (
  <TransitionGroup className="date-list" component={Container}>
    {dates.map((date) => (
      <CSSTransition key={date} timeout={500} classNames="date-list-item">
        <Item key={date}>
          <div>
            <a className="icon delete" onClick={() => onRemoveHandler(date)} />

            <span>{format(fromUnixTimeUTC(date), 'eee, MMM d, yyyy', { locale: locales[dateFnsLocale] })}</span>
          </div>
        </Item>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

DatesList.propTypes = {
  dates: PropTypes.array.isRequired,
  locale: PropTypes.string,
  onRemoveHandler: PropTypes.func.isRequired,
};

export default DatesList;
