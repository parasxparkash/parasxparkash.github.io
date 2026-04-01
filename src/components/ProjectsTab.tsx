export default function ProjectsTab() {
  const projects = [
    {
      id: 1,
      name: 'Diversified Stock Portfolio Using Clustering Analysis',
      year: '2024',
      description: 'S&P 500 portfolio construction using K-means clustering on risk/return features (correlation, beta, returns, volatility, Sharpe ratio). Backtested vs index.',
      technologies: ['Python', 'K-means', 'backtesting'],
      status: 'active',
      link: 'https://quantifiedtrader.com/projects/'
    },
    {
      id: 2,
      name: 'Relative Rotation Graph (RRG) — US Equity',
      year: '2025',
      description: 'Dynamic RRG for US stocks vs S&P 500. JdK RS-Ratio and RS-Momentum with animation.',
      technologies: ['Python', 'yfinance', 'Recharts'],
      status: 'active',
      link: 'https://quantifiedtrader.com/projects/'
    },
    {
      id: 3,
      name: 'Adaptive Portfolio Strategies: Sequential Allocation Methods',
      year: '2025',
      description: 'Comprehensive analysis of 14 sequential portfolio allocation strategies on diversified ETF portfolio. Includes momentum-based, reversion-based, and pattern-learning approaches with transaction cost analysis.',
      technologies: ['Python', 'sequential optimization', 'backtesting'],
      status: 'active',
      link: 'https://quantifiedtrader.com/projects/'
    },
    {
      id: 4,
      name: 'Market Regime Detection Using Gaussian Models',
      year: '2025',
      description: 'Comprehensive market regime identification across 21 global indices using Gaussian Mixture Models (GMM) and Greedy Gaussian Segmentation (GSS). Detects bull, bear, and transition regimes for adaptive portfolio management.',
      technologies: ['Python', 'GMM', 'GSS', 'regime detection'],
      status: 'active',
      link: 'https://quantifiedtrader.com/projects/'
    },
    {
      id: 5,
      name: 'Stock Sentiment Tracker',
      year: '2025',
      description: 'US equity sentiment tracker using VADER lexical analysis on financial news headlines. Tracks prices, sentiment scores, and correlations for S&P 500 stocks. Updated daily.',
      technologies: ['Python', 'VADER', 'NLP', 'financial news APIs'],
      status: 'active',
      link: 'https://quantifiedtrader.com/projects/'
    }
  ]

  const tagClass = 'px-1.5 py-0.5 text-[10px] bg-zinc-700 text-white dark:bg-zinc-400 dark:text-zinc-900 rounded'

  return (
    <section className="mb-12">
      <div className="mb-6">
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          Featured projects in quantitative finance, portfolio construction, and systematic investing.
          Each project applies quantitative methods to specific problems in finance — from clustering-based
          portfolio construction and market regime detection to adaptive portfolio strategies and RRG-based rotation analysis.
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Projects include interactive visualizations, source code links, and methodology explanations.
          Data is updated periodically via automated pipelines.
        </p>
      </div>

      <div className="space-y-8">
        <ul className="space-y-8">
          {projects.map((project, index) => (
            <div key={project.id} className="animate-slide-left" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
              <li className="group hover:translate-x-1 transition-all duration-300 ease-out">
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-md font-medium">{project.name} ({project.year})</h3>
                  <div className="flex items-center gap-1.5">
                    {project.status === 'active' && (
                      <div className="w-1.5 h-1.5 bg-green-500 rounded animate-pulse" title="Active"></div>
                    )}
                    <a
                      href={project.link}
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
                  {project.technologies.map((tech, techIndex) => (
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
    </section>
  )
}