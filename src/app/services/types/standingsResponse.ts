export interface StandingsResponse {
  get: string
  parameters: Parameters
  errors: string[]
  results: number
  paging: Paging
  response: Response[]
}

export interface Parameters {
  league: string
  season: string
}

export interface Paging {
  current: number
  total: number
}

export interface Response {
  league: League
}

export interface League {
  id: number
  name: string
  country: string
  logo: string
  flag: string
  season: number
  standings: Standing[][]
}

export interface Standing {
  rank: number
  team: Team
  points: number
  goalsDiff: number
  group: string
  form: string
  status: string
  description?: string | null
  all: MatchesDetail
  home: MatchesDetail
  away: MatchesDetail
  update: string
}

export interface Team {
  id: number
  name: string
  logo: string
}

export interface MatchesDetail {
  played: number
  win: number
  draw: number
  lose: number
  goals: Goals
}

export interface Goals {
  for: number
  against: number
}
