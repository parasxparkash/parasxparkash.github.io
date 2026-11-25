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

function getColor(count: number) {
  if (count === 0) return 'bg-zinc-100 dark:bg-zinc-800'
  if (count < 3) return 'bg-green-200 dark:bg-green-900'
  if (count < 6) return 'bg-green-300 dark:bg-green-700'
  if (count < 9) return 'bg-green-400 dark:bg-green-600'
  return 'bg-green-500 dark:bg-green-500'
}

export default function GitHubContributionGraph({ year }: GitHubContributionGraphProps) {
  const weeks = expandWeeks(year)
  const monthLabels: { month: string; x: number }[] = []

  weeks.forEach((week, weekIndex) => {
    const firstDay = week[0]
    if (!firstDay) return
    const day = Number(firstDay.date.slice(8, 10))
    const month = Number(firstDay.date.slice(5, 7)) - 1
    if (day <= 7 && weekIndex > 0) {
      monthLabels.push({
        month: months[month],
        x: weekIndex,
      })
    }
  })

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl overflow-x-auto overflow-y-hidden scrollbar-hide">
        <div className="w-full min-w-[600px]" style={{ margin: '0 auto' }}>
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

          <div className="flex gap-0.5">
            <div className="flex flex-col gap-0.5 text-[10px] text-zinc-500 dark:text-zinc-400 pr-1.5">
              <div style={{ height: '7px' }}></div>
              <div style={{ height: '7px' }}>Mon</div>
              <div style={{ height: '7px' }}></div>
              <div style={{ height: '7px' }}>Wed</div>
              <div style={{ height: '7px' }}></div>
              <div style={{ height: '7px' }}>Fri</div>
              <div style={{ height: '7px' }}></div>
            </div>

            <div className="flex gap-0.5">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-0.5">
                  {week.map((day) => (
                    <div
                      key={day.date}
                      className={`w-[7px] h-[7px] rounded-sm ${getColor(day.contributionCount)} hover:ring-1 hover:ring-zinc-400 dark:hover:ring-zinc-500 cursor-pointer`}
                      title={`${day.contributionCount} contributions on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

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
