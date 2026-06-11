'use client'

import { useState, useEffect, useRef } from 'react'
import { usePosts } from '@/hooks/usePosts'
import { useCommits } from '@/hooks/useCommits'
import { usePullRequests } from '@/hooks/usePullRequests'
import { useISTClock } from '@/hooks/useISTClock'
import ProjectsTab from '@/components/ProjectsTab'
import SaaSTab from '@/components/SaaSTab'
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
  { id: 'saas', label: 'SaaS' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'blogs', label: 'Blogs' },
]
const contributionYears = [2023, 2024, 2025, 2026] as const
type ContributionYear = (typeof contributionYears)[number]
const resourceLinks = [
  {
    label: 'Maths Notes',
    href: 'https://eigenotes.vercel.app',
    title: 'Eigenotes',
    cta: 'Eigenotes'
  },
  {
    label: 'Self Quantization',
    href: 'https://stoicjournals.netlify.app/u/parasparkash',
    title: 'StoicJournal',
    cta: 'StoicJournal'
  },
  {
    label: 'CS/Architecture Notes',
    href: 'https://parasparkash.notion.site',
    title: 'CS/Architecture Notes',
    cta: 'Notion'
  }
] as const

function formatShortDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

function getContributionLink(year: ContributionYear) {
  return `https://github.com/parasxparkash?tab=overview&from=${year}-01-01&to=${year}-12-31`
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('saas')
  const currentYear = new Date().getFullYear()
  const initialYear = contributionYears.includes(currentYear as ContributionYear)
    ? (currentYear as ContributionYear)
    : contributionYears[contributionYears.length - 1]
  const [selectedYear, setSelectedYear] = useState<ContributionYear>(initialYear)
  const { posts: topPosts } = usePosts(2)
  const { commits } = useCommits()
  const { pullRequests } = usePullRequests()
  const istTime = useISTClock()
  const [contributionCounts, setContributionCounts] = useState<Record<ContributionYear, number | null>>({
    2023: null,
    2024: null,
    2025: null,
    2026: null,
  })

  useEffect(() => {
    let cancelled = false

    Promise.all(
      contributionYears.map(async (year) => {
        try {
          const response = await fetch(`/data/contributions-${year}.json`)
          if (!response.ok) return [year, null] as const
          const data = await response.json()
          return [year, data.totalContributions as number] as const
        } catch {
          return [year, null] as const
        }
      })
    ).then((results) => {
      if (cancelled) return
      setContributionCounts(Object.fromEntries(results) as Record<ContributionYear, number | null>)
    })

    return () => {
      cancelled = true
    }
  }, [])

  const currentContributionCount = contributionCounts[selectedYear]
  const leftSidebarRef = useRef<HTMLDivElement>(null)
  const centerAboveTabsRef = useRef<HTMLDivElement>(null)
  const tabNavRef = useRef<HTMLDivElement>(null)
  const projectsScrollRef = useRef<HTMLDivElement>(null)
  const [projectsScrollHeight, setProjectsScrollHeight] = useState<number | null>(null)

  useEffect(() => {
    const updateProjectsScrollHeight = () => {
      if (window.innerWidth < 1024) {
        setProjectsScrollHeight(null)
        return
      }

      const sidebar = leftSidebarRef.current
      const aboveTabs = centerAboveTabsRef.current
      const tabNav = tabNavRef.current

      if (!sidebar || !aboveTabs || !tabNav) return

      const height = sidebar.offsetHeight - aboveTabs.offsetHeight - tabNav.offsetHeight
      setProjectsScrollHeight(Math.max(height, 120))
    }

    updateProjectsScrollHeight()

    const resizeObserver = new ResizeObserver(updateProjectsScrollHeight)
    ;[leftSidebarRef, centerAboveTabsRef, tabNavRef].forEach((ref) => {
      if (ref.current) resizeObserver.observe(ref.current)
    })

    window.addEventListener('resize', updateProjectsScrollHeight)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateProjectsScrollHeight)
    }
  }, [commits.length, pullRequests.length, currentContributionCount, selectedYear, activeTab])

  const showTab = (tabName: string) => {
    setActiveTab(tabName)
    if (projectsScrollRef.current) {
      projectsScrollRef.current.scrollTop = 0
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'saas':
        return <SaaSTab />
      case 'projects':
        return (
          <ProjectsTab
            scrollRef={projectsScrollRef}
            maxHeight={projectsScrollHeight}
          />
        )
      case 'experience':
        return <ExperienceTab />
      case 'education':
        return <EducationTab />
      case 'blogs':
        return <BlogsTab />
      default:
        return <SaaSTab />
    }
  }

  return (
    <main className="text-zinc-900 dark:text-zinc-100 max-w-7xl mx-auto px-4 py-10 flex flex-col bg-white dark:bg-zinc-900 min-h-screen overflow-x-hidden">
      <div className="flex gap-12 flex-1 flex-col lg:flex-row lg:items-stretch overflow-x-hidden">
        {/* Left Sidebar */}
        <div
          ref={leftSidebarRef}
          className="w-72 lg:flex-shrink-0 lg:self-stretch mb-8 lg:mb-0 flex flex-col lg:h-full lg:bg-zinc-50 lg:dark:bg-zinc-800/30 lg:p-4 lg:rounded-lg"
        >
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
            <div className="mb-3 flex justify-center">
              <SocialLinks variant="mobile" />
            </div>

            {/* Location + Building/Testing/Merging Animation */}
            <div className="flex flex-col items-center gap-2 mb-2">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Hyderabad / Delhi
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
            <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-3 text-justify">
              Developing Quantitative Models for Hedging using Derivatives leveraging Agentic AI for Risk Management and Market Screening
            </p>

            {/* Description Text */}
            <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto mb-2 text-justify">
              Proficient in developing and implementing profitable High-Frequency Trading (HFT) and Medium-Frequency Trading (MFT) strategies, as well as portfolio construction, while incorporating ML/AI techniques for high accuracy. Proven ability to leverage advanced statistical methods, low-latency systems, and performance optimization for alpha generation and risk management.
            </p>

            {/* About Me Link - Mobile */}
            <div className="flex mb-4">
              <a
                href="/about"
                className="group inline-flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                title="View full About Me page"
              >
                <span className="font-semibold">About Me</span>
                <svg 
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>

            {/* Eigenotes and Stoic Journal Links - Mobile */}
            <div className="flex flex-col items-start gap-2 mb-4 w-full max-w-xs">
              {resourceLinks.map((link) => (
                <div key={link.label} className="flex items-center gap-2 text-xs">
                  <span className="text-zinc-600 dark:text-zinc-400">{link.label} →</span>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-0.5 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors font-medium"
                    title={link.title}
                  >
                    {link.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Separator for single column layout */}
          <div className="lg:hidden border-b border-zinc-200 dark:border-zinc-700 mb-4"></div>

          {/* About Me Section - Desktop only */}
          <h3 className="text-sm font-medium mb-2 text-zinc-900 dark:text-zinc-100 hidden lg:block">About Me</h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2 text-justify hidden lg:block">
            Proficient in developing and implementing profitable High-Frequency Trading (HFT) and Medium-Frequency Trading (MFT) strategies, as well as portfolio construction, while incorporating ML/AI techniques for high accuracy. Proven ability to leverage advanced statistical methods, low-latency systems, and performance optimization for alpha generation and risk management.
          </p>

          {/* About Me Link - Desktop */}
          <div className="hidden lg:flex mb-3">
            <a
              href="/about"
              className="group inline-flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              title="View full About Me page"
            >
              <span className="font-semibold">Read more</span>
              <svg 
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          <div className="space-y-2 mb-1">
            <div className="flex items-center text-xs">
              <span className="text-zinc-600 dark:text-zinc-400">Hyderabad / Delhi</span>
            </div>
          </div>

          {/* Eigenotes and Stoic Journal Links - Desktop */}
          <div className="hidden lg:flex flex-col items-start gap-2 mt-3 mb-1">
            {resourceLinks.map((link) => (
              <div key={link.label} className="flex items-center gap-2 text-xs">
                <span className="text-zinc-600 dark:text-zinc-400">{link.label} →</span>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-0.5 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors font-medium"
                  title={link.title}
                >
                  {link.cta}
                </a>
              </div>
            ))}
          </div>

          <div className="border-b border-zinc-200 dark:border-zinc-700 mb-4"></div>

        {/* Current Company Section */}
        <div className="mb-4">
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-1">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">Working as</span> Quant Researcher
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">@QuantEdX Research • 2023 - Present</p>
        </div>

        <div className="border-b border-zinc-200 dark:border-zinc-700 mb-4"></div>

        {/* Recent Commits Section - Desktop only */}
        {commits.length > 0 && (
          <div className="mb-4 hidden lg:block">
            <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3">Recent Commits</h4>
            <div className="space-y-2">
              {commits.slice(0, 4).map((commit) => (
                <a
                  key={commit.sha}
                  href={commit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group hover:translate-x-1 transition-transform duration-150 ease-out"
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
                          {formatShortDate(commit.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Recent Pull Requests Section - Desktop only */}
        {pullRequests.length > 0 && (
          <div className="mb-4 hidden lg:block">
            <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3">Recent Pull Requests</h4>
            <div className="space-y-2">
              {pullRequests.slice(0, 2).map((pr) => (
                <a
                  key={pr.number}
                  href={pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group hover:translate-x-1 transition-transform duration-150 ease-out"
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors line-clamp-2">
                        {pr.title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                        <span className="font-mono text-[10px]">#{pr.number}</span>
                        <span>•</span>
                        <span className="text-[10px]">
                          {formatShortDate(pr.date)}
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

          {/* Current Project Section */}
          <div className="mb-1 mt-auto">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-1.5 py-0.5 text-[10px] font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 rounded">
                building
              </span>
              <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">QuantPype</h4>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-3 text-justify">Local AI agent-based trading platform with advanced automation and intelligent strategy execution</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-1.5 py-0.5 text-[10px] bg-zinc-700 text-white dark:bg-zinc-400 dark:text-zinc-900 rounded">Rust</span>
              <span className="px-1.5 py-0.5 text-[10px] bg-zinc-700 text-white dark:bg-zinc-400 dark:text-zinc-900 rounded">Electron</span>
              <span className="px-1.5 py-0.5 text-[10px] bg-zinc-700 text-white dark:bg-zinc-400 dark:text-zinc-900 rounded">AI Agents</span>
              <span className="px-1.5 py-0.5 text-[10px] bg-zinc-700 text-white dark:bg-zinc-400 dark:text-zinc-900 rounded">Trading Platform</span>
            </div>
          </div>

      </div>

        {/* Center Content Area */}
        <div className="flex-1 flex flex-col min-h-full">
          <div ref={centerAboveTabsRef} className="flex-shrink-0">
          {/* Header Section - Responsive layout */}
          <div className="animate-fade-in flex-shrink-0">
            <section className="mb-6">
              {/* Mobile: Show only description above tabs, name/location/icons are in sidebar */}
              <div className="hidden md:block animate-fade-in animate-delay-200">
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <h1 className="text-2xl font-medium tracking-tight flex items-center gap-2">
                    Paras Parkash
                    <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-bold leading-none">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-blink"></span>
                      <span className="leading-none">
                        <RotatingText items={['merging', 'testing', 'building']} />
                      </span>
                    </span>
                  </h1>
                  <div className="flex items-center gap-4">
                    <SocialLinks />
                    <ThemeToggle />
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Hyderabad / Delhi
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">
                    {istTime}
                  </p>
                </div>
              </div>

              <div className="animate-fade-in animate-delay-300">
                <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xl mb-4 text-justify">
                  Developing Quantitative Models for Hedging using Derivatives leveraging Agentic AI for Risk Management and Market Screening
                </p>
              </div>
            </section>
          </div>

          {/* GitHub Contributions */}
          <section className="mb-4 flex-shrink-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
                <h3 className="text-sm font-medium">GitHub Contributions</h3>
                {currentContributionCount !== null && (
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    {currentContributionCount} total in {selectedYear}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {contributionYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-3 py-1 text-xs rounded ${
                      selectedYear === year
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium'
                        : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
            <a
              href={getContributionLink(selectedYear)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full max-w-3xl mx-auto"
            >
              <GitHubContributionGraph year={selectedYear} />
            </a>
          </section>
          </div>

          {/* Tabs Section */}
          <div className="tab-scroll-container flex-1">
           <div ref={tabNavRef} className="animate-fade-in animate-delay-200 sticky top-0 bg-white dark:bg-zinc-900 z-10">
             <div className="text-muted-foreground inline-flex h-9 w-full items-center justify-start rounded-lg mb-1 border-none bg-transparent p-0 overflow-x-auto scrollbar-hide">
               {tabs.map((tab) => (
                 <button
                   key={tab.id}
                   onClick={() => showTab(tab.id)}
                   type="button"
                  className={`tab-button inline-flex h-[calc(100%-1px)] items-center justify-start gap-1.5 rounded-md px-3 py-1.5 text-xs whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-zinc-900 dark:text-zinc-100 font-medium lg:bg-zinc-50 lg:dark:bg-zinc-800/30'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 lg:hover:bg-zinc-25 lg:dark:hover:bg-zinc-800/20'
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

          {/* Recent Commits and Pull Requests - Mobile only (at bottom) */}
          <div className="lg:hidden mt-8 space-y-6">
            {/* Recent Commits Section - Mobile */}
            {commits.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3">Recent Commits</h4>
                <div className="space-y-2">
                  {commits.slice(0, 4).map((commit) => (
                    <a
                      key={commit.sha}
                      href={commit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group hover:translate-x-1 transition-transform duration-150 ease-out"
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
                              {formatShortDate(commit.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Pull Requests Section - Mobile */}
            {pullRequests.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3">Recent Pull Requests</h4>
                <div className="space-y-2">
                  {pullRequests.slice(0, 2).map((pr) => (
                    <a
                      key={pr.number}
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group hover:translate-x-1 transition-transform duration-150 ease-out"
                    >
                      <div className="flex items-start gap-2">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors line-clamp-2">
                            {pr.title}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                            <span className="font-mono text-[10px]">#{pr.number}</span>
                            <span>•</span>
                            <span className="text-[10px]">
                              {formatShortDate(pr.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Hidden on tablet (md), visible on desktop (lg+) */}
        <div className="hidden lg:flex lg:flex-col lg:self-stretch w-72 lg:flex-shrink-0">
          <RecentPostsSidebar topPosts={topPosts} />
        </div>
      </div>
    </main>
  )
}
