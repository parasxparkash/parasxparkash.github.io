export default function ResearchProjectsTab() {
  const projects = [
    {
      name: 'Diversified Stock Portfolio Using Clustering Analysis',
      year: '2024',
      description: 'S&P 500 portfolio construction using K-means clustering on risk/return features (correlation, beta, returns, volatility, Sharpe ratio). Backtested vs index.',
      tags: ['Python', 'K-means', 'backtesting'],
      tagColors: ['blue', 'purple', 'green'],
      status: 'active'
    },
    {
      name: 'Relative Rotation Graph (RRG) — US Equity',
      year: '2025',
      description: 'Dynamic RRG for US stocks vs S&P 500. JdK RS-Ratio and RS-Momentum with animation.',
      tags: ['Python', 'yfinance', 'Recharts'],
      tagColors: ['blue', 'cyan', 'orange'],
      status: 'active'
    },
    {
      name: 'Adaptive Portfolio Strategies: Sequential Allocation Methods',
      year: '2025',
      description: 'Comprehensive analysis of 14 sequential portfolio allocation strategies on diversified ETF portfolio. Includes momentum-based, reversion-based, and pattern-learning approaches with transaction cost analysis.',
      tags: ['Python', 'sequential optimization', 'backtesting'],
      tagColors: ['blue', 'purple', 'green'],
      status: 'active'
    },
    {
      name: 'Market Regime Detection Using Gaussian Models',
      year: '2025',
      description: 'Comprehensive market regime identification across 21 global indices using Gaussian Mixture Models (GMM) and Greedy Gaussian Segmentation (GSS). Detects bull, bear, and transition regimes for adaptive portfolio management.',
      tags: ['Python', 'GMM', 'GSS', 'regime detection'],
      tagColors: ['blue', 'purple', 'orange', 'cyan'],
      status: 'active'
    }
  ]

  const getTagColorClass = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
      green: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300',
      orange: 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
      purple: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
      cyan: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300'
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
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">({project.year})</span>
                    {project.status === 'active' && (
                      <div className="w-1.5 h-1.5 bg-green-500 rounded animate-pulse" title="Active"></div>
                    )}
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
