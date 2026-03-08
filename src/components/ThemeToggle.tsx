'use client'

import { useEffect, useState } from 'react'

const themes = [
  { id: 'light', name: 'Light', icon: '☀️' },
  { id: 'dark', name: 'Dark', icon: '🌙' },
  { id: 'sepia', name: 'Sepia', icon: '📜' },
  { id: 'ocean', name: 'Ocean', icon: '🌊' },
  { id: 'blood', name: 'Blood', icon: '🩸' },
  { id: 'space', name: 'Space', icon: '🌌' },
  { id: 'dracula', name: 'Dracula', icon: '🧛' },
  { id: 'solarized', name: 'Solarized', icon: '☀️' },
  { id: 'vintage', name: 'Vintage', icon: '📻' },
  { id: 'paper', name: 'Paper', icon: '📄' },
  { id: 'abacus', name: 'Abacus', icon: '🧮' },
  { id: 'papyrus', name: 'Papyrus', icon: '📃' },
  { id: 'colorful', name: 'Colorful', icon: '🎨' },
]

export default function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState('light')
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') || 'light'
    setCurrentTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (theme: string) => {
    // Remove all theme classes
    themes.forEach(t => {
      document.documentElement.classList.remove(t.id)
    })
    
    // Add new theme class
    document.documentElement.classList.add(theme)
    
    // Set color scheme for dark themes
    if (['dark', 'blood', 'space', 'dracula'].includes(theme)) {
      document.documentElement.style.colorScheme = 'dark'
    } else {
      document.documentElement.style.colorScheme = 'light'
    }
  }

  const changeTheme = (themeId: string) => {
    setCurrentTheme(themeId)
    applyTheme(themeId)
    localStorage.setItem('theme', themeId)
    setIsOpen(false)
  }

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        aria-label="Toggle theme"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </button>
    )
  }

  const currentThemeData = themes.find(t => t.id === currentTheme) || themes[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2"
        aria-label="Change theme"
      >
        <span className="text-lg">{currentThemeData.icon}</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 z-50 max-h-96 overflow-y-auto">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => changeTheme(theme.id)}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors flex items-center gap-2 ${
                  currentTheme === theme.id ? 'bg-zinc-100 dark:bg-zinc-700 font-medium' : ''
                }`}
              >
                <span>{theme.icon}</span>
                <span>{theme.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
