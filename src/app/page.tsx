'use client'

import { useState, useEffect } from 'react'
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
    href: 'https://parasparkash.netlify.app',
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
  const [contributions2023, setContributions2023] = useState<number | null>(null)
  const [contributions2024, setContributions2024] = useState<number | null>(null)
  const [contributions2025, setContributions2025] = useState<number | null>(null)
  const [contributions2026, setContributions2026] = useState<number | null>(null)

  useEffect(() => {
    const contributionEvents = [
      { eventName: 'contributions-2023', setValue: setContributions2023 },
      { eventName: 'contributions-2024', setValue: setContributions2024 },
      { eventName: 'contributions-2025', setValue: setContributions2025 },
      { eventName: 'contributions-2026', setValue: setContributions2026 }
    ] as const

    const listeners = contributionEvents.map(({ eventName, setValue }) => {
      const handler = (e: Event) => {
        setValue((e as CustomEvent<number>).detail)
      }

      window.addEventListener(eventName, handler)
      return { eventName, handler }
    })

    return () => {
      listeners.forEach(({ eventName, handler }) => {
        window.removeEventListener(eventName, handler)
      })
    }
  }, [])

  const contributionCounts: Record<ContributionYear, number | null> = {
    2023: contributions2023,
    2024: contributions2024,
    2025: contributions2025,
    2026: contributions2026
  }
  const currentContributionCount = contributionCounts[selectedYear]
  const selectedYearIndex = contributionYears.indexOf(selectedYear)

  const showTab = (tabName: string) => {
    setActiveTab(tabName)
    const tabContainer = document.querySelector('.flex-1.overflow-y-auto')
    if (tabContainer) {
      tabContainer.scrollTop = 0
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'saas':
        return <SaaSTab />
      case 'projects':
        return <ProjectsTab />
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
                Hyderabad / Bengaluru
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

            {/* Eigenotes and Stoic Journal Links - Mobile */}
            <div className="flex flex-col items-start gap-2 mb-4 w-full max-w-xs mx-auto">
              {resourceLinks.map((link) => (
                <div key={link.label} className="flex items-center gap-2 text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">{link.label} →</span>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors font-medium"
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
          <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-100 hidden lg:block">About Me</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2 text-justify hidden lg:block">
            Proficient in developing and implementing profitable High-Frequency Trading (HFT) and Medium-Frequency Trading (MFT) strategies, as well as portfolio construction, while incorporating ML/AI techniques for high accuracy. Proven ability to leverage advanced statistical methods, low-latency systems, and performance optimization for alpha generation and risk management.
          </p>

          <div className="space-y-2 mb-1">
            <div className="flex items-center text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">Hyderabad / Bengaluru</span>
            </div>
          </div>

          {/* Eigenotes and Stoic Journal Links - Desktop */}
          <div className="hidden lg:flex flex-col items-start gap-2 mt-3 mb-1">
            {resourceLinks.map((link) => (
              <div key={link.label} className="flex items-center gap-2 text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">{link.label} →</span>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors font-medium"
                  title={link.title}
                >
                  {link.cta}
                </a>
              </div>
            ))}
          </div>

          <div className="border-b border-zinc-200 dark:border-zinc-700 mb-4"></div>

          {/* Current Project Section */}
          <div className="mb-1">
            <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">Building @QuantPype</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 text-justify">Local AI agent-based trading platform with advanced automation and intelligent strategy execution</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-1.5 py-0.5 text-[10px] bg-zinc-700 text-white dark:bg-zinc-400 dark:text-zinc-900 rounded">Rust</span>
              <span className="px-1.5 py-0.5 text-[10px] bg-zinc-700 text-white dark:bg-zinc-400 dark:text-zinc-900 rounded">Electron</span>
              <span className="px-1.5 py-0.5 text-[10px] bg-zinc-700 text-white dark:bg-zinc-400 dark:text-zinc-900 rounded">AI Agents</span>
              <span className="px-1.5 py-0.5 text-[10px] bg-zinc-700 text-white dark:bg-zinc-400 dark:text-zinc-900 rounded">Trading Platform</span>
            </div>
          </div>

          <div className="border-b border-zinc-200 dark:border-zinc-700 mb-4"></div>

        {/* Current Company Section */}
        <div className="mb-4">
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

        {pullRequests.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3">Recent Pull Requests</h4>
            <div className="space-y-2">
              {pullRequests.slice(0, 2).map((pr) => (
                <a
                  key={pr.number}
                  href={pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group hover:translate-x-1 transition-all duration-300 ease-out"
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

      </div>

        {/* Center Content Area */}
        <div className="flex-1 flex flex-col min-h-full">
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
                    Hyderabad / Bengaluru
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">
                    {istTime}
                  </p>
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
                {contributionYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-3 py-1 text-xs rounded transition-all duration-300 ${
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
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${selectedYearIndex * 100}%)` }}
              >
                {contributionYears.map((year) => (
                  <div key={year} className="w-full flex-shrink-0 flex justify-center">
                    <a href={getContributionLink(year)} target="_blank" rel="noopener noreferrer" className="block w-full max-w-3xl">
                      <GitHubContributionGraph year={year} />
                    </a>
                  </div>
                ))}
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
                  className={`tab-button inline-flex h-[calc(100%-1px)] items-center justify-start gap-1.5 rounded-md px-3 py-1.5 text-sm whitespace-nowrap transition-all duration-300 ease-out ${
                    activeTab === tab.id
                      ? 'text-zinc-900 dark:text-zinc-100 font-medium bg-zinc-50 dark:bg-zinc-800/30'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-25 dark:hover:bg-zinc-800/20'
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
