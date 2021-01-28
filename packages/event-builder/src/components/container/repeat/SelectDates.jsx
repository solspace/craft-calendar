import DatePicker from '@cal/event-builder/components/presentational/DatePicker';
import PropTypes from 'prop-types';
import React from 'react';
import Block from '@cal/event-builder/components/presentational/Block';
import { connect } from 'react-redux';
import { actions as selectDatesActions } from '@cal/event-builder/reducers/selectDates';
import { getUnixTimeUTC } from '@cal/event-builder/utilities/date';

@connect(
  (state) => ({
    startDate: state.dates.start,
    selectDates: state.selectDates,
  }),
  (dispatch) => ({
    add: (date) => dispatch(selectDatesActions.add(getUnixTimeUTC(date))),
  })
)
class SelectDates extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    width: PropTypes.number,
    selectDates: PropTypes.array,
    startDate: PropTypes.number,
    add: PropTypes.func,
  };

  render() {
    const { show, width, selectDates, startDate, add } = this.props;

    return (
      <Block show={show} label="On" width={width}>
        <DatePicker excludeDates={selectDates} minDateTimestamp={startDate} onChangeHandler={add} />
      </Block>
    );
  }
}

export default SelectDates;
