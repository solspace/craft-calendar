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

const wrapper = document.querySelector('#event-builder, [data-event-builder]');
export const isPro = 'pro' in wrapper.dataset;
export const isRepeatRulesEnabled = 'repeatRulesEnabled' in wrapper.dataset;

wrapper ? ReactDOM.render(<App />, wrapper) : false;

export default App;

// Enable re-loading of builder for slideouts
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    const { target, previousSibling } = mutation;

    const isEditingEntry = target?.classList?.contains('edit-entry');

    const isPreview = previousSibling?.classList?.contains('lp-preview-container');
    const isSlideOut = previousSibling?.classList?.contains('slideout-container');

    if (isEditingEntry) {
      if (isPreview) {
        const wrapper = document.querySelector('.lp-editor-container [data-event-builder]');
        wrapper ? ReactDOM.render(<App />, wrapper) : false;
      }

      if (isSlideOut) {
        const wrapper = document.querySelector('#event-builder, [data-event-builder]');
        wrapper ? ReactDOM.render(<App />, wrapper) : false;
      }
    }
  }
});

observer.observe(document.querySelector('body'), { childList: true });
