export default function ToolsTab() {
  return (
    <section className="mb-12">
      <div className="space-y-6">
        <div className="transform-x animate-slide-left animate-delay-1200">
          <h4 className="text-md font-medium mb-3">Programming Languages</h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 rounded">Python</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">C++</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">R</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">MATLAB</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">SQL</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">JavaScript</span>
          </div>
        </div>

        <div className="transform-x animate-slide-left animate-delay-1300">
          <h4 className="text-md font-medium mb-3">Quantitative Finance</h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">Pandas</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">NumPy</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">SciPy</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">QuantLib</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">Zipline</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">Backtrader</span>
          </div>
        </div>

        <div className="transform-x animate-slide-left animate-delay-1400">
          <h4 className="text-md font-medium mb-3">Machine Learning & AI</h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">Scikit-learn</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">TensorFlow</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">PyTorch</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">XGBoost</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">LightGBM</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">Keras</span>
          </div>
        </div>

        <div className="transform-x animate-slide-left animate-delay-1500">
          <h4 className="text-md font-medium mb-3">Data & Analytics</h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">Jupyter</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">Tableau</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">Power BI</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">Apache Spark</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">Kafka</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">Redis</span>
          </div>
        </div>

        <div className="transform-x animate-slide-left animate-delay-1600">
          <h4 className="text-md font-medium mb-3">Trading & Market Data</h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">Interactive Brokers API</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">Bloomberg API</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">Yahoo Finance</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">Alpha Vantage</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">Quandl</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">CCXT</span>
          </div>
        </div>

        <div className="transform-x animate-slide-left animate-delay-1700">
          <h4 className="text-md font-medium mb-3">Cloud & Infrastructure</h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">AWS</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">Docker</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">Kubernetes</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">Git</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">Linux</span>
            <span className="px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-800 rounded">Bash</span>
          </div>
        </div>
      </div>
    </section>
  )
}