import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import ThemeToggle from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: 'About Me - Paras Parkash',
  description: 'Learn more about Paras Parkash - Quantitative Researcher and Financial Engineer',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-700">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            ← Back to Home
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Profile Section */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <Image
              src="/assets/profile-optimized.webp"
              alt="Paras Parkash"
              width={180}
              height={180}
              className="rounded-full border-4 border-zinc-200 dark:border-zinc-700"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold mb-3 tracking-tight">Paras Parkash</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-2">
            Quantitative Researcher @ QuantEdX Research
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
            Based in Hyderabad / Delhi • Open to opportunities worldwide
          </p>
          <a 
            href="mailto:parasparkash@quantedx.com"
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            parasparkash@quantedx.com
          </a>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 text-justify mb-4">
            I&apos;m a quantitative researcher specializing in derivatives pricing, risk management, and AI-powered financial models. 
            My work focuses on developing and implementing profitable High-Frequency Trading (HFT) and Medium-Frequency Trading (MFT) 
            strategies, portfolio construction, and advanced volatility modeling using GARCH, Heston, and higher-order frameworks.
          </p>
          <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 text-justify">
            I leverage advanced statistical methods, low-latency systems, and performance optimization for alpha generation and risk 
            management. My approach combines rigorous mathematical finance with modern machine learning to create practical, 
            production-ready trading systems.
          </p>
        </section>

        {/* Current Work */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100">Current Work</h2>
          <div className="bg-zinc-50 dark:bg-zinc-800/30 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-medium mb-2 text-zinc-900 dark:text-zinc-100">Building @QuantPype</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
              A local AI agent-based trading platform with advanced automation and intelligent strategy execution
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 text-xs bg-zinc-700 text-white dark:bg-zinc-400 dark:text-zinc-900 rounded">Rust</span>
              <span className="px-2 py-1 text-xs bg-zinc-700 text-white dark:bg-zinc-400 dark:text-zinc-900 rounded">Electron</span>
              <span className="px-2 py-1 text-xs bg-zinc-700 text-white dark:bg-zinc-400 dark:text-zinc-900 rounded">AI Agents</span>
              <span className="px-2 py-1 text-xs bg-zinc-700 text-white dark:bg-zinc-400 dark:text-zinc-900 rounded">Trading Platform</span>
            </div>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">Position:</span> Quantitative Researcher @ QuantEdX Research (2023 - Present)
          </p>
        </section>

        {/* Expertise */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100">Areas of Expertise</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3 text-zinc-900 dark:text-zinc-100">Quantitative Finance</h3>
              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li className="flex items-start">
                  <span className="mr-2 text-zinc-500">•</span>
                  <span>Derivatives pricing and hedging strategies</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-zinc-500">•</span>
                  <span>Risk management and portfolio optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-zinc-500">•</span>
                  <span>Volatility modeling (GARCH, Heston, rough volatility)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-zinc-500">•</span>
                  <span>Stochastic calculus and mathematical finance</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3 text-zinc-900 dark:text-zinc-100">Algorithmic Trading</h3>
              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li className="flex items-start">
                  <span className="mr-2 text-zinc-500">•</span>
                  <span>High-frequency trading (HFT) strategies</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-zinc-500">•</span>
                  <span>Medium-frequency trading (MFT) systems</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-zinc-500">•</span>
                  <span>Market making and optimal execution</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-zinc-500">•</span>
                  <span>Low-latency system design</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3 text-zinc-900 dark:text-zinc-100">Machine Learning & AI</h3>
              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li className="flex items-start">
                  <span className="mr-2 text-zinc-500">•</span>
                  <span>Deep reinforcement learning for trading</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-zinc-500">•</span>
                  <span>Agentic AI for risk management</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-zinc-500">•</span>
                  <span>Neural networks for price prediction</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-zinc-500">•</span>
                  <span>Statistical arbitrage models</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3 text-zinc-900 dark:text-zinc-100">Market Microstructure</h3>
              <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li className="flex items-start">
                  <span className="mr-2 text-zinc-500">•</span>
                  <span>Limit order book analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-zinc-500">•</span>
                  <span>Order flow and price impact studies</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-zinc-500">•</span>
                  <span>Asymmetric information analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-zinc-500">•</span>
                  <span>Market quality metrics</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100">Education</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-zinc-300 dark:border-zinc-600 pl-6">
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Master of Science in Financial Engineering</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">WorldQuant University • 2022 - 2024</p>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                Advanced studies in quantitative finance, derivatives pricing, risk management, and algorithmic trading strategies. 
                Focus on mathematical modeling, statistical analysis, and computational finance applications.
              </p>
            </div>
            <div className="border-l-4 border-zinc-300 dark:border-zinc-600 pl-6">
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Masters in Science, Mathematics</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Lovely Professional University • 2021 - 2023</p>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                Advanced mathematical studies with focus on applied mathematics, statistical analysis, and mathematical modeling.
              </p>
            </div>
            <div className="border-l-4 border-zinc-300 dark:border-zinc-600 pl-6">
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Post Graduate Diploma in Finance</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Birla Institute of Technology and Science, Pilani • 2019 - 2020</p>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                Comprehensive finance education covering corporate finance, investment analysis, financial markets, and portfolio management.
              </p>
            </div>
            <div className="border-l-4 border-zinc-300 dark:border-zinc-600 pl-6">
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Bachelor of Technology, Mechanical</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">National Institute of Technology, Jalandhar • 2009 - 2013</p>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                Engineering foundation with focus on systems design, control systems, and automation.
              </p>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100">Professional Experience</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-zinc-300 dark:border-zinc-600 pl-6">
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Quantitative Researcher | Educator</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">QuantEdX • Feb 2023 - Sep 2023</p>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-2">
                Developed and implemented advanced Machine Learning-based LFT/MFT models for enhanced trading strategies, 
                effectively leveraging statistical arbitrage and derivative pricing techniques. Conducted in-depth credit risk 
                analysis and led research in innovative quantitative models for derivative pricing.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 text-xs bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded">Machine Learning</span>
                <span className="px-2 py-1 text-xs bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded">Derivative Pricing</span>
                <span className="px-2 py-1 text-xs bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded">Risk Management</span>
              </div>
            </div>
            <div className="border-l-4 border-zinc-300 dark:border-zinc-600 pl-6">
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Section Engineer</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Jal Shakti Dept. PHE, Jammu & Kashmir • Jun 2016 - Aug 2022</p>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                Managed and maintained electro-mechanical systems for water pumping stations. Engineered and debugged control 
                logic for power machinery using microcontrollers (Arduino, Raspberry Pi, STM32) and chips (Intel 8051, PIC, ARM Cortex-M series).
              </p>
            </div>
            <div className="border-l-4 border-zinc-300 dark:border-zinc-600 pl-6">
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Assistant Manager</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Maruti Suzuki India Limited • Jul 2013 - Jul 2015</p>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                Experienced in automotive HVAC system design, development, and optimization. Designed, tested, and evaluated 
                HVAC systems using electronic control units (ECUs) with microprocessors and sensors.
              </p>
            </div>
          </div>
        </section>

        {/* Projects & Platforms */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100">Projects & Platforms</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="https://quantbuilt.com" target="_blank" rel="noopener noreferrer" 
               className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors">
              <h3 className="font-medium mb-2 text-zinc-900 dark:text-zinc-100">QuantBuilt</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Investment optimization platform for Indian users with portfolio analytics and risk management tools
              </p>
            </a>
            <a href="https://quantifiedtrader.com" target="_blank" rel="noopener noreferrer"
               className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors">
              <h3 className="font-medium mb-2 text-zinc-900 dark:text-zinc-100">QuantifiedTrader</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Blog platform for quantitative traders featuring strategy analysis and market microstructure research
              </p>
            </a>
            <a href="https://quantedx.com" target="_blank" rel="noopener noreferrer"
               className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors">
              <h3 className="font-medium mb-2 text-zinc-900 dark:text-zinc-100">QuantEdX</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Educational platform offering courses on quantitative finance and algorithmic trading
              </p>
            </a>
            <a href="https://parasxparkash.github.io/quantpype" target="_blank" rel="noopener noreferrer"
               className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors">
              <h3 className="font-medium mb-2 text-zinc-900 dark:text-zinc-100">QuantPype</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Self-hosted quant agents system for automated quantitative analysis and trading strategy development
              </p>
            </a>
          </div>
        </section>

        {/* Research Interests */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100">Current Research Interests</h2>
          <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
            <li className="flex items-start">
              <span className="mr-2 text-zinc-500">•</span>
              <span>Developing quantitative models for hedging using derivatives leveraging Agentic AI for risk management and market screening</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-zinc-500">•</span>
              <span>Deep reinforcement learning applications in market making and optimal execution</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-zinc-500">•</span>
              <span>Rough volatility models and their applications in derivatives pricing</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-zinc-500">•</span>
              <span>Limit order book dynamics and price impact analysis</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-zinc-500">•</span>
              <span>Asymmetric information and realized spread in electronic markets</span>
            </li>
          </ul>
        </section>

        {/* Get in Touch */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100">Get in Touch</h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
            I&apos;m always open to conversations about interesting technical challenges in quantitative finance, algorithmic trading, 
            or ML applications in financial markets. Feel free to reach out if you&apos;d like to discuss potential collaborations 
            or have questions about my work.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:parasparkash@quantedx.com" 
               className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Me
            </a>
            <a href="https://github.com/parasxparkash" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href="https://linkedin.com/in/parasxparkash" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-700 mt-12">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <p>© 2026 Paras Parkash. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
