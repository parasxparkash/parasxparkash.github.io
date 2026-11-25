import year2023 from './contributions-2023.json'
import year2024 from './contributions-2024.json'
import year2025 from './contributions-2025.json'
import year2026 from './contributions-2026.json'

export const contributionYears = [2023, 2024, 2025, 2026] as const
export type ContributionYear = (typeof contributionYears)[number]

export interface CompactContributions {
  total: number
  start: string
  weeks: number[][]
}

const byYear: Record<ContributionYear, CompactContributions> = {
  2023: year2023,
  2024: year2024,
  2025: year2025,
  2026: year2026,
}

export function getContributions(year: ContributionYear): CompactContributions {
  return byYear[year]
}
