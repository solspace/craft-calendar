import Block from '@cal/event-builder/components/presentational/Block';
import DatePicker from '@cal/event-builder/components/presentational/DatePicker';
import Lightswitch from '@cal/event-builder/components/presentational/Lightswitch';
import Row from '@cal/event-builder/components/presentational/Row';
import { addDays } from 'date-fns';
import { fromUnixTimeUTC, getUnixTimeUTC } from '@cal/event-builder/utilities/date';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { change as dateChange, changeTime as timeChange, targets } from '@cal/event-builder/actions/dates';
import { toggle as allDayToggle } from '@cal/event-builder/actions/allDay';
import { toggle as multiDayToggle } from '@cal/event-builder/actions/multiDay';
import '@cal/event-builder/styles/time-input-animation.scss';

@connect(
  (state) => ({
    allDay: state.allDay,
    multiDay: state.multiDay,
    startDate: state.dates.start,
    endDate: state.dates.end,
  }),
  (dispatch) => ({
    toggleAllDay: (isAllDay) => dispatch(allDayToggle(isAllDay)),
    toggleMultiDay: (isMultiDay) => dispatch(multiDayToggle(isMultiDay)),
    changeDate: (target, date, allDay, multiDay) =>
      dispatch(dateChange({ target, date: getUnixTimeUTC(date), allDay, multiDay })),
    changeTime: (target, date, allDay, multiDay) =>
      dispatch(timeChange({ target, date: getUnixTimeUTC(date), allDay, multiDay })),
  })
)
class DateProperties extends React.Component {
  static propTypes = {
    startDate: PropTypes.number,
    endDate: PropTypes.number,
    allDay: PropTypes.bool,
    multiDay: PropTypes.bool,
    changeDate: PropTypes.func,
    changeTime: PropTypes.func,
    toggleAllDay: PropTypes.func,
    toggleMultiDay: PropTypes.func,
  };

  render() {
    const { startDate, changeDate, changeTime, endDate } = this.props;
    const { allDay, toggleAllDay } = this.props;
    const { multiDay, toggleMultiDay } = this.props;

    const endDateMinDate = getUnixTimeUTC(addDays(fromUnixTimeUTC(startDate), 1));

    return (
      <Row>
        <Block label={'Date'} required>
          <DatePicker
            dateTimestamp={startDate}
            onChangeHandler={(date) => changeDate(targets.start, date, allDay, multiDay)}
          />
          <CSSTransition in={!allDay} timeout={200} classNames="time-input" unmountOnExit>
            <DatePicker
              dateTimestamp={startDate}
              onChangeHandler={(date) => changeTime(targets.start, date, allDay, multiDay)}
              selectTime
            />
          </CSSTransition>

          <CSSTransition in={!(allDay && !multiDay)} timeout={200} classNames="dash-input" unmountOnExit>
            <div>
              <div style={{ marginTop: 5, width: 14, textAlign: 'center' }}>&ndash;</div>
            </div>
          </CSSTransition>

          <CSSTransition in={multiDay} timeout={200} classNames="date-input" unmountOnExit>
            <DatePicker
              dateTimestamp={endDate}
              onChangeHandler={(date) => changeDate(targets.end, date, allDay, multiDay)}
              minDateTimestamp={endDateMinDate}
            />
          </CSSTransition>

          <CSSTransition in={!allDay} timeout={200} classNames="time-input" unmountOnExit>
            <DatePicker
              dateTimestamp={endDate}
              onChangeHandler={(date) => changeTime(targets.end, date, allDay, multiDay)}
              selectTime
            />
          </CSSTransition>
        </Block>

        <Block label={'All Day'} width={48}>
          <Lightswitch name={'allDay'} on={allDay} toggleHandler={toggleAllDay} />
        </Block>

        <Block label={'Multi-Day'} width={64}>
          <Lightswitch on={multiDay} toggleHandler={toggleMultiDay} />
        </Block>
      </Row>
    );
  }
}

export default DateProperties;
