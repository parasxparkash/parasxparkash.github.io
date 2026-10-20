import { formatPostMonthDay } from '@/lib/post-utils'

export interface ActivityItem {
  id: string
  href: string
  title: string
  label: string
  date: string
}

interface ActivityListProps {
  title: string
  items: ActivityItem[]
  dotClassName: string
}

export default function ActivityList({ title, items, dotClassName }: ActivityListProps) {
  return (
    <div>
      <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3">{title}</h4>
      <div className="space-y-2">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block group hover:translate-x-1 transition-transform duration-150 ease-out"
          >
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-1">
                <div className={`w-1.5 h-1.5 rounded-full ${dotClassName}`}></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors line-clamp-2">
                  {item.title}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="font-mono text-[10px]">{item.label}</span>
                  <span>•</span>
                  <span className="text-[10px]">{formatPostMonthDay(item.date)}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
