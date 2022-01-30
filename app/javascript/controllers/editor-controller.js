import { Controller } from '@hotwired/stimulus';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Editor } from '../editor';
import eventBus from '../lib/event-bus';

export default class extends Controller {
  static targets = ['slate', 'textarea'];

  initialize() {
    console.log('initialize!');

    eventBus.$on('editor:changed', (val) => {
      console.log('changed!', val.body);
      this.textareaTarget.value = val.body;
    });
  }

  connect() {
    ReactDOM.render(<Editor />, this.slateTarget);
  }
}
