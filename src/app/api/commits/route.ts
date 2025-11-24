import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const owner = 'parasxparkash'
    const repo = 'parasxparkash.github.io'
    
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=2`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch commits')
    }

    const commits = await response.json()
    
    const formattedCommits = commits.map((commit: any) => ({
      sha: commit.sha.substring(0, 7),
      message: commit.commit.message.split('\n')[0], // First line of commit message
      date: commit.commit.author.date,
      url: commit.html_url,
      author: commit.commit.author.name
    }))

    return NextResponse.json(formattedCommits)
  } catch (error) {
    console.error('Error fetching commits:', error)
    return NextResponse.json({ error: 'Failed to fetch commits' }, { status: 500 })
  }
}

