import allDay from '@cal/event-builder/reducers/allDay';
import interval from '@cal/event-builder/reducers/interval';
import byDay from '@cal/event-builder/reducers/byDay';
import byMonth from '@cal/event-builder/reducers/byMonth';
import byMonthDay from '@cal/event-builder/reducers/byMonthDay';
import dates from '@cal/event-builder/reducers/dates';
import endRepeat from '@cal/event-builder/reducers/endRepeat';
import exceptions from '@cal/event-builder/reducers/exceptions';
import freq from '@cal/event-builder/reducers/freq';
import byDayInterval from '@cal/event-builder/reducers/byDayInterval';
import multiDay from '@cal/event-builder/reducers/multiDay';
import repeats from '@cal/event-builder/reducers/repeats';
import selectDates from '@cal/event-builder/reducers/selectDates';
import errorMessage from '@cal/event-builder/reducers/errorMessage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  preloadedState: existingEventData,
  reducer: combineReducers({
    dates,
    allDay,
    interval,
    multiDay,
    repeats,
    freq,
    byDayInterval,
    byDay,
    byMonthDay,
    byMonth,
    endRepeat,
    selectDates,
    exceptions,
    errorMessage,
  }),
});

store.subscribe(() => {
  const builderDataInputs = document.querySelectorAll('[data-event-builder-data]');
  builderDataInputs.forEach((input) => (input.value = JSON.stringify(store.getState())));
});

export default store;
