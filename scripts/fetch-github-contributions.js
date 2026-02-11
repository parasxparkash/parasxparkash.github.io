/**
 * Script to fetch GitHub contributions and commits, saving them as JSON files by year
 * Run: node scripts/fetch-github-contributions.js
 * 
 * Requirements:
 * 1. GitHub Actions provides GITHUB_TOKEN automatically
 * 2. Or set manually: GITHUB_TOKEN=your_token_here
 */

const fs = require('fs');
const path = require('path');

const GITHUB_USERNAME = 'parasxparkash';
const GITHUB_REPO = 'parasxparkash.github.io';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  console.error('Error: GITHUB_TOKEN environment variable is not set');
  console.error('Create a token at: https://github.com/settings/tokens');
  process.exit(1);
}

async function fetchContributions(username, year) {
  const fromDate = `${year}-01-01T00:00:00Z`;
  const toDate = `${year}-12-31T23:59:59Z`;

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                weekday
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { username, from: fromDate, to: toDate }
    })
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
  }

  return data.data.user.contributionsCollection.contributionCalendar;
}

async function fetchRecentCommits(owner, repo) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits?per_page=5`,
    {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      }
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const commits = await response.json();
  
  return commits.map(commit => ({
    sha: commit.sha.substring(0, 7),
    message: commit.commit.message.split('\n')[0],
    date: commit.commit.author.date,
    url: commit.html_url,
    author: commit.commit.author.name
  }));
}

async function saveContributions(year) {
  console.log(`Fetching contributions for ${year}...`);
  
  try {
    const contributions = await fetchContributions(GITHUB_USERNAME, year);
    
    // Create public/data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'public', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Save to JSON file
    const filePath = path.join(dataDir, `contributions-${year}.json`);
    fs.writeFileSync(filePath, JSON.stringify(contributions, null, 2));
    
    console.log(`✓ Saved ${contributions.totalContributions} contributions for ${year}`);
    return contributions;
  } catch (error) {
    console.error(`✗ Error fetching contributions for ${year}:`, error.message);
    throw error;
  }
}

async function saveCommits() {
  console.log(`Fetching recent commits...`);
  
  try {
    const commits = await fetchRecentCommits(GITHUB_USERNAME, GITHUB_REPO);
    
    // Create public/data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'public', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Save to JSON file
    const filePath = path.join(dataDir, 'commits.json');
    fs.writeFileSync(filePath, JSON.stringify(commits, null, 2));
    
    console.log(`✓ Saved ${commits.length} recent commits`);
    return commits;
  } catch (error) {
    console.error(`✗ Error fetching commits:`, error.message);
    throw error;
  }
}

async function main() {
  const currentYear = new Date().getFullYear();
  const years = [2025, 2026]; // Add more years as needed

  console.log('Starting GitHub data fetch...\n');

  // Fetch contributions
  for (const year of years) {
    if (year <= currentYear) {
      await saveContributions(year);
    } else {
      console.log(`⊘ Skipping ${year} (future year)`);
    }
  }

  // Fetch recent commits
  await saveCommits();

  console.log('\n✓ All data fetched successfully!');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
