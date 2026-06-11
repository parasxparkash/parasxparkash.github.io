export interface QuantifiedTraderProject {
  id: number
  name: string
  year: string
  description: string
  technologies: string[]
  link: string
  region: 'Global' | 'India'
}

const globalProjects: Omit<QuantifiedTraderProject, 'id' | 'region'>[] = [
  {
    name: 'Cross-section shrinkage lab (ETF panel)',
    year: '2026',
    description:
      'Yahoo Finance ETF panel: PCA spectrum, cross-sectional R² vs K, pseudo-OOS folds, ridge diagnostics. JSON from npm run data:shrinking-cross-section.',
    technologies: ['Python', 'Recharts', 'PCA', 'shrinkage', 'cross-sectional R²'],
    link: 'https://quantifiedtrader.com/projects/shrinking-cross-section-study',
  },
  {
    name: 'Market Homogeneity from Correlation Networks',
    year: '2026',
    description:
      'Empirical US study of market-wide co-movement: monthly homogeneity index from correlation networks, regime analysis, SPY conditioning, and interactive network graphs.',
    technologies: ['Correlation networks', 'homogeneity index', 'regime analysis', 'SPY overlay', 'network graphs'],
    link: 'https://quantifiedtrader.com/projects/us-homogeneity-index',
  },
  {
    name: 'Global Capital Flow Intelligence System',
    year: '2026',
    description:
      'Multi-asset framework inferring global capital allocation from Yahoo Finance ETFs: eight flow engines, composite scores, regime detection, correlation networks, and flow-based portfolio backtests.',
    technologies: ['Capital flow inference', '8 analytical layers', 'regime detection', 'flow portfolios', 'hypothesis tests'],
    link: 'https://quantifiedtrader.com/projects/global-capital-flow',
  },
  {
    name: 'Global Multi-Asset Portfolio for the Next Decade',
    year: '2026',
    description:
      'Institutional-style strategic asset allocation across 50+ global ETFs: eight frameworks from 60/40 to risk parity and max Sharpe, with factor attribution, regime splits, Monte Carlo paths, and crisis stress replay.',
    technologies: ['Global ETFs', '60/40 vs diversified', 'risk parity', 'hypothesis tests', 'Monte Carlo'],
    link: 'https://quantifiedtrader.com/projects/global-multi-asset-portfolio',
  },
  {
    name: 'CAPM vs Fama–French vs Carhart',
    year: '2026',
    description:
      'Goncharov (2023) replication: CAPM, FF3, and Carhart four-factor OLS on 30 US stocks (2018–2021) with Ken French factors.',
    technologies: ['CAPM', 'FF3', 'Carhart', 'adjusted R²', 'RSE tests'],
    link: 'https://quantifiedtrader.com/projects/capm-ff-carhart',
  },
  {
    name: 'US IV Asset Pricing Lab',
    year: '2026',
    description:
      'Jegadeesh-style IV asset pricing on US stocks: split-sample betas, Dimson adjustment, OLS vs. IV Fama–MacBeth premia (CAPM–FF5) with characteristic controls.',
    technologies: ['IV', 'EIV bias', 'Ken French', 'individual stocks'],
    link: 'https://quantifiedtrader.com/projects/us-iv-asset-pricing',
  },
  {
    name: 'Smart Beta: Factor-Tilted Portfolio Construction',
    year: '2026',
    description:
      'One-year rolling study on a sector-balanced U.S. equity panel: equal weight, min variance, value tilt, and value–momentum blend with full risk and factor analytics.',
    technologies: ['Factor models', 'portfolio construction', 'risk analytics'],
    link: 'https://quantifiedtrader.com/projects/smart-beta-strategy',
  },
  {
    name: 'US Monte Carlo Portfolio Simulation (GARCH)',
    year: '2026',
    description:
      'Multi-asset Monte Carlo paths with GARCH(1,1) volatility, Student-t shocks, and correlated residuals. Default 50/50 S&P 500 and Dow Jones vs realized performance.',
    technologies: ['GARCH', 'Student-t', 'VaR/CVaR', 'US indices'],
    link: 'https://quantifiedtrader.com/projects/us-mc-investem',
  },
  {
    name: 'US ML-Enhanced Portfolio Optimization',
    year: '2026',
    description:
      'ML-enhanced portfolio optimization on a 30-stock US panel: quarterly walk-forward backtests using mean-variance (MVO) with XGBoost return forecasts blended via Black-Litterman, evaluated against SPY with return, risk, and SPY-relative analytics.',
    technologies: ['MVO', 'XGBoost', 'Black-Litterman', 'SPY-relative risk', 'VaR/CVaR', 'Sector allocation'],
    link: 'https://quantifiedtrader.com/projects/us-mlpo',
  },
  {
    name: 'Momentum Rebalance Frequency Study',
    year: '2026',
    description:
      '12-1 momentum on US large caps across semi-annual, quarterly, monthly, and weekly rebalance cadences — turnover, net Sharpe, and implementation efficiency.',
    technologies: ['12-1 momentum', 'semi-annual', 'quarterly', 'monthly', 'weekly', 'turnover', 'cost scenarios'],
    link: 'https://quantifiedtrader.com/projects/momentum-rebalance-frequency',
  },
  {
    name: 'Cross-Sectional 12-1 Momentum in S&P 500',
    year: '2026',
    description:
      'Jegadeesh-Titman 12-1 momentum on US large caps: alpha persistence, regime dependence, crash risk, vol-managed overlays, factor decomposition, and ML crash prediction.',
    technologies: ['yfinance', 'decile sorts', 'CAPM/FF/Carhart', 'regime', 'ML crashes'],
    link: 'https://quantifiedtrader.com/projects/us-momentum-12-1',
  },
  {
    name: 'Calendar Effects in US GICS Sector ETFs',
    year: '2026',
    description:
      'Empirical seasonality framework for eleven SPDR GICS sector ETFs vs SPY: calendar-month averages, cyclical vs defensive dispersion, benchmark-relative rotation, and exploratory inference.',
    technologies: ['yfinance', 'SPDR sector ETFs', 'calendar seasonality', 't-tests'],
    link: 'https://quantifiedtrader.com/projects/sector-seasonality-analysis',
  },
  {
    name: 'US Multi-Factor Risk & Return Model',
    year: '2026',
    description:
      'Value, Quality, and Momentum on a US large-cap panel with nonlinear spec tests, IC/quintile diagnostics, and return attribution.',
    technologies: ['Panel OLS', 'model selection', 'IC', 'quintiles', 'attribution'],
    link: 'https://quantifiedtrader.com/projects/us-factor-model',
  },
  {
    name: 'Fama-French Factor Lab',
    year: '2026',
    description:
      'Unified factor dashboard: US FF5 and Carhart momentum, multi-asset ETF panel, international sleeve comparison, volatility regimes, risk budgeting, sleeve attribution, SPY research grid, and q-factor extension notes.',
    technologies: ['Python', 'pandas', 'linear factor models', 'Ken French data', 'yfinance'],
    link: 'https://quantifiedtrader.com/projects/fama-french-factor-lab',
  },
  {
    name: 'Yield Curve Intelligence',
    year: '2026',
    description:
      'Yield-curve research project built from yfinance market data: Nelson-Siegel fitting, slope/inversion diagnostics, and regime-aware risk context.',
    technologies: ['Python', 'yfinance', 'Nelson-Siegel', 'macro risk signals'],
    link: 'https://quantifiedtrader.com/projects/yield-curve-intelligence',
  },
  {
    name: 'Fundamental Stock Analysis',
    year: '2026',
    description:
      'US large-cap fundamental analytics dashboard with deep cross-sectional ranking, distribution diagnostics, sector structure, risk/return mapping, and multi-factor composite interpretation.',
    technologies: ['Python', 'fundamental screening', 'interactive charts'],
    link: 'https://quantifiedtrader.com/projects/fundamental-stock-analysis',
  },
  {
    name: 'Optimal Execution with RL Agent (DQN)',
    year: '2026',
    description:
      'Deep Q-Learning execution agent for slicing large orders under microstructure-style market impact. Compared against TWAP, passive, aggressive, and random baselines.',
    technologies: ['Python', 'Gymnasium', 'Stable-Baselines3', 'execution simulation'],
    link: 'https://quantifiedtrader.com/projects/optimal-execution-rl-agent',
  },
  {
    name: 'Statistical Analysis of Trading Strategies',
    year: '2026',
    description:
      "Research guide to rigorous backtesting, overfitting detection, and data-snooping correction — White's RC, Hansen SPA, PBO, CPCV, DSR, and Monte Carlo validation.",
    technologies: ['Research', 'statistical validation', 'backtesting methodology'],
    link: 'https://quantifiedtrader.com/projects/statistical-analysis-trading-strategies',
  },
  {
    name: 'Risk Reports & Stop / Take-Profit Analysis',
    year: '2026',
    description:
      'Interactive risk-return maps for 71 equity index strategies and 54 options ETF backtests, plus a stop-loss / take-profit sensitivity lab on ^GSPC.',
    technologies: ['Recharts', 'backtest aggregation', 'SL/TP experiment'],
    link: 'https://quantifiedtrader.com/projects/risk-reports-stop-take-profit',
  },
  {
    name: 'Stock Sentiment Tracker',
    year: '2025',
    description:
      'US equity sentiment tracker using VADER lexical analysis on financial news headlines. Tracks prices, sentiment scores, and correlations for S&P 500 stocks. Updated daily.',
    technologies: ['Python', 'VADER', 'NLP', 'financial news APIs'],
    link: 'https://quantifiedtrader.com/projects/stock-sentiment-tracker',
  },
  {
    name: 'Market Regime Detection Using Gaussian Models',
    year: '2025',
    description:
      'Comprehensive market regime identification across 21 global indices using Gaussian Mixture Models (GMM) and Greedy Gaussian Segmentation (GSS). Detects bull, bear, and transition regimes for adaptive portfolio management.',
    technologies: ['Python', 'GMM', 'GSS', 'regime detection'],
    link: 'https://quantifiedtrader.com/projects/market-regime-detection',
  },
  {
    name: 'Adaptive Portfolio Strategies: Sequential Allocation Methods',
    year: '2025',
    description:
      'Comprehensive analysis of 14 sequential portfolio allocation strategies on diversified ETF portfolio. Includes momentum-based, reversion-based, and pattern-learning approaches with transaction cost analysis.',
    technologies: ['Python', 'sequential optimization', 'backtesting'],
    link: 'https://quantifiedtrader.com/projects/adaptive-portfolio-strategies',
  },
  {
    name: 'Relative Rotation Graph (RRG) — US Equity',
    year: '2025',
    description: 'Dynamic RRG for US stocks vs S&P 500. JdK RS-Ratio and RS-Momentum with animation.',
    technologies: ['Python', 'yfinance', 'Recharts'],
    link: 'https://quantifiedtrader.com/projects/rrg-us-equity',
  },
  {
    name: 'Diversified Stock Portfolio Using Clustering Analysis',
    year: '2024',
    description:
      'S&P 500 portfolio construction using K-means clustering on risk/return features (correlation, beta, returns, volatility, Sharpe ratio). Backtested vs index.',
    technologies: ['Python', 'K-means', 'backtesting'],
    link: 'https://quantifiedtrader.com/projects/diversified-stock-portfolio-clustering',
  },
]

