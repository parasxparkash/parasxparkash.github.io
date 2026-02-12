import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://parasparkash.github.io'),
  title: {
    default: 'Paras Parkash | Quantitative Researcher | Mumbai, India',
    template: '%s | Paras Parkash',
  },
  description: 'Quantitative Researcher specializing in derivatives, risk management, and AI-powered financial models. Expert in developing HFT/MFT trading strategies, portfolio construction, and advanced volatility modeling using GARCH, Heston, and higher-order frameworks.',
  keywords: ['quantitative finance', 'derivatives', 'risk management', 'AI', 'machine learning', 'Paras Parkash', 'Mumbai', 'India', 'HFT', 'high-frequency trading', 'MFT', 'medium-frequency trading', 'algorithmic trading', 'financial modeling', 'quantitative research', 'finance blog', 'mathematical finance', 'stochastic calculus', 'volatility modeling', 'GARCH', 'Heston model', 'market making', 'order book analysis', 'reinforcement learning', 'financial mathematics', 'portfolio optimization', 'agentic AI', 'QuantEdX Research'],
  authors: [{ name: 'Paras Parkash', url: 'https://parasparkash.github.io' }],
  creator: 'Paras Parkash',
  publisher: 'Paras Parkash',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://parasparkash.github.io',
    siteName: 'Paras Parkash',
    title: 'Paras Parkash | Quantitative Researcher',
    description: 'Quantitative Researcher specializing in derivatives, risk management, and AI-powered financial models',
    images: [
      {
        url: 'https://parasparkash.github.io/assets/profile-optimized.webp',
        width: 1200,
        height: 630,
        alt: 'Paras Parkash',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paras Parkash | Quantitative Researcher',
    description: 'Quantitative Researcher specializing in derivatives, risk management, and AI-powered financial models',
    creator: '@parasxparkash',
    site: '@parasxparkash',
    images: ['/assets/profile-optimized.webp'],
  },
  alternates: {
    canonical: 'https://parasparkash.github.io',
  },
  verification: {
    // Add your verification codes here if needed
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0" />

        {/* Primary Meta Tags */}
        <meta name="title" content="Paras Parkash | Quantitative Researcher | Mumbai, India" />
        <meta name="keywords" content="quantitative finance, derivatives, risk management, AI, machine learning, Paras Parkash, Mumbai, India, HFT, algorithmic trading, financial modeling, quantitative research" />
        <meta name="author" content="Paras Parkash" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Mumbai" />
        <meta name="geo.position" content="19.0760;72.8777" />
        <meta name="ICBM" content="19.0760, 72.8777" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="coverage" content="worldwide" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://parasparkash.github.io" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://parasparkash.github.io" />
        <meta property="og:title" content="Paras Parkash | Quantitative Researcher | Mumbai, India" />
        <meta property="og:description" content="Quantitative Researcher specializing in derivatives, risk management, and AI-powered financial models. Expert in HFT/MFT trading strategies and advanced volatility modeling." />
        <meta property="og:image" content="https://parasparkash.github.io/assets/profile-optimized.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Paras Parkash - Quantitative Researcher" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:site_name" content="Paras Parkash" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="en_IN" />
        <meta property="article:author" content="Paras Parkash" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://parasparkash.github.io" />
        <meta name="twitter:title" content="Paras Parkash | Quantitative Researcher | Mumbai, India" />
        <meta name="twitter:description" content="Quantitative Researcher specializing in derivatives, risk management, and AI-powered financial models. Expert in HFT/MFT trading strategies and advanced volatility modeling." />
        <meta name="twitter:image" content="https://parasparkash.github.io/assets/profile-optimized.webp" />
        <meta name="twitter:image:alt" content="Paras Parkash - Quantitative Researcher" />
        <meta name="twitter:creator" content="@parasxparkash" />
        <meta name="twitter:site" content="@parasxparkash" />
        <meta name="twitter:domain" content="parasparkash.github.io" />

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Paras Parkash" />

        {/* Favicon */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22></text></svg>" />
        <link rel="apple-touch-icon" href="/assets/profile-optimized.webp" />

        {/* Preconnect to external domains - only for resources we actually use */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />

        {/* Prevent flash of incorrect theme - Default to light theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('theme');
                // Default to light theme if no saved preference
                const shouldUseDark = savedTheme === 'dark';

                if (shouldUseDark) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.style.colorScheme = 'light';
                }
              })();
            `,
          }}
        />

        {/* MathJax will be loaded dynamically when needed on post pages via MathJaxLoader component */}

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Paras Parkash",
              "description": "Quantitative Researcher specializing in derivatives, risk management, and AI-powered financial models",
              "url": "https://parasparkash.github.io",
              "image": "/assets/profile-optimized.webp",
              "jobTitle": "Quantitative Researcher",
              "worksFor": {
                "@type": "Organization",
                "name": "QuantEdX Research"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Mumbai",
                "addressRegion": "Maharashtra",
                "addressCountry": "IN"
              },
              "email": "parasparkash@quantedx.com",
              "telephone": "+91",
              "sameAs": [
                "https://github.com/parasxparkash",
                "https://twitter.com/parasxparkash",
                "https://linkedin.com/in/parasxparkash"
              ],
              "knowsAbout": [
                "Quantitative Finance",
                "Derivatives",
                "Risk Management",
                "Machine Learning",
                "Artificial Intelligence",
                "Mathematical Finance",
                "Stochastic Calculus",
                "High-Frequency Trading",
                "Algorithmic Trading",
                "Volatility Modeling",
                "GARCH Models",
                "Heston Model",
                "Portfolio Optimization",
                "Market Making",
                "Order Book Analysis"
              ],
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Educational Institution"
              },
              "award": "Quantitative Researcher",
              "honorificSuffix": "Quantitative Researcher"
            })
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Paras Parkash",
              "description": "Quantitative Researcher specializing in derivatives, risk management, and AI-powered financial models",
              "url": "https://parasparkash.github.io",
              "author": {
                "@type": "Person",
                "name": "Paras Parkash"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://parasparkash.github.io/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* Blog Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Paras Parkash Blog",
              "description": "Technical blog posts covering quantitative finance, risk management, AI, HFT trading strategies, and mathematical modeling",
              "url": "https://parasparkash.github.io",
              "inLanguage": "en-US",
              "author": {
                "@type": "Person",
                "name": "Paras Parkash",
                "url": "https://parasparkash.github.io"
              },
              "publisher": {
                "@type": "Person",
                "name": "Paras Parkash",
                "url": "https://parasparkash.github.io"
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://parasparkash.github.io"
              }
            })
          }}
        />

        {/* Professional Profile Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "mainEntity": {
                "@type": "Person",
                "name": "Paras Parkash",
                "jobTitle": "Quantitative Researcher",
                "worksFor": {
                  "@type": "Organization",
                  "name": "QuantEdX Research"
                },
                "url": "https://parasparkash.github.io",
                "sameAs": [
                  "https://github.com/parasxparkash",
                  "https://twitter.com/parasxparkash",
                  "https://linkedin.com/in/parasxparkash"
                ]
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} font-geist-sans bg-white overscroll-none dark:bg-zinc-900 transition-colors duration-300`}>
        {children}
      </body>
    </html>
  )
}