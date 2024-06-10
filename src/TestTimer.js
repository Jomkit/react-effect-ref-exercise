import React, { useEffect, useRef, useState } from 'react';

const TestTimer = () => {
    const timerId = useRef(null);
    const [time, setTime] = useState(0);
    const [start, setStart] = useState(false);
    useEffect(() => {
        if(start){
            timerId.current = setInterval(() => {
                setTime((s) => (s + 1));
            }, 1000);
        }
        
        return(() => clearInterval(timerId.current));
    }, [start])
    
  return (
    <div>
        <p>Timer: {time}s</p>
        <button onClick={() => setStart(true)}>Start</button>
        <button onClick={() => setStart(false)}>Pause</button>
    </div>
  )
}

export default TestTimer