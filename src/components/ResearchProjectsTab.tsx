export default function ResearchProjectsTab() {
  const projects = [
    {
      name: 'Diversified Stock Portfolio Using Clustering Analysis',
      year: '2024',
      description: 'S&P 500 portfolio construction using K-means clustering on risk/return features (correlation, beta, returns, volatility, Sharpe ratio). Backtested vs index.',
      tags: ['Python', 'K-means', 'backtesting'],
      tagColors: ['blue', 'purple', 'green'],
      website: 'https://quantifiedtrader.com/projects',
      status: 'active'
    },
    {
      name: 'Relative Rotation Graph (RRG) — US Equity',
      year: '2025',
      description: 'Dynamic RRG for US stocks vs S&P 500. JdK RS-Ratio and RS-Momentum with animation.',
      tags: ['Python', 'yfinance', 'Recharts'],
      tagColors: ['blue', 'cyan', 'orange'],
      website: 'https://quantifiedtrader.com/projects',
      status: 'active'
    },
    {
      name: 'Adaptive Portfolio Strategies: Sequential Allocation Methods',
      year: '2025',
      description: 'Comprehensive analysis of 14 sequential portfolio allocation strategies on diversified ETF portfolio. Includes momentum-based, reversion-based, and pattern-learning approaches with transaction cost analysis.',
      tags: ['Python', 'sequential optimization', 'backtesting'],
      tagColors: ['blue', 'purple', 'green'],
      website: 'https://quantifiedtrader.com/projects',
      status: 'active'
    },
    {
      name: 'Market Regime Detection Using Gaussian Models',
      year: '2025',
      description: 'Comprehensive market regime identification across 21 global indices using Gaussian Mixture Models (GMM) and Greedy Gaussian Segmentation (GSS). Detects bull, bear, and transition regimes for adaptive portfolio management.',
      tags: ['Python', 'GMM', 'GSS', 'regime detection'],
      tagColors: ['blue', 'purple', 'orange', 'cyan'],
      website: 'https://quantifiedtrader.com/projects',
      status: 'active'
    }
  ]

  const tagClass = 'px-1.5 py-0.5 text-[10px] bg-zinc-700 text-white dark:bg-zinc-400 dark:text-zinc-900 rounded'

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
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">({project.year})</span>
                    {project.status === 'active' && (
                      <div className="w-1.5 h-1.5 bg-green-500 rounded animate-pulse" title="Active"></div>
                    )}
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center"
                      title={`View ${project.name}`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 text-justify">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className={tagClass}>
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
