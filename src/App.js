import { useState, useEffect } from 'react'
import { Requirements, doubleClick$, click$ } from './components/Requirements/Requirements'
import { timeFormat } from './components/timeFormat/TimeFormat';
import './App.css'

function App() {
  const [seconds, setSeconds] = useState(0)
  const [run, setRun] = useState(false)
  const [time, setTime] = useState(timeFormat(0))
  const [wait, setWait] = useState(false)

  useEffect(() => {
    if (run) {
      const sub = Requirements(seconds).subscribe(setSeconds)

      return () => sub.unsubscribe()
    } else {
      if (!wait) setSeconds(0)
    }
  }, [run, wait])

  useEffect(() => {
    setTime(timeFormat(seconds))
  }, [seconds])

  useEffect(() => {
    doubleClick$.subscribe(() => {
      setWait(true)
      setRun(false)
    })
  }, [])

  function startStopBtnHandler() {
    if (wait) {
      setWait(false)
      setRun(true)
    } else {
      setRun(prev => !prev)
    }
  }

  function resetHandler() {
    new Promise((resolve) => {
      setRun(false)
      setSeconds(0)
      resolve()
    }).then(() => {
      setRun(true)
    })
  }

  return <div className='App'>
    <div className='text'>
      {time.hours}:
      {time.minutes}:
      {time.seconds}
    </div>

    <div >
      <button onClick={startStopBtnHandler}>{run ? 'Stop' : 'Start'}</button>
      <button onClick={() => click$.next()} disabled={!run}>Wait</button>
      <button onClick={resetHandler} disabled={!run}>Reset</button>
    </div>
  </div>
}

export default App
