import { Controller } from '@hotwired/stimulus';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Editor } from '../editor';
import eventBus from '../lib/event-bus';

export default class extends Controller {
  static targets = ['slate', 'textarea'];

  initialize() {
    eventBus.$on('editor:changed', (val) => {
      this.textareaTarget.value = val.body;
    });
  }

  connect() {
    ReactDOM.render(<Editor />, this.slateTarget);
  }
}
