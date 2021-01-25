import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import DateProperties from '@cal/event-builder/components/container/DateProperties';
import RepeatRuleProperties from '@cal/event-builder/components/container/RepeatRuleProperties';

import { Provider } from 'react-redux';
import store from './store';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <DateProperties />
        <RepeatRuleProperties />
      </Provider>
    );
  }
}

const wrapper = document.getElementById('event-builder');
export const isPro = 'pro' in wrapper.dataset;
export const isRepeatRulesEnabled = 'repeatRulesEnabled' in wrapper.dataset;

wrapper ? ReactDOM.render(<App />, wrapper) : false;

export default App;
