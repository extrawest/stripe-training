import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeEnum } from '../enums/theme.enum';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  switchTheme(theme: string) {
    let themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    if (themeLink && theme === ThemeEnum.LIGHT) {
      themeLink.href = 'ng-zorro-antd.css';
    } else if (themeLink && theme === ThemeEnum.DARK) {
      themeLink.href = 'ng-zorro-antd-dark.css';
    }
  }
}
