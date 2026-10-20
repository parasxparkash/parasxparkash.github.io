import type { Metadata, Viewport } from 'next'
import '@fontsource/inter/latin.css'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://parasparkash.github.io'),
  title: {
    default: 'Paras Parkash | Quantitative Researcher | Banjara Hills, Hyderabad, India',
    template: '%s | Paras Parkash',
  },
  description: 'Quantitative Researcher specializing in derivatives, risk management, and AI-powered financial models. Expert in developing HFT/MFT trading strategies, portfolio construction, and advanced volatility modeling using GARCH, Heston, and higher-order frameworks.',
  keywords: ['quantitative finance', 'derivatives', 'risk management', 'AI', 'machine learning', 'Paras Parkash', 'Banjara Hills', 'Hyderabad', 'India', 'HFT', 'high-frequency trading', 'MFT', 'medium-frequency trading', 'algorithmic trading', 'financial modeling', 'quantitative research', 'finance blog', 'mathematical finance', 'stochastic calculus', 'volatility modeling', 'GARCH', 'Heston model', 'market making', 'order book analysis', 'reinforcement learning', 'financial mathematics', 'portfolio optimization', 'agentic AI', 'QuantEdX Research'],
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
    alternateLocale: ['en_IN'],
    url: 'https://parasparkash.github.io',
    siteName: 'Paras Parkash',
    title: 'Paras Parkash | Quantitative Researcher | Banjara Hills, Hyderabad, India',
    description: 'Quantitative Researcher specializing in derivatives, risk management, and AI-powered financial models. Expert in HFT/MFT trading strategies and advanced volatility modeling.',
    images: [
      {
        url: 'https://parasparkash.github.io/assets/profile-optimized.webp',
        width: 1200,
        height: 630,
        alt: 'Paras Parkash - Quantitative Researcher',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paras Parkash | Quantitative Researcher | Banjara Hills, Hyderabad, India',
    description: 'Quantitative Researcher specializing in derivatives, risk management, and AI-powered financial models. Expert in HFT/MFT trading strategies and advanced volatility modeling.',
    creator: '@parasxparkash',
    site: '@parasxparkash',
    images: [
      {
        url: 'https://parasparkash.github.io/assets/profile-optimized.webp',
        alt: 'Paras Parkash - Quantitative Researcher',
      },
    ],
  },
  alternates: {
    canonical: 'https://parasparkash.github.io',
  },
  icons: {
    icon: '/assets/profile-optimized.webp',
    apple: '/assets/profile-optimized.webp',
  },
  appleWebApp: {
    capable: true,
    title: 'Paras Parkash',
    statusBarStyle: 'black-translucent',
  },
  other: {
    'geo.region': 'IN-TG',
    'geo.placename': 'Banjara Hills, Hyderabad',
    'geo.position': '17.4156;78.4347',
    ICBM: '17.4156, 78.4347',
    'msapplication-TileColor': '#000000',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains - only for resources we actually use */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />

        {/* Prevent flash of incorrect theme - Default to light theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('theme') || 'light';
                
                if (savedTheme === 'dark') {
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
                "addressLocality": "Banjara Hills, Hyderabad",
                "addressRegion": "Telangana",
                "addressCountry": "IN"
              },
              "email": "parasparkash@quantedx.com",
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
              ]
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
      <body className="font-geist-sans bg-white overscroll-none dark:bg-zinc-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
