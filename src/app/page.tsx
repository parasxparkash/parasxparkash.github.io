'use client'

import { useState, useEffect } from 'react'
import ProjectsTab from '@/components/ProjectsTab'
import ExperienceTab from '@/components/ExperienceTab'
import EducationTab from '@/components/EducationTab'
import ToolsTab from '@/components/ToolsTab'
import BlogsTab from '@/components/BlogsTab'
import BooksTab from '@/components/BooksTab'
import RecentPostsSidebar from '@/components/RecentPostsSidebar'
import ThemeToggle from '@/components/ThemeToggle'
import Image from 'next/image'

const tabs = [
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'tools', label: 'Tools' },
  { id: 'blogs', label: 'Blogs' },
  { id: 'books', label: 'Books' },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('projects')
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light'
    }
    return 'light'
  })
  const [topPosts, setTopPosts] = useState<Array<{ id: string; title: string }>>([])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', newTheme)
  }

  const showTab = (tabName: string) => {
    setActiveTab(tabName)
    // Reset scroll position to top
    const tabContainer = document.querySelector('.flex-1.overflow-y-auto')
    if (tabContainer) {
      tabContainer.scrollTop = 0
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'projects':
        return <ProjectsTab />
      case 'experience':
        return <ExperienceTab />
      case 'education':
        return <EducationTab />
      case 'tools':
        return <ToolsTab />
      case 'blogs':
        return <BlogsTab />
      case 'books':
        return <BooksTab />
      default:
        return <ProjectsTab />
    }
  }


  // Theme management and other client-side functionality
  useEffect(() => {
    const initTheme = () => {
      const savedTheme = localStorage.getItem('theme')
      // Default to light theme if no saved preference
      const shouldUseDark = savedTheme === 'dark'

      if (shouldUseDark) {
        document.documentElement.classList.add('dark')
        updateThemeIcons(true)
      } else {
        document.documentElement.classList.remove('dark')
        updateThemeIcons(false)
      }
    }

    const updateThemeIcons = (isDark: boolean) => {
      const sunIcon = document.getElementById('sidebar-sun-icon')
      const moonIcon = document.getElementById('sidebar-moon-icon')

      if (sunIcon && moonIcon) {
        if (isDark) {
          sunIcon.classList.remove('hidden')
          sunIcon.classList.add('block')
          moonIcon.classList.add('hidden')
          moonIcon.classList.remove('block')
        } else {
          sunIcon.classList.add('hidden')
          sunIcon.classList.remove('block')
          moonIcon.classList.remove('hidden')
          moonIcon.classList.add('block')
        }
      }
    }

    const toggleTheme = () => {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
        updateThemeIcons(false)
      } else {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
        updateThemeIcons(true)
      }
    }

    // Initialize theme
    initTheme()

    // Initialize first tab
    showTab('projects')

    // Fetch top posts from static JSON
    const fetchTopPosts = async () => {
      try {
        const response = await fetch('/posts.json')
        const posts = await response.json()
        setTopPosts(posts.slice(0, 3))
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    fetchTopPosts()

    // Setup theme toggle
    const themeToggle = document.getElementById('sidebar-theme-toggle')
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme)
    }

    // Theme initialization - no longer listening to system preference

    // IST Clock functionality
    const updateISTClock = () => {
      const now = new Date()
      const istTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}))

      const timeString = istTime.toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
      })

      const dayString = istTime.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      })

      const clockElements = document.querySelectorAll('#ist-clock, #ist-clock-mobile')
      clockElements.forEach(element => {
        if (element) {
          element.textContent = `${dayString}, ${timeString} IST`
        }
      })
    }

    // Start IST clock - update every second
    updateISTClock()
    let clockInterval = setInterval(updateISTClock, 1000)
    
    // Pause clock updates when tab is hidden to save resources
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(clockInterval)
      } else {
        updateISTClock()
        clockInterval = setInterval(updateISTClock, 1000)
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // User info detection
    const updateUserInfo = async () => {
      const userAgent = navigator.userAgent
      let os = 'Unknown OS'
      let browser = 'Unknown Browser'

      if (userAgent.indexOf('Win') !== -1) os = 'Windows'
      else if (userAgent.indexOf('Mac') !== -1) os = 'macOS'
      else if (userAgent.indexOf('Linux') !== -1) os = 'Linux'
      else if (userAgent.indexOf('Android') !== -1) os = 'Android'
      else if (userAgent.indexOf('iPhone') !== -1 || userAgent.indexOf('iPad') !== -1) os = 'iOS'

      if (userAgent.indexOf('Chrome') !== -1 && userAgent.indexOf('Edg') === -1) browser = 'Chrome'
      else if (userAgent.indexOf('Firefox') !== -1) browser = 'Firefox'
      else if (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1) browser = 'Safari'
      else if (userAgent.indexOf('Edg') !== -1) browser = 'Edge'
      else if (userAgent.indexOf('Opera') !== -1) browser = 'Opera'

      const screenRes = `${screen.width}x${screen.height}`
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      const line = ` ${os} • ${browser} • ${screenRes} • ${timezone}`

      const userInfoElement = document.getElementById('user-info')
      if (userInfoElement) {
        userInfoElement.textContent = line
      }
    }

    // Update user info immediately, no delay
    updateUserInfo()

    // Initialize animations - use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      const animatedElements = document.querySelectorAll('.opacity-0')
      animatedElements.forEach(el => {
        el.classList.remove('opacity-0')
        if (el.classList.contains('transform')) {
          el.classList.remove('transform')
        }
        if (el.classList.contains('transform-x')) {
          el.classList.remove('transform-x')
        }
      })
    })

    return () => {
      clearInterval(clockInterval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <main className="text-zinc-900 dark:text-zinc-100 max-w-7xl mx-auto px-4 py-10 flex flex-col overflow-x-hidden bg-white dark:bg-zinc-900 min-h-screen">
      {/* Mobile Overlay */}
      <div id="mobile-overlay" className="mobile-overlay hidden"></div>

      <div className="flex gap-12 flex-1 flex-col lg:flex-row">
        {/* Left Sidebar */}
        <div className="w-72 lg:flex-shrink-0 lg:sticky lg:top-4 lg:h-fit mb-8">
          {/* Profile Image */}
          <div className="mb-2 flex justify-center">
            <Image
              src="/assets/profile-optimized.webp"
              alt="Profile"
              width={160}
              height={160}
              className="w-40 h-40 rounded-full object-cover border-2 border-zinc-200 dark:border-zinc-700"
              priority={false}
            />
          </div>

          {/* Single Column Layout: Name, Location, Time, Status, Description, and Social Icons (below image) */}
          <div className="lg:hidden text-center mb-4">
            <h1 className="text-xl font-medium tracking-tight mb-3">Paras Parkash</h1>

            <div className="flex flex-col items-center gap-2 mb-3">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Mumbai, Maharashtra
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal" id="ist-clock-mobile">
              </p>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Open to Opportunities</p>
              </div>
            </div>

            {/* Mobile Description */}
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-4 text-justify">
              Developing Quantitative Models for Hedging using Derivatives leveraging Agentic AI for Risk Management and Market Screening
            </p>

            {/* Mobile Social Icons - Icons only, no labels */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {/* GitHub */}
              <a target="_blank" className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all text-zinc-700 dark:text-zinc-300 hover:text-[#24292e] dark:hover:text-white" href="https://github.com/parasxparkash">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a target="_blank" className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all text-zinc-700 dark:text-zinc-300 hover:text-[#0077B5]" href="https://linkedin.com/in/parasxparkash">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* Twitter/X */}
              <a target="_blank" className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all text-zinc-700 dark:text-zinc-300 hover:text-[#1DA1F2]" href="https://twitter.com/parasxparkash">
                <svg width="20" height="20" viewBox="0 0 512 512" fill="currentColor" className="h-5 w-5">
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                </svg>
              </a>

              {/* Email */}
              <a target="_blank" className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all text-zinc-700 dark:text-zinc-300 hover:text-[#EA4335]" href="mailto:parasxparkash@gmail.com">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="m4 4 16 0 0 16-16 0z"></path>
                  <path d="m4 4 8 8 8-8"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Separator for single column layout */}
          <div className="lg:hidden border-b border-zinc-200 dark:border-zinc-700 mb-4"></div>

          {/* About Me Section */}
          <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-100 hidden lg:block">About Me</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2 text-justify">
            Proficient in developing and implementing profitable High-Frequency Trading (HFT) and Medium-Frequency Trading (MFT) strategies, as well as portfolio construction, while incorporating ML/AI techniques for high accuracy. Proven ability to leverage advanced statistical methods, low-latency systems, and performance optimization for alpha generation and risk management.
          </p>

          <div className="space-y-2 mb-1">
            <div className="flex items-center text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">Mumbai, Maharashtra, India</span>
            </div>
          </div>

          <div className="border-b border-zinc-200 dark:border-zinc-700 mb-4"></div>

          {/* Current Project Section */}
          <div className="mb-1">
            <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">Building @QuantCraft</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 text-justify">Advanced HFT/MFT trading strategies with ML/AI integration for alpha generation and risk management</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded">Python/C++</span>
              <span className="px-2 py-1 text-xs bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 rounded">ML/AI</span>
              <span className="px-2 py-1 text-xs bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 rounded">HFT Systems</span>
            </div>
          </div>

          <div className="border-b border-zinc-200 dark:border-zinc-700 mb-4"></div>

        {/* Current Company Section */}
        <div className="mb-1">
          <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">Working as</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Quant Researcher</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">@QuantEdX Research • 2023 - Present</p>
        </div>

        <div className="border-b border-zinc-200 dark:border-zinc-700 mb-4"></div>

        {/* Top Posts Section */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3">Top Posts</h4>
          <div className="space-y-2">
            {topPosts.length > 0 ? (
              topPosts.map((post) => (
                <a key={post.id} href={`/posts/${post.id}`} className="block text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  {post.title}
                </a>
              ))
            ) : (
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading posts...</p>
            )}
          </div>
        </div>

        <div className="border-b border-zinc-200 dark:border-zinc-700 mb-4"></div>
      </div>

        {/* Center Content Area */}
        <div className="flex-1 flex flex-col lg:h-screen">
          {/* Header Section - Responsive layout */}
          <div className="opacity-0 transform animate-fade-in flex-shrink-0">
            <section className="mb-6">
              {/* Mobile: Show only description above tabs, name/location/icons are in sidebar */}
              <div className="hidden md:block opacity-0 transform animate-fade-in animate-delay-200">
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <h1 className="text-2xl font-medium tracking-tight">
                    Paras Parkash
                  </h1>
                  <ThemeToggle />
                </div>
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

          {/* GitHub Contributions */}
          <section className="mb-8">
            <h3 className="text-md font-medium mb-3">GitHub Contributions - 2025</h3>
            <a href="https://github.com/parasxparkash" target="_blank" rel="noopener noreferrer" className="block">
              <Image
                src="https://ghchart.rshah.org/parasxparkash?year=2025&size=large"
                alt="GitHub contributions chart for parasxparkash"
                width={800}
                height={200}
                className="w-full rounded"
                unoptimized
              />
            </a>
          </section>


          {/* Tabs Section - Scrollable */}
          <div className="flex-1 overflow-y-auto min-h-0">
           <div className="opacity-0 transform animate-fade-in animate-delay-200 sticky top-0 bg-white dark:bg-zinc-900 z-10">
             <div className="text-muted-foreground inline-flex h-9 w-full items-center justify-start rounded-lg mb-2 md:mb-4 border-none bg-transparent p-0 overflow-x-auto scrollbar-hide">
               {tabs.map((tab) => (
                 <button
                   key={tab.id}
                   onClick={() => showTab(tab.id)}
                   type="button"
                   className={`tab-button inline-flex h-[calc(100%-1px)] flex-1 min-w-0 items-center justify-center gap-1.5 rounded-md border border-transparent px-3 py-1 text-sm font-medium whitespace-nowrap !bg-transparent !border-none !shadow-none !font-light transition-all duration-300 ease-out ${
                     activeTab === tab.id
                       ? '!font-bold !text-zinc-900 dark:!text-zinc-100'
                       : '!text-zinc-600 dark:!text-zinc-400'
                   }`}
                   id={`tab-${tab.id}`}
                 >
                   {tab.label}
                 </button>
               ))}
              </div>
              {/* Demarcating Line - Just below tab items with small gap */}
              <div className="border-b border-zinc-200 dark:border-zinc-700 mt-1 mb-4 md:mb-8"></div>
            </div>

            {/* Tab Content - Added padding to fix content being hidden on left */}
            <div className="pl-4 md:pl-6">
              {renderTabContent()}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <RecentPostsSidebar />
      </div>
    </main>
  )
}