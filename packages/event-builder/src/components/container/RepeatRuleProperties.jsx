import ByDayValues from '@cal/event-builder/components/container/repeat/ByDayValues';
import SelectDates from '@cal/event-builder/components/container/repeat/SelectDates';
import Block from '@cal/event-builder/components/presentational/Block';
import DatePicker from '@cal/event-builder/components/presentational/DatePicker';
import DatesList from '@cal/event-builder/components/presentational/DatesList';
import Input from '@cal/event-builder/components/presentational/Input';
import Lightswitch from '@cal/event-builder/components/presentational/Lightswitch';
import Row, { rowSuffixes } from '@cal/event-builder/components/presentational/Row';
import Select from '@cal/event-builder/components/presentational/Select';
import ValueBoxes from '@cal/event-builder/components/presentational/ValueBoxes';
import { size } from '@cal/event-builder/constants/inputs';
import {
  endRepeatTypes,
  frequencies,
  monthOptions,
  monthRepeatOptions,
  monthDayOptions,
  yearRepeatOptions,
  byDayIntervalEnum,
} from '@cal/event-builder/constants/rules';
import { compareDates, getUnixTimeUTC, resetTimestampToDayEnd } from '@cal/event-builder/utilities/date';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { actions as intervalActions } from '@cal/event-builder/reducers/interval';
import { actions as endRepeatActions } from '@cal/event-builder/reducers/endRepeat';
import { actions as exceptionActions } from '@cal/event-builder/reducers/exceptions';
import { actions as freqActions } from '@cal/event-builder/reducers/freq';
import { actions as byDayIntervalActions } from '@cal/event-builder/reducers/byDayInterval';
import { actions as repeatsActions } from '@cal/event-builder/reducers/repeats';
import { actions as selectDatesActions } from '@cal/event-builder/reducers/selectDates';
import { actions as byMonthActions } from '@cal/event-builder/reducers/byMonth';
import { actions as byMonthDayActions } from '@cal/event-builder/reducers/byMonthDay';
import { actions as errorMessageActions } from '@cal/event-builder/reducers/errorMessage';
import '@cal/event-builder/styles/time-input-animation.scss';
import translate from '@cal/event-builder/utilities/translations';
import { isPro, isRepeatRulesEnabled } from '@cal/event-builder/app';

@connect(
  (state) => ({
    interval: state.interval,
    dates: state.dates,
    repeats: state.repeats,
    freq: state.freq,
    endRepeat: state.endRepeat,
    selectDates: state.selectDates,
    exceptions: state.exceptions,
    byDayInterval: state.byDayInterval,
    byMonth: state.byMonth,
    byMonthDay: state.byMonthDay,
    errorMessage: state.errorMessage,
  }),
  (dispatch) => ({
    toggleRepeats: (isRepeating) => {
      dispatch(errorMessageActions.set(''));
      dispatch(repeatsActions.toggle(isRepeating));
    },
    changeInterval: (event) => {
      dispatch(errorMessageActions.set(''));
      dispatch(intervalActions.change(event.target.value));
    },
    changeFreq: (event) => {
      dispatch(errorMessageActions.set(''));
      dispatch(freqActions.change(event.target.value));
    },
    changeEndRepeatType: (event) => {
      dispatch(errorMessageActions.set(''));
      dispatch(endRepeatActions.changeType(event.target.value));
    },
    changeEndRepeatDate: (date) => {
      dispatch(errorMessageActions.set(''));
      dispatch(endRepeatActions.changeDate(getUnixTimeUTC(date)));
    },
    changeEndRepeatCount: (value) => {
      dispatch(errorMessageActions.set(''));
      dispatch(endRepeatActions.changeCount(value));
    },
    removeSelectDate: (index) => {
      dispatch(errorMessageActions.set(''));
      dispatch(selectDatesActions.remove(index));
    },
    addException: (date) => {
      dispatch(errorMessageActions.set(''));
      dispatch(exceptionActions.add(getUnixTimeUTC(date)));
    },
    removeException: (index) => {
      dispatch(errorMessageActions.set(''));
      dispatch(exceptionActions.remove(index));
    },
    changeByDayInterval: (event) => {
      dispatch(errorMessageActions.set(''));
      dispatch(byDayIntervalActions.change(event.target.value));
    },
    changeByMonth: (event) => {
      dispatch(errorMessageActions.set(''));
      dispatch(byMonthActions.change(parseInt(event.target.dataset.value)));
    },
    changeByMonthDay: (event) => {
      dispatch(errorMessageActions.set(''));
      dispatch(byMonthDayActions.change(parseInt(event.target.dataset.value)));
    },
    setErrorMessage: (errorMessage) => {
      dispatch(errorMessageActions.set(errorMessage))
    },
  })
)
class RepeatRuleProperties extends React.Component {
  static propTypes = {
    interval: PropTypes.number,
    dates: PropTypes.object,
    repeats: PropTypes.bool,
    freq: PropTypes.string,
    endRepeat: PropTypes.object,
    selectDates: PropTypes.array,
    exceptions: PropTypes.array,
    byDayInterval: PropTypes.number,
    byMonth: PropTypes.array,
    byMonthDay: PropTypes.array,
    toggleRepeats: PropTypes.func,
    changeInterval: PropTypes.func,
    changeFreq: PropTypes.func,
    changeEndRepeatType: PropTypes.func,
    changeEndRepeatDate: PropTypes.func,
    changeEndRepeatCount: PropTypes.func,
    removeSelectDate: PropTypes.func,
    addException: PropTypes.func,
    removeException: PropTypes.func,
    changeByDayInterval: PropTypes.func,
    changeByMonth: PropTypes.func,
    changeByMonthDay: PropTypes.func,
    errorMessage: PropTypes.string,
    setErrorMessage: PropTypes.func,
  };

