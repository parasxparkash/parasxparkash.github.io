# Paras Parkash

**Quantitative Researcher | Derivatives Specialist | Risk Management Expert**

My work focuses on developing quantitative risk management models leveraging agentic AI that dynamically manage market risks and optimize portfolio protection, using derivatives combined with advanced volatility models like GARCH, Heston, and higher-order frameworks.

## About Me

I'm Paras Parkash, a quantitative researcher based in Gurugram, India, specializing in derivatives, risk management, and AI-powered financial models. My expertise lies in:

- **Quantitative Risk Management**: Developing models that leverage agentic AI to dynamically manage market risks
- **Derivatives**: Complex financial instruments and their applications in portfolio protection
- **Volatility Modeling**: Advanced frameworks including GARCH, Heston, and higher-order models
- **Financial Mathematics**: Theoretical and applied mathematical models in finance
- **Market Making**: Deep reinforcement learning applications in market making strategies
- **Order Book Analysis**: Price impact and order flow analysis in limit order books

## Research Interests

- Asymmetric Information and Realized Spread
- Deep Reinforcement Learning for Market Making
- Local Volatility under Rough Volatility
- Price Impact and Order Flow Analysis
- Financial Mathematics and Probability Theory
- Ring Theory applications in mathematical finance

## Connect With Me

- 📧 **Email**: [parasxparkash@gmail.com](mailto:parasxparkash@gmail.com)
- 👔 **LinkedIn**: [parasparkash](https://linkedin.com/in/parasparkash)
- 🐦 **Twitter**: [@parasxparkash](https://twitter.com/parasxparkash)
- 🐙 **GitHub**: [parasparkash](https://github.com/parasparkash)
- 📝 **Medium**: [/@parasparkash](https://medium.com/@parasparkash)
- ✍️ **Substack**: [parasparkash.substack.com](https://parasparkash.substack.com)
- 📚 **Academic Profile**: Google Scholar, ORCID, ResearchGate

## Publications & Content

This site features my technical blog posts and mathematical notes covering:
- Modern React patterns and scalable microservices
- Financial mathematics and quantitative modeling
- Risk management strategies and derivatives pricing
- Market microstructure and order book dynamics
- Advanced volatility models and their applications

## Technical Background

- **Programming**: Python, R, C++, MATLAB, JavaScript
- **Machine Learning**: Deep learning, reinforcement learning, statistical modeling
- **Financial Software**: QuantLib, Bloomberg, Refinitiv Eikon
- **Mathematical Tools**: Stochastic calculus, numerical methods, optimization

---

*Building quantitative solutions at the intersection of finance, mathematics, and AI*

## Development & Deployment

This is a Next.js portfolio website deployed on **GitHub Pages** with automatic GitHub contribution tracking.

### Quick Start

1. **Clone and Install**
   ```bash
   git clone https://github.com/parasxparkash/parasxparkash.github.io.git
   cd parasxparkash.github.io
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

3. **Build for Production**
   ```bash
   npm run build
   npm run export
   ```

### GitHub Pages Deployment

This site is automatically deployed to GitHub Pages at: **https://parasxparkash.github.io**

**Setup:**
1. Push to `main` branch
2. GitHub Actions automatically builds and deploys
3. Site updates within minutes

### GitHub Contributions Feature

Your contribution graphs update automatically every day via GitHub Actions.

**First-time setup:**
1. Go to **Settings** → **Actions** → **General**
2. Enable "Read and write permissions"
3. Go to **Actions** tab → **Update GitHub Contributions**
4. Click **Run workflow** to generate initial data

**How it works:**
- Runs daily at midnight UTC
- Fetches your GitHub contribution data
- Saves as JSON files in `public/data/`
- Automatically commits updates
- No manual intervention needed

See [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md) for detailed instructions.

### Project Structure

```
├── .github/
│   └── workflows/
│       └── update-contributions.yml  # Auto-updates contributions daily
├── src/
│   ├── app/              # Next.js pages
│   │   └── posts/        # Blog post pages
│   ├── components/       # React components
│   │   └── GitHubContributionGraph.tsx  # Contribution graph
│   └── hooks/            # Custom React hooks
├── public/
│   ├── posts/            # Markdown blog posts
│   ├── data/             # Auto-generated contribution data
│   └── assets/           # Static assets
└── scripts/              # Utility scripts
    └── fetch-github-contributions.js  # Fetches contribution data
```

### Features

- **Dynamic GitHub Contributions**: Year-by-year contribution graphs
- **Recent Commits**: Live commit feed from your repositories  
- **Blog Posts**: Markdown-based blog with MathJax support
- **Dark Mode**: System-aware theme switching
- **Responsive Design**: Mobile-first, optimized for all devices
- **Automatic Updates**: GitHub Actions keeps data fresh

### Key Technologies

- **Framework**: Next.js 14 (Static Export)
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages
- **Automation**: GitHub Actions
- **Math Rendering**: MathJax

### Customization

**Update your information:**
- Edit `src/app/page.tsx` for main content
- Modify `src/components/` for layout changes
- Add blog posts to `public/posts/`

**Change GitHub username:**
- Edit `scripts/fetch-github-contributions.js`
- Update `GITHUB_USERNAME` constant

**Adjust update frequency:**
- Edit `.github/workflows/update-contributions.yml`
- Modify the `cron` schedule

### Troubleshooting

**Contributions not showing:**
1. Check Actions tab for workflow status
2. Verify `public/data/` contains JSON files
3. Run workflow manually if needed

**Build fails:**
1. Check Node.js version (18+ required)
2. Clear `.next` folder: `rm -rf .next`
3. Reinstall dependencies: `npm install`

**GitHub Pages not updating:**
1. Check Settings → Pages is enabled
2. Verify Actions have write permissions
3. Check Actions tab for deployment status

### Documentation

- [GitHub Pages Setup Guide](GITHUB_PAGES_SETUP.md) - Complete deployment guide
- [Scripts README](scripts/README.md) - Contribution fetching details

### License

This project is open source and available for personal use.

---

**Live Site**: https://parasxparkash.github.io


