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
      
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex mb-1 ml-8">
            {monthLabels.map((label, i) => (
              <div
                key={i}
                className="text-xs text-zinc-500 dark:text-zinc-400"
                style={{ 
                  position: 'absolute',
                  left: `${label.x * 12 + 32}px`
                }}
              >
                {label.month}
              </div>
            ))}
          </div>

          {/* Contribution grid */}
          <div className="flex gap-1">
            {/* Day labels */}
            <div className="flex flex-col gap-1 text-xs text-zinc-500 dark:text-zinc-400 pr-2">
              <div style={{ height: '10px' }}></div>
              <div style={{ height: '10px' }}>Mon</div>
              <div style={{ height: '10px' }}></div>
              <div style={{ height: '10px' }}>Wed</div>
              <div style={{ height: '10px' }}></div>
              <div style={{ height: '10px' }}>Fri</div>
              <div style={{ height: '10px' }}></div>
            </div>

            {/* Weeks */}
            <div className="flex gap-1">
              {data.weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.contributionDays.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`w-[10px] h-[10px] rounded-sm ${getColor(day.contributionCount)} hover:ring-2 hover:ring-zinc-400 dark:hover:ring-zinc-500 transition-all cursor-pointer`}
                      title={`${day.contributionCount} contributions on ${new Date(day.date).toLocaleDateString()}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 text-xs text-zinc-500 dark:text-zinc-400">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-[10px] h-[10px] rounded-sm bg-zinc-100 dark:bg-zinc-800"></div>
              <div className="w-[10px] h-[10px] rounded-sm bg-green-200 dark:bg-green-900"></div>
              <div className="w-[10px] h-[10px] rounded-sm bg-green-300 dark:bg-green-700"></div>
              <div className="w-[10px] h-[10px] rounded-sm bg-green-400 dark:bg-green-600"></div>
              <div className="w-[10px] h-[10px] rounded-sm bg-green-500 dark:bg-green-500"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  )
}
