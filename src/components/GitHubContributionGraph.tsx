'use client'

import { useState, useEffect } from 'react'

interface ContributionDay {
  contributionCount: number
  date: string
  weekday: number
}

interface ContributionWeek {
  contributionDays: ContributionDay[]
}

interface ContributionData {
  totalContributions: number
  weeks: ContributionWeek[]
}

interface GitHubContributionGraphProps {
  year: number
}

export default function GitHubContributionGraph({ year }: GitHubContributionGraphProps) {
  const [data, setData] = useState<ContributionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadContributions() {
      setLoading(true)
      setError(null)
      
      try {
        // For GitHub Pages: fetch from static JSON files
        const response = await fetch(`/data/contributions-${year}.json`)
        if (!response.ok) {
          throw new Error(`Failed to load contributions for ${year}`)
        }
        const contributionData = await response.json()
        setData(contributionData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load contributions')
        console.error('Error loading contributions:', err)
      } finally {
        setLoading(false)
      }
    }

    loadContributions()
  }, [year])

  const getColor = (count: number) => {
    if (count === 0) return 'bg-zinc-100 dark:bg-zinc-800'
    if (count < 3) return 'bg-green-200 dark:bg-green-900'
    if (count < 6) return 'bg-green-300 dark:bg-green-700'
    if (count < 9) return 'bg-green-400 dark:bg-green-600'
    return 'bg-green-500 dark:bg-green-500'
  }

  if (loading) {
    return (
      <div className="w-full h-32 flex items-center justify-center bg-zinc-50 dark:bg-zinc-800 rounded">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading contributions...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-32 flex items-center justify-center bg-zinc-50 dark:bg-zinc-800 rounded">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    )
  }

  if (!data) {
    return null
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthLabels: { month: string; x: number }[] = []
  
  // Calculate month positions
  data.weeks.forEach((week, weekIndex) => {
    const firstDay = week.contributionDays[0]
    if (firstDay) {
      const date = new Date(firstDay.date)
      const day = date.getDate()
      if (day <= 7 && weekIndex > 0) {
        monthLabels.push({
          month: months[date.getMonth()],
          x: weekIndex
        })
      }
    }
  })

  return (
    <div className="w-full">
      <div className="mb-2">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {data.totalContributions} contributions in {year}
        </p>
      </div>
      
      <div className="w-full overflow-hidden">
        <div className="w-full">
          {/* Month labels */}
          <div className="flex mb-1 ml-6 relative" style={{ height: '16px' }}>
            {monthLabels.map((label, i) => (
              <div
                key={i}
                className="text-[10px] text-zinc-500 dark:text-zinc-400 absolute"
                style={{ 
                  left: `${label.x * 8.5 + 24}px`
                }}
              >
                {label.month}
              </div>
            ))}
          </div>

          {/* Contribution grid */}
          <div className="flex gap-0.5">
            {/* Day labels */}
            <div className="flex flex-col gap-0.5 text-[10px] text-zinc-500 dark:text-zinc-400 pr-1.5">
              <div style={{ height: '7px' }}></div>
              <div style={{ height: '7px' }}>Mon</div>
              <div style={{ height: '7px' }}></div>
              <div style={{ height: '7px' }}>Wed</div>
              <div style={{ height: '7px' }}></div>
              <div style={{ height: '7px' }}>Fri</div>
              <div style={{ height: '7px' }}></div>
            </div>

            {/* Weeks */}
            <div className="flex gap-0.5 flex-1 overflow-hidden">
              {data.weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-0.5">
                  {week.contributionDays.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`w-[7px] h-[7px] rounded-sm ${getColor(day.contributionCount)} hover:ring-1 hover:ring-zinc-400 dark:hover:ring-zinc-500 transition-all cursor-pointer`}
                      title={`${day.contributionCount} contributions on ${new Date(day.date).toLocaleDateString()}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-3 text-[10px] text-zinc-500 dark:text-zinc-400">
            <span>Less</span>
            <div className="flex gap-0.5">
              <div className="w-[7px] h-[7px] rounded-sm bg-zinc-100 dark:bg-zinc-800"></div>
              <div className="w-[7px] h-[7px] rounded-sm bg-green-200 dark:bg-green-900"></div>
              <div className="w-[7px] h-[7px] rounded-sm bg-green-300 dark:bg-green-700"></div>
              <div className="w-[7px] h-[7px] rounded-sm bg-green-400 dark:bg-green-600"></div>
              <div className="w-[7px] h-[7px] rounded-sm bg-green-500 dark:bg-green-500"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  )
}
