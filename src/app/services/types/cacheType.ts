export interface CacheType<T> {
  [key: string]: {values: T[], insertTime: Date}
}
