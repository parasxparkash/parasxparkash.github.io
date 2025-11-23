'use client'

import { useState, useEffect } from 'react'

interface VisitorInfo {
  ip: string
  city: string
  region: string
  country: string
  timezone: string
  isp: string
  browser: string
  os: string
  screen: string
}

export default function UserInfo() {
  const [info, setInfo] = useState<Partial<VisitorInfo>>({})

  useEffect(() => {
    let isMounted = true
    
    const fetchUserInfo = async () => {
      try {
        // Get browser and OS info from user agent
        const userAgent = navigator.userAgent
        let os = 'Unknown'
        let browser = 'Unknown'

        if (userAgent.indexOf('Win') !== -1) os = 'Windows'
        else if (userAgent.indexOf('Mac') !== -1) os = 'macOS'
        else if (userAgent.indexOf('Linux') !== -1) os = 'Linux'
        else if (userAgent.indexOf('Android') !== -1) os = 'Android'
        else if (userAgent.indexOf('iPhone') !== -1 || userAgent.indexOf('iPad') !== -1) os = 'iOS'

        if (userAgent.indexOf('Chrome') !== -1 && userAgent.indexOf('Edg') === -1) browser = 'Chrome'
        else if (userAgent.indexOf('Firefox') !== -1) browser = 'Firefox'
        else if (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1) browser = 'Safari'
        else if (userAgent.indexOf('Edg') !== -1) browser = 'Edge'
        else if (userAgent.indexOf('Opera') !== -1) browser = 'Opera'

        const screenRes = `${screen.width}x${screen.height}`
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

        // Fetch IP address
        const ipPromises = [
          fetch('https://api.ipify.org?format=json', { 
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            signal: AbortSignal.timeout(3000)
          }).then(r => r.ok ? r.json() : null).catch(() => null),
          fetch('https://api64.ipify.org?format=json', {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            signal: AbortSignal.timeout(3000)
          }).then(r => r.ok ? r.json() : null).catch(() => null)
        ]

        const ipResults = await Promise.race(ipPromises.map(p => p.catch(() => null)))
        const ip = ipResults?.ip || null

        if (!isMounted) return

        if (ip) {
          // Fetch detailed location based on IP
          try {
            const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`, {
              method: 'GET',
              headers: { 'Accept': 'application/json' },
              signal: AbortSignal.timeout(5000)
            })
            
            if (!isMounted) return

            if (geoResponse.ok) {
              const geoData = await geoResponse.json()
              
              if (!geoData.error && isMounted) {
                setInfo({
                  ip,
                  city: geoData.city || 'Unknown',
                  region: geoData.region || 'Unknown',
                  country: geoData.country_name || 'Unknown',
                  timezone: geoData.timezone || timezone,
                  isp: geoData.org || 'Unknown',
                  browser,
                  os,
                  screen: screenRes
                })
              } else if (isMounted) {
                setInfo({
                  ip,
                  city: 'Unknown',
                  region: 'Unknown',
                  country: 'Unknown',
                  timezone,
                  isp: 'Unknown',
                  browser,
                  os,
                  screen: screenRes
                })
              }
            } else if (isMounted) {
              setInfo({
                ip,
                city: 'Unknown',
                region: 'Unknown',
                country: 'Unknown',
                timezone,
                isp: 'Unknown',
                browser,
                os,
                screen: screenRes
              })
            }
          } catch (geoError) {
            if (isMounted) {
              setInfo({
                ip,
                city: 'Unknown',
                region: 'Unknown',
                country: 'Unknown',
                timezone,
                isp: 'Unknown',
                browser,
                os,
                screen: screenRes
              })
            }
          }
        } else if (isMounted) {
          setInfo({
            ip: 'Unable to fetch',
            city: 'Unknown',
            region: 'Unknown',
            country: 'Unknown',
            timezone,
            isp: 'Unknown',
            browser,
            os,
            screen: screenRes
          })
        }
      } catch (error) {
        if (isMounted) {
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
          const screenRes = `${screen.width}x${screen.height}`
          setInfo({
            ip: 'Unable to fetch',
            city: 'Unknown',
            region: 'Unknown',
            country: 'Unknown',
            timezone,
            isp: 'Unknown',
            browser: 'Unknown',
            os: 'Unknown',
            screen: screenRes
          })
        }
      }
    }

    fetchUserInfo()
    
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700">
      <div className="text-xs text-zinc-400 dark:text-zinc-500 space-y-1">
        {info.ip && (
          <>
            <div>IP: {info.ip}</div>
            {info.city && info.region && info.country && (
              <div>Location: {info.city}, {info.region}, {info.country}</div>
            )}
            {info.timezone && <div>Timezone: {info.timezone}</div>}
            {info.isp && <div>ISP: {info.isp}</div>}
            {info.browser && info.os && (
              <div>{info.os} • {info.browser}</div>
            )}
            {info.screen && <div>Screen: {info.screen}</div>}
          </>
        )}
        {!info.ip && (
          <div>Detecting system... • Detecting location...</div>
        )}
      </div>
    </div>
  )
}

