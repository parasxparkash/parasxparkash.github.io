export default function Header() {
  return (
    <div className="opacity-0 transform animate-fade-in flex-shrink-0">
      <section className="mb-6">
        {/* Mobile: Show only description above tabs, name/location/icons are in sidebar */}
        <div className="hidden md:block opacity-0 transform animate-fade-in animate-delay-200">
          <h1 className="text-2xl font-medium tracking-tight mb-4">
            Paras Parkash
          </h1>
          <div className="flex items-center gap-3 mb-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Mumbai, Maharashtra
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal" id="ist-clock">
            </p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Open to Opportunities</p>
            </div>
          </div>
        </div>

        <div className="opacity-0 transform animate-fade-in animate-delay-300">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mb-4 text-justify">
            Developing Quantitative Models for Hedging using Derivatives leveraging Agentic AI for Risk Management and Market Screening
          </p>
        </div>

        {/* Desktop: Show social icons */}
        <div className="hidden md:block opacity-0 transform animate-fade-in animate-delay-600">
          <div className="flex items-center gap-5">
            <div className="flex flex-row gap-4">
              {/* GitHub */}
              <a target="_blank" className="github-icon overflow-hidden transition-all text-zinc-900/60 dark:text-zinc-100/60 hover:text-[#24292e] dark:hover:text-white" href="https://github.com/parasxparkash">
                <span className="sr-only">github</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>

              {/* Twitter/X */}
              <a target="_blank" className="twitter-icon overflow-hidden transition-all text-zinc-900/60 dark:text-zinc-100/60 hover:text-[#1DA1F2]" href="https://twitter.com/parasxparkash">
                <span className="sr-only">twitter</span>
                <svg width="24" height="24" viewBox="0 0 512 512" fill="currentColor" className="h-6 w-6">
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a target="_blank" className="linkedin-icon overflow-hidden transition-all text-zinc-900/60 dark:text-zinc-100/60 hover:text-[#0077B5]" href="https://linkedin.com/in/parasxparkash">
                <span className="sr-only">linkedin</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* Email */}
              <a target="_blank" className="email-icon overflow-hidden transition-all text-zinc-900/60 dark:text-zinc-100/60 hover:text-[#EA4335]" href="mailto:parasxparkash@gmail.com">
                <span className="sr-only">email</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                  <path d="m4 4 16 0 0 16-16 0z"></path>
                  <path d="m4 4 8 8 8-8"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}