  validateException = (date) => {
    const { endRepeat, addException, setErrorMessage } = this.props;

    // We only want to validate the Exception date against the End Repeat date if the End Repeat type is Until
    if (endRepeat.type == 'until' && compareDates({ dateOne: date, dateTwo: endRepeat.date }) === 0) {
      setErrorMessage(translate('Exception date cannot be the same as the End Repeat date'));

      return false;
    }

    // Clear any previous errors and add new Exception date
    setErrorMessage('');

    return addException(date);
  };

  validateEndRepeatDate = (date) => {
    const { exceptions, removeException, changeEndRepeatDate } = this.props;

    // If the user selects an End Repeat date that already exists as an Exception date, we need to remove the Exception date
    for (let i = 0; i < exceptions.length; i++) {
      const exceptionDate = resetTimestampToDayEnd(exceptions[i]);

      if (compareDates({ dateOne: date, dateTwo: exceptionDate }) === 0) {
        removeException(exceptions[i]);
      }
    }

    return changeEndRepeatDate(date);
  };

  render() {
    if (!isPro || !isRepeatRulesEnabled) {
      return null;
    }

    const { dates, repeats, toggleRepeats } = this.props;
    const { interval, changeInterval } = this.props;
    const { freq, changeFreq } = this.props;
    const { endRepeat, changeEndRepeatType, changeEndRepeatCount } = this.props;
    const { selectDates, removeSelectDate } = this.props;
    const { exceptions, removeException } = this.props;
    const { byDayInterval, changeByDayInterval } = this.props;
    const { byMonth, changeByMonth } = this.props;
    const { byMonthDay, changeByMonthDay } = this.props;

    const byDayIntervalEach = byDayInterval === byDayIntervalEnum.each;

    const showWeekly = repeats && freq === frequencies.weekly;
    const showMonthly = repeats && freq === frequencies.monthly;
    const showYearly = repeats && freq === frequencies.yearly;
    const showByDay = showWeekly || (showMonthly && !byDayIntervalEach) || (showYearly && !byDayIntervalEach);
    const showSelectDates = repeats && freq === frequencies.selectDates;
    const validateEndRepeatDate = this.validateEndRepeatDate;
    const validateException = this.validateException;
    const { errorMessage } = this.props;

    return (
      <>
        <Row>
          <Block label="Repeats" width={60}>
            <Lightswitch on={repeats} toggleHandler={toggleRepeats} />
          </Block>

          <Block show={repeats} label="Every">
            <CSSTransition in={!showSelectDates} timeout={200} classNames="event-interval-input" unmountOnExit>
              <Input value={interval} type="number" inputSize={size.smallMedium} onChangeHandler={changeInterval} />
            </CSSTransition>

            <Select
              value={freq || frequencies.daily}
              inputSize={size.mediumNormal}
              options={[
                { value: frequencies.daily, label: translate('Day(s)') },
                { value: frequencies.weekly, label: translate('Week(s)') },
                { value: frequencies.monthly, label: translate('Month(s)') },
                { value: frequencies.yearly, label: translate('Year(s)') },
                {
                  value: frequencies.selectDates,
                  label: translate('Select dates'),
                },
              ]}
              onChangeHandler={changeFreq}
            />

            <CSSTransition in={showMonthly} timeout={200} classNames={'options-input'} unmountOnExit>
              <Select
                value={byDayInterval}
                inputSize={size.normalLarge}
                options={monthRepeatOptions}
                onChangeHandler={changeByDayInterval}
              />
            </CSSTransition>

            <CSSTransition in={showYearly} timeout={200} classNames={'options-input'} unmountOnExit>
              <Select
                value={byDayInterval}
                inputSize={size.normalLarge}
                options={yearRepeatOptions}
                onChangeHandler={changeByDayInterval}
              />
            </CSSTransition>
          </Block>

          <ByDayValues label={freq === frequencies.weekly ? 'On' : ''} show={showByDay} />
          <SelectDates show={repeats && freq === frequencies.selectDates} />
        </Row>

        <Row show={showMonthly && byDayIntervalEach} suffix={rowSuffixes.labellessTwoRow}>
          <Block label={false}>
            <ValueBoxes options={monthDayOptions} values={byMonthDay} onChangeHandler={changeByMonthDay} />
          </Block>
        </Row>

        <Row show={showYearly && !byDayIntervalEach}>
          <Block label="In the Month of">
            <ValueBoxes options={monthOptions} values={byMonth} onChangeHandler={changeByMonth} />
          </Block>
        </Row>

        <Row show={repeats && !showSelectDates}>
          <Block label="End Repeat">
            <Select
              value={endRepeat.type}
              inputSize={size.mediumNormal}
              options={[
                { value: endRepeatTypes.never, label: translate('Never') },
                { value: endRepeatTypes.until, label: translate('On Date') },
                { value: endRepeatTypes.after, label: translate('After') },
              ]}
              onChangeHandler={changeEndRepeatType}
            />

            <CSSTransition
              in={endRepeat.type === endRepeatTypes.until}
              timeout={200}
              classNames={'date-input'}
              unmountOnExit
            >
              <DatePicker
                dateTimestamp={endRepeat.date}
                minDateTimestamp={dates.start}
                onChangeHandler={validateEndRepeatDate}
              />
            </CSSTransition>

            <CSSTransition
              in={endRepeat.type === endRepeatTypes.after}
              timeout={200}
              classNames={'count-input'}
              unmountOnExit
            >
              <div style={{ display: 'flex' }}>
                <Input
                  type="number"
                  inputSize={size.smallMedium}
                  value={`${endRepeat.count}`}
                  onChangeHandler={(event) => changeEndRepeatCount(event.target.value)}
                />
                <div style={{ marginTop: 5, marginLeft: 10 }}>{translate('Times')}</div>
              </div>
            </CSSTransition>
          </Block>

          <Block label="Except On">
            <DatePicker excludeDates={exceptions} minDateTimestamp={dates.start} onChangeHandler={validateException} />
          </Block>
        </Row>

        <Row show={(errorMessage !== '')}>
          <div className={'errorMessage'}>{translate(errorMessage)}</div>
        </Row>

        <Row show={repeats && freq === frequencies.selectDates}>
          <DatesList dates={selectDates} onRemoveHandler={removeSelectDate} />
        </Row>

        <Row show={repeats && freq !== frequencies.selectDates}>
          <DatesList dates={exceptions} onRemoveHandler={removeException} />
        </Row>
      </>
    );
  }
}

export default RepeatRuleProperties;
