import { Ref } from 'react'
import { quantifiedTraderProjects } from '@/data/quantified-trader-projects'

interface ProjectsTabProps {
  scrollRef?: Ref<HTMLDivElement>
  maxHeight?: number | null
}

export default function ProjectsTab({ scrollRef, maxHeight }: ProjectsTabProps) {
  const tagClass =
    'px-1.5 py-0.5 text-[10px] bg-zinc-700 bg-opacity-80 text-white dark:bg-zinc-400 dark:bg-opacity-80 dark:text-zinc-900 rounded'

  return (
    <section className="mb-12">
      <div
        ref={scrollRef}
        className="projects-tab-scroll overflow-y-auto pr-1"
        style={maxHeight ? { maxHeight } : undefined}
      >
      <div className="space-y-8">
        <ul className="space-y-8">
          {quantifiedTraderProjects.map((project, index) => (
            <div
              key={project.id}
              className="animate-slide-left"
              style={{ animationDelay: `${Math.min((index + 1) * 50, 400)}ms` }}
            >
              <li className="group hover:translate-x-1 transition-transform duration-150 ease-out">
                <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                  <h3 className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    {project.name} ({project.year})
                  </h3>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{project.region}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded animate-pulse" title="Active" />
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center"
                      title={`Visit ${project.name}`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2 text-justify">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className={tagClass}>
                      {tech}
                    </span>
                  ))}
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
      </div>
    </section>
  )
}
