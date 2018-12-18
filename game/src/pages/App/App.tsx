// import React, { Component } from 'react';
import React, { useState } from 'react';
import { Grid } from '../../components/Grid';
import { Button } from '../../components/Button';
import './App.css';

const App = () => {
  const [start, doStart] = useState(false);
  const [reset, doReset] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <Grid 
          start={start}
          reset={reset}
          doStop={() => doStart(false)}
          doneReset={() => doReset(false)} />
        <Button 
          title="Start" 
          cb={() => doStart(true)} />
        <Button 
          title="Stop" 
          cb={() => doStart(false)} />
        <Button 
          title="Clear"
          cb={() => doReset(true)} />
      </header>
    </div>
  );
}

export default App;
