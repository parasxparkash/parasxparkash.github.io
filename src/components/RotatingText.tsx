'use client'

import { useState, useEffect } from 'react'

interface RotatingTextProps {
  items: string[]
  className?: string
}

export default function RotatingText({ items, className = '' }: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (items.length === 0) return

    const interval = setInterval(() => {
      setIsAnimating(true)
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
        setIsAnimating(false)
      }, 500) // Half of animation duration for smooth transition
    }, 3000) // Change text every 3 seconds

    return () => clearInterval(interval)
  }, [items.length])

  // Capitalize the first letter of each word
  const capitalizeText = (text: string) => {
    return text.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ')
  }

  const nextIndex = (currentIndex + 1) % items.length

  return (
    <span 
      className={`inline-block relative overflow-hidden rotating-text-container ${className}`} 
      style={{ minHeight: '1.2em', lineHeight: '1.2em', display: 'inline-block' }}
    >
      {/* Current text sliding out */}
      <span
        key={`current-${currentIndex}`}
        className={`absolute inset-0 inline-block rotating-text ${
          isAnimating ? 'rotating-text-out' : 'rotating-text-in'
        }`}
      >
        {capitalizeText(items[currentIndex])}
      </span>
      {/* Next text sliding in */}
      {isAnimating && (
        <span
          key={`next-${nextIndex}`}
          className="absolute inset-0 inline-block rotating-text rotating-text-enter"
        >
          {capitalizeText(items[nextIndex])}
        </span>
      )}
      {/* Invisible placeholder to maintain height */}
      <span className="invisible">
        {capitalizeText(items[currentIndex])}
      </span>
    </span>
  )
}

