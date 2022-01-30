import debounce from 'lodash/debounce';
import React, { useCallback, useState } from 'react';
import { createEditor, Node } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import eventBus from '../lib/event-bus';

export const Editor = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const [value, _setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);

  const emitBody = useCallback(
    debounce((nodes) => {
      const body = nodes.map((n) => Node.string(n)).join('\n');
      eventBus.$emit('editor:changed', {
        body,
      });
    }, 300),
    [],
  );

  return (
    // Add the editable component inside the context.
    <Slate
      editor={editor}
      value={value}
      onChange={(newNodes) => {
        console.log('newNodes: ', newNodes);
        emitBody(newNodes);
      }}
    >
      <Editable />
    </Slate>
  );
};
