import { createAction } from '@reduxjs/toolkit';

export const targets = {
  start: 'start',
  end: 'end',
};

export const change = createAction('dates/change');
export const changeTime = createAction('dates/changeTime');
