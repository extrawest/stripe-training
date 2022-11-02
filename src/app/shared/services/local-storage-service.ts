import { Injectable } from '@angular/core';
import { ThemeEnum } from '../enums/theme.enum';

/**
 * local storage service
 */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
    defaultTheme = 'light';
    themeItem = 'theme';
    isNull = (value: any) => value === null;
    constructor() {}
  /**
   * set value to local storage
   * @param key   - local storage key
   * @param value - setting value
   */
   setValue(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  /**
   * get value from local storage
   * @param key - local storage key
   */
   getValue(key: string): string | null {
    return localStorage.getItem(key);
  }

  /**
   * check if local storage has value
   * @param key - local storage key
   */
   hasValue(key: string): boolean {
    return !this.isNull(localStorage.getItem(key));
  }

  /**
   * remove key from local storage
   * @param key - local storage key
   */
   removeValue(key: string): void {
    return localStorage.removeItem(key);
  }


  /**
   * set theme
   * @param theme - theme
   */
   setTheme(theme: string): void {
    localStorage.setItem(this.themeItem, JSON.stringify(theme));
  }

  /**
   * get theme
   */
  getTheme(): ThemeEnum {
    return this.hasThemeValue() ? JSON.parse(this.getValue(this.themeItem) || this.defaultTheme) : null;
  }

  /**
   * check if theme value is not empty
   */
  hasThemeValue(): boolean {
    return this.hasValue(this.themeItem);
  }
}