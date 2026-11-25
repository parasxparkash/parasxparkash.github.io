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

    let clockInterval = 0

    const start = () => {
      updateISTClock()
      clockInterval = window.setInterval(updateISTClock, 1000)
    }

    const stop = () => {
      window.clearInterval(clockInterval)
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stop()
      } else {
        stop()
        start()
      }
    }

    start()
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      stop()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return time
}
