export default function EducationTab() {
  return (
    <section className="mb-12">
      <div className="space-y-8">
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100">Education</h3>
          <div className="space-y-8">
            <ul className="space-y-8">
              <div className="transform-x animate-slide-left animate-delay-400">
                <li className="group">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-md font-medium">Master of Science in Financial Engineering</h3>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">2022 - 2024</span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-1">WorldQuant University</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 text-justify">Advanced studies in quantitative finance, derivatives pricing, risk management, and algorithmic trading strategies. Focus on mathematical modeling, statistical analysis, and computational finance applications.</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded">Quantitative Finance</span>
                    <span className="px-2 py-1 text-xs bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 rounded">Derivatives Pricing</span>
                    <span className="px-2 py-1 text-xs bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 rounded">Risk Management</span>
                    <span className="px-2 py-1 text-xs bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300 rounded">Algorithmic Trading</span>
                  </div>
                </li>
              </div>

              <div className="transform-x animate-slide-left animate-delay-500">
                <li className="group">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-md font-medium">Masters in Science, Mathematics</h3>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">2021 - 2023</span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-1">Lovely Professional University</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 text-justify">Advanced mathematical studies with focus on applied mathematics, statistical analysis, and mathematical modeling. Final thesis pending completion.</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 text-xs bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300 rounded">Applied Mathematics</span>
                    <span className="px-2 py-1 text-xs bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300 rounded">Statistical Analysis</span>
                    <span className="px-2 py-1 text-xs bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-purple-300 rounded">Mathematical Modeling</span>
                  </div>
                </li>
              </div>

              <div className="transform-x animate-slide-left animate-delay-600">
                <li className="group">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-md font-medium">Post Graduate Diploma in Finance</h3>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">2019 - 2020</span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-1">Birla Institute of Technology and Science, Pilani</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 text-justify">Comprehensive finance education covering corporate finance, investment analysis, financial markets, and portfolio management. Strong foundation in financial theory and practical applications.</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300 rounded">Corporate Finance</span>
                    <span className="px-2 py-1 text-xs bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300 rounded">Investment Analysis</span>
                    <span className="px-2 py-1 text-xs bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300 rounded">Portfolio Management</span>
                  </div>
                </li>
              </div>

              <div className="transform-x animate-slide-left animate-delay-700">
                <li className="group">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-md font-medium">Bachelor of Technology, Mechanical</h3>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">2009 - 2013</span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-1">National Institute of Technology, Jalandhar</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 text-justify">Comprehensive mechanical engineering education with focus on systems design, control systems, and automation. Strong foundation in engineering principles, mathematics, and problem-solving methodologies.</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 text-xs bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300 rounded">Mechanical Systems</span>
                    <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded">Control Systems</span>
                    <span className="px-2 py-1 text-xs bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 rounded">Automation</span>
                    <span className="px-2 py-1 text-xs bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 rounded">Engineering Design</span>
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}