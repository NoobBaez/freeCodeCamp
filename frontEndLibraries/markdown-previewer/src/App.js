import React from 'react';
import Editor from './components/Editor';
import Preview from './components/Preview';
import Window from './components/Window';

import './App.css';

function App() {
  return (
    <div className="App">
      <Window icon="fa-edit" title="Editor">
        <Editor />
      </Window>
      <Window icon="fa-file-code" title="Preview">
        <Preview />
      </Window>
    </div>
  );
}

export default App;
