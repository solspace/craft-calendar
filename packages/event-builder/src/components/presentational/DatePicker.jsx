import { StyledInput } from '@cal/event-builder/components/presentational/Input';
import { isSameDay } from 'date-fns';
import { fromUnixTimeUTC } from '@cal/event-builder/utilities/date';
import * as locales from 'date-fns/locale';
import { dateFnsLocale, timeInterval, firstDayOfWeek, timeFormat } from '@cal/event-builder/utilities/config';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@cal/event-builder/styles/datepicker/styles.scss';
import { resetToDayEnd } from '@cal/event-builder/utilities/date';
import translate from '@cal/event-builder/utilities/translations';

class DatePicker extends React.Component {
  static propTypes = {
    dateTimestamp: PropTypes.number,
    minDateTimestamp: PropTypes.number,
    selectTime: PropTypes.bool,
    excludeDates: PropTypes.array,
    locale: PropTypes.string,
    dateFormat: PropTypes.string,
    timeFormat: PropTypes.string,
    onChangeHandler: PropTypes.func.isRequired,
  };

  renderDatePicker = () => {
    const { dateTimestamp, onChangeHandler } = this.props;
    const { minDateTimestamp, excludeDates = [] } = this.props;

    const selectedDate = dateTimestamp ? fromUnixTimeUTC(dateTimestamp) : null;
    const minDate = minDateTimestamp ? fromUnixTimeUTC(minDateTimestamp) : null;

    const excludeDatesList = excludeDates.map((date) => fromUnixTimeUTC(date));

    return (
      <ReactDatePicker
        locale={dateFnsLocale}
        selected={selectedDate}
        onChange={onChangeHandler}
        customInput={<StyledInput />}
        className="datepicker-date"
        excludeDates={excludeDatesList}
        minDate={minDate}
        dateFormat="P"
        todayButton={translate('Today')}
        showMonthDropdown
        showYearDropdown
      />
    );
  };

  renderTimePicker = () => {
    const { dateTimestamp, onChangeHandler } = this.props;
    const { minDateTimestamp } = this.props;

    const selectedDate = fromUnixTimeUTC(dateTimestamp);

    let extraProps = null;
    if (minDateTimestamp) {
      const minDate = fromUnixTimeUTC(minDateTimestamp);
      const isSameDayDates = isSameDay(selectedDate, minDate);

      const minTime = isSameDayDates ? minDate : null;
      const maxTime = isSameDayDates ? resetToDayEnd(fromUnixTimeUTC(minDateTimestamp)) : null;

      extraProps = {
        minDate,
        minTime,
        maxTime,
      };
    }

    return (
      <ReactDatePicker
        locale={dateFnsLocale}
        selected={selectedDate}
        onChange={onChangeHandler}
        customInput={<StyledInput />}
        className="datepicker-time"
        dateFormat={timeFormat}
        timeIntervals={timeInterval}
        timeFormat={timeFormat}
        showTimeSelect
        showTimeSelectOnly
        {...extraProps}
      />
    );
  };

  render() {
    locales[dateFnsLocale].options.weekStartsOn = firstDayOfWeek;
    registerLocale(dateFnsLocale, locales[dateFnsLocale]);

    return this.props.selectTime ? this.renderTimePicker() : this.renderDatePicker();
  }
}

export default DatePicker;
