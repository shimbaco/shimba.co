import debounce from 'lodash/debounce';
import React, { useCallback, useState } from 'react';
import { createEditor, Node } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import eventBus from '../lib/event-bus';

export const Editor = ({ content }) => {
  const [editor] = useState(() => withReact(createEditor()));
  const [value, _setValue] = useState(
    content?.split('\n').map((text) => {
      return {
        type: 'paragraph',
        children: [{ text }],
      };
    }),
  );

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
    <Slate
      editor={editor}
      value={value}
      onChange={(newNodes) => {
        emitBody(newNodes);
      }}
    >
      <Editable />
    </Slate>
  );
};
