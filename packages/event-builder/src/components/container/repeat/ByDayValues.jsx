import Block from '@cal/event-builder/components/presentational/Block';
import ValueBoxes from '@cal/event-builder/components/presentational/ValueBoxes';
import { weekDays } from '@cal/event-builder/constants/rules';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actions as byDayActions } from '@cal/event-builder/reducers/byDay';

@connect(
  (state) => ({
    byDay: state.byDay,
  }),
  (dispatch) => ({
    changeByDay: (value) => dispatch(byDayActions.change(value)),
  })
)
class ByDayValues extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    show: PropTypes.bool.isRequired,
    width: PropTypes.number,
    byDay: PropTypes.arrayOf(PropTypes.string),
    changeByDay: PropTypes.func,
  };

  render() {
    const { label, show, width, byDay, changeByDay } = this.props;

    return (
      <Block show={show} label={label} width={width}>
        <ValueBoxes
          values={byDay}
          options={weekDays}
          onChangeHandler={(event) => changeByDay(event.target.dataset.value)}
        />
      </Block>
    );
  }
}

export default ByDayValues;
