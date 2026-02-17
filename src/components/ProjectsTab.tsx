export default function ProjectsTab() {
  const projects = [
    {
      name: 'QuantBuilt',
      description: 'An investment optimization platform designed for Indian users to build and optimize their investment portfolios with quantitative strategies, featuring portfolio analytics and risk management tools.',
      tags: ['Portfolio Management', 'Investment', 'Optimization', 'Indian Markets'],
      tagColors: ['blue', 'green', 'orange', 'purple'],
      website: 'https://quantbuilt.com',
      status: 'active'
    },
    {
      name: 'QuantifiedTrader',
      description: 'A comprehensive blog platform for quantitative traders featuring in-depth analysis of different trading strategies, market microstructure research, and systematic trading methodologies.',
      tags: ['Quant Trading', 'Strategy Analysis', 'Research', 'Blog'],
      tagColors: ['blue', 'cyan', 'purple', 'gray'],
      website: 'https://quantifiedtrader.com',
      status: 'active'
    },
    {
      name: 'QuantEdX',
      description: 'An educational platform for aspiring quantitative traders and researchers, offering comprehensive courses on quantitative finance, algorithmic trading, and mathematical finance fundamentals.',
      tags: ['Education', 'Quant Finance', 'Learning Platform', 'Courses'],
      tagColors: ['green', 'blue', 'purple', 'orange'],
      website: 'https://quantedx.com',
      status: 'active'
    },
    {
      name: 'DelQuant',
      description: 'An open-source algorithmic trading software with a high-performance Rust backend engine and Electron-based interface, designed to integrate with AI agents for enhanced trading capabilities and intelligent strategy execution.',
      tags: ['Rust', 'Electron', 'AI Agents', 'Open Source', 'Algo Trading'],
      tagColors: ['orange', 'cyan', 'purple', 'green', 'blue'],
      website: 'https://github.com/parasxparkash/delquant',
      status: 'active'
    },
    {
      name: 'AtharvaSoft',
      description: 'A modern astrology platform combining traditional Vedic astrology principles with contemporary technology, offering personalized astrological insights and computational tools for chart analysis.',
      tags: ['Astrology', 'Vedic', 'Chart Analysis', 'Modern Tools'],
      tagColors: ['indigo', 'purple', 'pink', 'blue'],
      website: 'https://atharvasoft.com',
      status: 'active'
    }
  ]

  const getTagColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
      green: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300',
      orange: 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
      purple: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
      cyan: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300',
      gray: 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300',
      indigo: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
      pink: 'bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300'
    }
    return colors[color] || colors.blue
  }

  return (
    <section className="mb-12">
      <div className="space-y-8">
        <ul className="space-y-8">
          {projects.map((project, index) => (
            <div key={project.name} className="animate-slide-left" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
              <li className="group hover:translate-x-1 transition-all duration-300 ease-out">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="text-md font-medium">{project.name}</h3>
                  <div className="flex items-center gap-1.5 ml-auto">
                    {project.status === 'active' && (
                      <div className="w-1.5 h-1.5 bg-green-500 rounded animate-pulse" title="Active"></div>
                    )}
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center"
                      title={`Visit ${project.name}`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 text-justify">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tag} className={`px-2 py-1 text-xs rounded ${getTagColorClass(project.tagColors[tagIndex])}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </section>
  )
}