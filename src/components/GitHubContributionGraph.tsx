import type { CSSProperties } from 'react'
import { ContributionYear, getContributions } from '@/data/github/contributions'

interface ContributionDay {
  contributionCount: number
  date: string
}

interface GitHubContributionGraphProps {
  year: ContributionYear
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function expandWeeks(year: ContributionYear): ContributionDay[][] {
  const data = getContributions(year)
  const start = new Date(`${data.start}T00:00:00Z`)
  let offset = 0

  return data.weeks.map((counts) =>
    counts.map((contributionCount) => {
      const date = new Date(start)
      date.setUTCDate(start.getUTCDate() + offset)
      offset += 1
      return {
        contributionCount,
        date: date.toISOString().slice(0, 10),
      }
    })
  )
}

function padWeek(week: ContributionDay[]): (ContributionDay | null)[] {
  const cells: (ContributionDay | null)[] = Array(7).fill(null)
  week.forEach((day) => {
    cells[new Date(`${day.date}T00:00:00Z`).getUTCDay()] = day
  })
  return cells
}

function monthLabel(week: (ContributionDay | null)[], weekIndex: number) {
  const firstOfMonth = week.find((day) => day?.date.endsWith('-01'))
  const labeled = firstOfMonth ?? (weekIndex === 0 ? week.find((day) => day) : null)
  if (!labeled) return ''
  return months[Number(labeled.date.slice(5, 7)) - 1]
}

function getColor(count: number) {
  if (count === 0) return 'bg-zinc-100 dark:bg-zinc-800'
  if (count < 3) return 'bg-green-200 dark:bg-green-900'
  if (count < 6) return 'bg-green-300 dark:bg-green-700'
  if (count < 9) return 'bg-green-400 dark:bg-green-600'
  return 'bg-green-500 dark:bg-green-500'
}

export default function GitHubContributionGraph({ year }: GitHubContributionGraphProps) {
  const weeks = expandWeeks(year).map(padWeek)
  const weekStyle = { '--weeks': weeks.length } as CSSProperties

  return (
    <div className="w-full min-w-0">
      <div className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-1">
        <div />
        <div className="contribution-weeks text-[8px] leading-none text-zinc-500 dark:text-zinc-400 sm:text-[10px]" style={weekStyle}>
          {weeks.map((week, index) => (
            <div key={index} className="overflow-visible whitespace-nowrap">
              {monthLabel(week, index)}
            </div>
          ))}
        </div>

        <div className="relative">
          <div className="absolute inset-0 grid grid-rows-7 text-[8px] leading-none text-zinc-500 dark:text-zinc-400 sm:text-[10px]">
            <span />
            <span className="self-center">Mon</span>
            <span />
            <span className="self-center">Wed</span>
            <span />
            <span className="self-center">Fri</span>
            <span />
          </div>
        </div>

        <div className="contribution-weeks min-w-0 gap-0 lg:gap-0.5" style={weekStyle}>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-rows-7 gap-0 lg:gap-0.5">
              {week.map((day, dayIndex) => (
                day ? (
                  <div
                    key={day.date}
                    className={`aspect-square w-full min-w-0 rounded-[2px] ${getColor(day.contributionCount)}`}
                    title={`${day.contributionCount} contributions on ${day.date}`}
                  />
                ) : (
                  <div key={`empty-${weekIndex}-${dayIndex}`} className="aspect-square w-full min-w-0" />
                )
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2 text-[10px] text-zinc-500 dark:text-zinc-400">
        <span>Less</span>
        <div className="flex gap-0.5">
          <div className="h-[7px] w-[7px] rounded-sm bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-[7px] w-[7px] rounded-sm bg-green-200 dark:bg-green-900" />
          <div className="h-[7px] w-[7px] rounded-sm bg-green-300 dark:bg-green-700" />
          <div className="h-[7px] w-[7px] rounded-sm bg-green-400 dark:bg-green-600" />
          <div className="h-[7px] w-[7px] rounded-sm bg-green-500" />
        </div>
        <span>More</span>
      </div>
    </div>
  )
}
