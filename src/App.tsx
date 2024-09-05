import { useState } from 'react'
import './App.css'
import { reportFraudulent } from './utils/scripts';

function App() {
  return (
    <div>
      <div>
        <h1>Job Posting Report</h1>
        <h2> other people have reported this listing as fraudalent.</h2>
      </div>
      <button onClick={() => reportFraudulent()}>This is a fake listing</button>
    </div>
  );
}

export default App
