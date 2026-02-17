'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { usePosts } from '@/hooks/usePosts'
import { useCommits } from '@/hooks/useCommits'
import { useISTClock } from '@/hooks/useISTClock'
import ProjectsTab from '@/components/ProjectsTab'
import ExperienceTab from '@/components/ExperienceTab'
import EducationTab from '@/components/EducationTab'
import BlogsTab from '@/components/BlogsTab'
import RecentPostsSidebar from '@/components/RecentPostsSidebar'
import ThemeToggle from '@/components/ThemeToggle'
import RotatingText from '@/components/RotatingText'
import SocialLinks from '@/components/SocialLinks'
import GitHubContributionGraph from '@/components/GitHubContributionGraph'
import Image from 'next/image'

const tabs = [
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'blogs', label: 'Blogs' },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('projects')
  const currentYear = new Date().getFullYear()
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const { theme, toggleTheme } = useTheme()
  const { posts: topPosts } = usePosts(2)
  const { commits } = useCommits()
  const istTime = useISTClock()
  const [contributions2025, setContributions2025] = useState<number | null>(null)
  const [contributions2026, setContributions2026] = useState<number | null>(null)

  useEffect(() => {
    const handler2025 = (e: Event) => {
      setContributions2025((e as CustomEvent).detail)
    }
    const handler2026 = (e: Event) => {
      setContributions2026((e as CustomEvent).detail)
    }
    
    window.addEventListener('contributions-2025', handler2025)
    window.addEventListener('contributions-2026', handler2026)
    
    return () => {
      window.removeEventListener('contributions-2025', handler2025)
      window.removeEventListener('contributions-2026', handler2026)
    }
  }, [])

  const currentContributionCount = selectedYear === 2025 ? contributions2025 : contributions2026

  const showTab = (tabName: string) => {
    setActiveTab(tabName)
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
      case 'blogs':
        return <BlogsTab />
      default:
        return <ProjectsTab />
    }
  }

  return (
    <main className="text-zinc-900 dark:text-zinc-100 max-w-7xl mx-auto px-4 py-10 flex flex-col overflow-x-hidden bg-white dark:bg-zinc-900 min-h-screen">
      {/* Mobile Overlay */}
      <div id="mobile-overlay" className="mobile-overlay hidden"></div>

      <div className="flex gap-12 flex-1 flex-col lg:flex-row lg:items-stretch">
        {/* Left Sidebar */}
        <div className="w-72 lg:flex-shrink-0 mb-8 lg:mb-0 flex flex-col bg-zinc-50 dark:bg-zinc-800/30 lg:p-4 lg:rounded-lg">
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

          {/* Single Column Layout: Image → Name → Social Icons → Location + Animation → Time → Headline → Description */}
          <div className="lg:hidden text-center mb-4">
            {/* Name */}
            <h1 className="text-xl font-medium tracking-tight mb-3">Paras Parkash</h1>

            {/* Social Icons */}
            <div className="mb-3">
              <SocialLinks variant="mobile" />
            </div>

            {/* Location + Building/Testing/Merging Animation */}
            <div className="flex flex-col items-center gap-2 mb-2">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Gurugram, Haryana
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-blink"></div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-bold">
                  <RotatingText items={['building', 'testing', 'merging']} />
                </p>
              </div>
            </div>

            {/* Time */}
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal mb-3">
              {istTime}
            </p>

            {/* Headline Text (removed "About Me" heading) */}
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-3 text-justify">
              Developing Quantitative Models for Hedging using Derivatives leveraging Agentic AI for Risk Management and Market Screening
            </p>

            {/* Description Text */}
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-4 text-justify">
              Proficient in developing and implementing profitable High-Frequency Trading (HFT) and Medium-Frequency Trading (MFT) strategies, as well as portfolio construction, while incorporating ML/AI techniques for high accuracy. Proven ability to leverage advanced statistical methods, low-latency systems, and performance optimization for alpha generation and risk management.
            </p>
          </div>

          {/* Separator for single column layout */}
          <div className="lg:hidden border-b border-zinc-200 dark:border-zinc-700 mb-4"></div>

          {/* About Me Section - Desktop only */}
          <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-100 hidden lg:block">About Me</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2 text-justify hidden lg:block">
            Proficient in developing and implementing profitable High-Frequency Trading (HFT) and Medium-Frequency Trading (MFT) strategies, as well as portfolio construction, while incorporating ML/AI techniques for high accuracy. Proven ability to leverage advanced statistical methods, low-latency systems, and performance optimization for alpha generation and risk management.
          </p>

          <div className="space-y-2 mb-1">
            <div className="flex items-center text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">Gurugram, Haryana, India</span>
            </div>
          </div>

          <div className="border-b border-zinc-200 dark:border-zinc-700 mb-4"></div>

          {/* Current Project Section */}
          <div className="mb-1">
            <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">Building @DelQuant</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 text-justify">Local AI agent-based trading platform with advanced automation and intelligent strategy execution</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 text-xs bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300 rounded">Rust</span>
              <span className="px-2 py-1 text-xs bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300 rounded">Electron</span>
              <span className="px-2 py-1 text-xs bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 rounded">AI Agents</span>
              <span className="px-2 py-1 text-xs bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 rounded">Trading Platform</span>
            </div>
          </div>

          <div className="border-b border-zinc-200 dark:border-zinc-700 mb-4"></div>

        {/* Current Company Section */}
        <div className="mb-1">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">Working as</span> Quant Researcher
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">@QuantEdX Research • 2023 - Present</p>
        </div>

        <div className="border-b border-zinc-200 dark:border-zinc-700 mb-4"></div>

        {/* Recent Commits Section */}
        {commits.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3">Recent Commits</h4>
            <div className="space-y-2">
              {commits.slice(0, 4).map((commit) => (
                <a
                  key={commit.sha}
                  href={commit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group hover:translate-x-1 transition-all duration-300 ease-out"
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors line-clamp-2">
                        {commit.message}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                        <span className="font-mono text-[10px]">{commit.sha}</span>
                        <span>•</span>
                        <span className="text-[10px]">
                          {new Date(commit.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="border-b border-zinc-200 dark:border-zinc-700 mb-4"></div>

      </div>

        {/* Center Content Area */}
        <div className="flex-1 flex flex-col min-h-full">
          {/* Header Section - Responsive layout */}
          <div className="animate-fade-in flex-shrink-0">
            <section className="mb-6">
              {/* Mobile: Show only description above tabs, name/location/icons are in sidebar */}
              <div className="hidden md:block animate-fade-in animate-delay-200">
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <h1 className="text-2xl font-medium tracking-tight">
                    Paras Parkash
                  </h1>
                  <div className="flex items-center gap-4">
                    <SocialLinks />
                    <ThemeToggle />
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Gurugram, Haryana
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">
                    {istTime}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-blink"></div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-bold">
                      <RotatingText items={['Open to Opportunities', 'deploying', 'merging', 'building', 'testing']} />
                    </p>
                  </div>
                </div>
              </div>

              <div className="animate-fade-in animate-delay-300">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mb-4 text-justify">
                  Developing Quantitative Models for Hedging using Derivatives leveraging Agentic AI for Risk Management and Market Screening
                </p>
              </div>
            </section>
          </div>

          {/* GitHub Contributions */}
          <section className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-baseline gap-3">
                <h3 className="text-md font-medium">GitHub Contributions</h3>
                {currentContributionCount !== null && (
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {currentContributionCount} total in {selectedYear}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedYear(2025)}
                  className={`px-3 py-1 text-xs rounded transition-all duration-300 ${
                    selectedYear === 2025
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium'
                      : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  2025
                </button>
                <button
                  onClick={() => setSelectedYear(2026)}
                  className={`px-3 py-1 text-xs rounded transition-all duration-300 ${
                    selectedYear === 2026
                      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium'
                      : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  2026
                </button>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${selectedYear === 2026 ? 100 : 0}%)` }}
              >
                <div className="w-full flex-shrink-0">
                  <a href={`https://github.com/parasxparkash?tab=overview&from=2025-01-01&to=2025-12-31`} target="_blank" rel="noopener noreferrer" className="block">
                    <GitHubContributionGraph year={2025} />
                  </a>
                </div>
                <div className="w-full flex-shrink-0">
                  <a href={`https://github.com/parasxparkash?tab=overview&from=2026-01-01&to=2026-12-31`} target="_blank" rel="noopener noreferrer" className="block">
                    <GitHubContributionGraph year={2026} />
                  </a>
                </div>
              </div>
            </div>
          </section>



          {/* Tabs Section - Scrollable */}
          <div className="flex-1 overflow-y-auto min-h-0">
           <div className="animate-fade-in animate-delay-200 sticky top-0 bg-white dark:bg-zinc-900 z-10">
             <div className="text-muted-foreground inline-flex h-9 w-full items-center justify-start rounded-lg mb-1 border-none bg-transparent p-0 overflow-x-auto scrollbar-hide">
               {tabs.map((tab) => (
                 <button
                   key={tab.id}
                   onClick={() => showTab(tab.id)}
                   type="button"
                  className={`tab-button inline-flex h-[calc(100%-1px)] items-center justify-start gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm whitespace-nowrap !bg-transparent !border-none !shadow-none transition-all duration-300 ease-out ${
                    activeTab === tab.id
                      ? '!text-zinc-900 dark:!text-zinc-100'
                      : '!text-zinc-600 dark:!text-zinc-400'
                  }`}
                   id={`tab-${tab.id}`}
                 >
                   {tab.label}
                 </button>
               ))}
              </div>
              {/* Demarcating Line - Just below tab items with small gap */}
              <div className="border-b border-zinc-200 dark:border-zinc-700 mb-4"></div>
            </div>

            {/* Tab Content - Left aligned with minimal padding */}
            <div className="pl-2 pb-12">
              {renderTabContent()}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Hidden on tablet (md), visible on desktop (lg+) */}
        <div className="hidden xl:block">
          <RecentPostsSidebar topPosts={topPosts} />
        </div>
      </div>
    </main>
  )
}