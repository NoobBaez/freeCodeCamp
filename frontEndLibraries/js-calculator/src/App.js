import React from 'react';
import { connect } from 'react-redux';
import './App.scss';
import Display from './components/Display';

import Pad from './components/Pad';

function App({ pads }) {
  return (
    <div className="App">
      <div id="calculator-machine">
        <Display/>
        {
          pads.map(pad => <Pad key={pad.id} pad={pad} />)
        }
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    pads: state.pads
  }
};

export default connect(mapStateToProps, null)(App);
