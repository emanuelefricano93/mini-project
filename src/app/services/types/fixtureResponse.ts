export interface FixtureResponse {
  get: string
  parameters: Parameters
  errors: string[]
  results: number
  paging: Paging
  response: Fixture[]
}

export interface Parameters {
  live: string
}

export interface Paging {
  current: number
  total: number
}

export interface Fixture {
  fixture: FixtureDetail
  league: FixtureLeague
  teams: Teams
  goals: Goals
  score: Score
}

export interface FixtureDetail {
  id: number
  referee: string | null
  timezone: string
  date: string
  timestamp: number
  periods: Periods
  venue: Venue | null
  status: Status
}

export interface Periods {
  first: number
  second: number
}

export interface Venue {
  id: number | null
  name: string
  city: string
}

export interface Status {
  long: string
  short: string
  elapsed: number
}

export interface FixtureLeague {
  id: number
  name: string
  country: string
  logo: string
  flag: string | null
  season: number
  round: string
}

export interface Teams {
  home: Team
  away: Team
}

export interface Team {
  id: number
  name: string
  logo: string
  winner: boolean
}

export interface Goals {
  home: number
  away: number
}

export interface Score {
  halftime: Result
  fulltime: Result
  extratime: Result
  penalty: Result
}

export interface Result {
  home: number | null
  away: number | null
}