const indiaProjects: Omit<QuantifiedTraderProject, 'id' | 'region'>[] = [
  {
    name: 'Nifty 50 ML-Enhanced Portfolio Optimization',
    year: '2026',
    description:
      'Mean-variance and machine-learning return views blended via Black-Litterman on Nifty 50: walk-forward backtest versus cap-weight and the index, with sector allocation and cross-sectional signals.',
    technologies: ['India', 'Nifty 50', 'Black-Litterman', 'ML', 'walk-forward'],
    link: 'https://quantifiedtrader.com/india/portfolio-optimization',
  },
  {
    name: 'Nifty 50 Discounted Cash Flow Valuation',
    year: '2026',
    description:
      'Discounted cash flow valuation for every Nifty 50 name: shared India macro assumptions, WACC, terminal value, and model upside versus market price.',
    technologies: ['India', 'Nifty 50', 'DCF', 'WACC', 'valuation'],
    link: 'https://quantifiedtrader.com/india/dcf-valuation',
  },
  {
    name: 'Nifty 50 Multi-Factor Risk Model & Sector-Neutral Optimization',
    year: '2026',
    description:
      'Research report: daily style and sector risk factors on Nifty 50, rolling WLS covariance, and monthly sector-neutral long-only optimization with turnover costs.',
    technologies: ['India', 'Nifty 50', 'multi-factor', 'sector-neutral', 'WLS'],
    link: 'https://quantifiedtrader.com/india/risk-portfolio',
  },
  {
    name: 'Nifty 50 Alpha101 Selection & Composite Factor Research',
    year: '2026',
    description:
      'Formulaic alphas on Nifty 50: cross-sectional cleaning, IC screening, linear and machine-learning composites, and quintile backtests — full research report with interactive charts.',
    technologies: ['India', 'Nifty 50', 'Alpha101', 'IC screening', 'quintile backtests'],
    link: 'https://quantifiedtrader.com/india/alpha101-selection',
  },
  {
    name: 'Nifty 50 Value-Momentum-Size Long-Short Strategy',
    year: '2026',
    description:
      'Nifty 50 Value, Momentum, and Size: Fama–MacBeth premia, IC/IR, and a 20%/20% long–short backtest on NSE data via yfinance — with interactive performance charts.',
    technologies: ['India', 'Nifty 50', 'value', 'momentum', 'size', 'long-short'],
    link: 'https://quantifiedtrader.com/india/multi-factor-backtest',
  },
  {
    name: 'NIFTY 50 Seasonal Analysis by Industry & SARIMA',
    year: '2026',
    description:
      'Report on NIFTY 50 calendar seasonality by industry: equal-weight sector baskets, cyclical vs defensive cycle spreads, benchmark-relative correlation, and SARIMA index diagnostics with full mathematical framework.',
    technologies: ['India', 'Nifty 50', 'seasonality', 'SARIMA', 'sector analysis'],
    link: 'https://quantifiedtrader.com/india/seasonal-analysis',
  },
  {
    name: 'India Six-Factor Premia, Attribution & Regime Analysis',
    year: '2026',
    description:
      'Six-factor study of Indian equities: long-run premia, Nifty style-index regressions, momentum crash risk, mutual-fund attribution, and whether quality pays in downturns — with interactive charts.',
    technologies: ['India', 'six-factor', 'premia', 'attribution', 'regime analysis'],
    link: 'https://quantifiedtrader.com/india/factor-analysis',
  },
]

export const quantifiedTraderProjects: QuantifiedTraderProject[] = [
  ...globalProjects.map((project, index) => ({
    ...project,
    id: index + 1,
    region: 'Global' as const,
  })),
  ...indiaProjects.map((project, index) => ({
    ...project,
    id: globalProjects.length + index + 1,
    region: 'India' as const,
  })),
]
