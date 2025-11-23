export default function BooksTab() {
  return (
    <section className="mb-12">
      <div className="space-y-8">
        <ul className="space-y-8">
          <div className="transform-x animate-slide-left animate-delay-100">
            <li className="group hover:translate-x-1 transition-all duration-300 ease-out">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-md font-medium">Algebra</h3>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Serge Lang</span>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 text-justify">A comprehensive foundational text in algebra covering groups, rings, and fields.</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded">Abstract Algebra</span>
              </div>
            </li>
          </div>

          <div className="transform-x animate-slide-left animate-delay-200">
            <li className="group hover:translate-x-1 transition-all duration-300 ease-out">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-md font-medium">Options, Futures, and Other Derivatives</h3>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">John C. Hull</span>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 text-justify">Gold standard textbook in quantitative finance covering derivatives, options pricing, and risk management.</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 text-xs bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300 rounded">Finance</span>
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded">Derivatives</span>
              </div>
            </li>
          </div>

          <div className="transform-x animate-slide-left animate-delay-300">
            <li className="group hover:translate-x-1 transition-all duration-300 ease-out">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-md font-medium">Stochastic Calculus for Finance II</h3>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Steven Shreve</span>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 text-justify">Graduate-level introduction to Itô calculus, Black–Scholes models, and continuous finance.</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 text-xs bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300 rounded">Itô Calculus</span>
                <span className="px-2 py-1 text-xs bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300 rounded">Quant Finance</span>
              </div>
            </li>
          </div>

          <div className="transform-x animate-slide-left animate-delay-400">
            <li className="group hover:translate-x-1 transition-all duration-300 ease-out">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-md font-medium">Abstract Algebra</h3>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Dummit & Foote</span>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 text-justify">Standard graduate-level introduction to group theory, rings, and modules.</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded">Algebra</span>
                <span className="px-2 py-1 text-xs bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300 rounded">Mathematics</span>
              </div>
            </li>
          </div>

          <div className="transform-x animate-slide-left animate-delay-500">
            <li className="group hover:translate-x-1 transition-all duration-300 ease-out">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-md font-medium">Paul Wilmott Introduces Quantitative Finance</h3>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Paul Wilmott</span>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 text-justify">A practical introduction to advanced quantitative finance for practitioners and students.</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 text-xs bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300 rounded">Quant Finance</span>
                <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded">Mathematics</span>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </section>
  )
}