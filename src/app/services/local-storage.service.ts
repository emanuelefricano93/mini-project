import { Injectable } from '@angular/core';
import { Standing } from './types/standingsResponse';
import { Fixture } from './types/fixtureResponse';
import { CacheType } from './types/cacheType';


export type localStorageSimpleKey = "LAST_COUNTRY_SELECTED";
export type localStorageKey = 'STANDINGS' | 'FIXTURES';
export type localStorageTypeValue = CacheType<Standing | Fixture>;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem<T>(key: localStorageKey): T | undefined{
    const localStorageItem = localStorage.getItem(key);
    return localStorageItem ? JSON.parse(localStorageItem) as T : undefined;
  }

  getSimpleItem(key: localStorageSimpleKey): string {
    return localStorage.getItem(key) || '';
  }

  setItem<T>(key: localStorageKey, value: T){
    return localStorage.setItem(key, JSON.stringify(value));
  }

  setSimpleItem(key: localStorageSimpleKey, value: string) {
    localStorage.setItem(key, value);
  }
}
