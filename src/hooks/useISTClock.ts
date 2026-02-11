import { useState, useEffect } from 'react'

export function useISTClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateISTClock = () => {
      const now = new Date()
      const istTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}))

      const timeString = istTime.toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
      })

      const dayString = istTime.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      })

      setTime(`${dayString}, ${timeString} IST`)
    }

    updateISTClock()
    const clockInterval = setInterval(updateISTClock, 1000)
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(clockInterval)
      } else {
        updateISTClock()
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(clockInterval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return time
}
