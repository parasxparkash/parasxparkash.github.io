# GitHub Pages Setup Guide

Complete guide for deploying your portfolio with GitHub contributions and recent commits on GitHub Pages.

## 🚀 Quick Start

### 1. Enable GitHub Actions

The workflow is already configured at `.github/workflows/update-contributions.yml`

**Enable it:**
1. Go to your repository on GitHub
2. Click **Settings** → **Actions** → **General**
3. Under "Workflow permissions", select **"Read and write permissions"**
4. Click **Save**

### 2. Run the Workflow (First Time)

**Fetch your GitHub data:**
1. Go to **Actions** tab in your repository
2. Click **"Update GitHub Data"** workflow
3. Click **"Run workflow"** dropdown
4. Select your branch (usually `main`)
5. Click **"Run workflow"** button
6. Wait ~30 seconds for completion

This creates:
- `public/data/contributions-2025.json`
- `public/data/contributions-2026.json`
- `public/data/commits.json`

### 3. Verify Data Files

Check that files were created:
1. Go to your repository
2. Navigate to `public/data/`
3. You should see the JSON files

### 4. Deploy to GitHub Pages

Your site should already be configured for GitHub Pages. If not:

1. Go to **Settings** → **Pages**
2. Under "Build and deployment":
   - Source: **GitHub Actions**
3. Your site will be at: `https://yourusername.github.io`

## 📅 Automatic Updates

The workflow runs automatically:
- **Daily** at midnight UTC
- **Automatically** commits updated data
- **No manual intervention** needed

Your contribution graphs and recent commits stay up-to-date automatically!

## 🔧 Manual Update

To update contributions anytime:

1. Go to **Actions** tab
2. Click **"Update GitHub Contributions"**
3. Click **"Run workflow"**
4. Click **"Run workflow"** button

## 📁 What Gets Created

```
your-repo/
├── .github/
│   └── workflows/
│       └── update-contributions.yml  ← Runs daily
├── public/
│   └── data/
│       ├── contributions-2025.json   ← Auto-generated
│       ├── contributions-2026.json   ← Auto-generated
│       └── commits.json              ← Auto-generated (recent commits)
└── src/
    ├── components/
    │   └── GitHubContributionGraph.tsx  ← Displays contributions
    └── hooks/
        └── useCommits.ts             ← Displays recent commits
```

## 🎯 How It Works

```
GitHub Actions (Daily)
    ↓
Runs fetch script
    ↓
Fetches your GitHub contributions & commits
    ↓
Saves as JSON files
    ↓
Commits to repository
    ↓
GitHub Pages serves updated files
    ↓
Your website displays latest data
```

## ✅ Verification Checklist

After setup, verify:

- [ ] Workflow ran successfully (check Actions tab)
- [ ] JSON files exist in `public/data/`
- [ ] Files contain valid JSON data
- [ ] Website shows contribution graphs
- [ ] Year selector (2025/2026) works
- [ ] Hover shows contribution counts

## 🔍 Troubleshooting

### Workflow fails with "Permission denied"

**Fix:**
1. Settings → Actions → General
2. Workflow permissions → "Read and write permissions"
3. Save and re-run workflow

### No data files created

**Check:**
1. Actions tab → View workflow run logs
2. Look for error messages
3. Verify `scripts/fetch-github-contributions.js` exists

### "Failed to load contributions" on website

**Check:**
1. Files exist: `public/data/contributions-2025.json`
2. Files contain valid JSON (not error messages)
3. Check browser console for errors

### Data not updating

**Check:**
1. Actions tab → Recent workflow runs
2. Verify workflow is enabled
3. Check if commits are being made

**Force update:**
- Actions → Run workflow manually

## 📊 Adding More Years

To track additional years:

1. Edit `scripts/fetch-github-contributions.js`
2. Update the years array:
   ```javascript
   const years = [2024, 2025, 2026, 2027]; // Add years
   ```
3. Run workflow manually or wait for next daily run

## 🔒 Security

✓ Uses GitHub's built-in `GITHUB_TOKEN`
✓ Token is automatically provided by GitHub Actions
✓ No need to create or store personal tokens
✓ Token is scoped to your repository only
✓ Data is public (contribution counts)

## 💡 Benefits

✓ **Zero configuration** - No tokens to manage
✓ **Automatic updates** - Runs daily
✓ **Free** - GitHub Actions included
✓ **Fast** - Static JSON files
✓ **Reliable** - No external dependencies
✓ **Version controlled** - Data tracked in git

## 🎨 Customization

### Change update frequency

Edit `.github/workflows/update-contributions.yml`:

```yaml
on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
    # or
    - cron: '0 0 * * 0'    # Weekly (Sunday)
```

### Change username

Edit `scripts/fetch-github-contributions.js`:

```javascript
const GITHUB_USERNAME = 'your-username';
```

## 📚 Files Reference

### `.github/workflows/update-contributions.yml`
- Runs the fetch script daily
- Commits updated data automatically
- Uses GitHub's built-in token

### `scripts/fetch-github-contributions.js`
- Fetches contribution data from GitHub
- Saves as JSON files
- Called by GitHub Actions

### `src/components/GitHubContributionGraph.tsx`
- Reads JSON files
- Renders contribution graph
- Handles year selection

## 🆘 Need Help?

1. Check Actions tab for workflow logs
2. Review browser console for errors
3. Verify JSON files are valid
4. Check GitHub Pages deployment status

---

**That's it!** Your GitHub contributions will update automatically every day. 🎉
