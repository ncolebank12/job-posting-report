import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Job Posting Report</h1>
        <h2>{count} other people have reported this listing as fraudalent.</h2>
      </div>

      <button onClick={() => setCount(count + 1)} />
    </>
  )
}

export default App
