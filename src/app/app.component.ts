import { Component } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme/theme.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { ThemeEnum } from './shared/enums/theme.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  defaultTheme = ThemeEnum.LIGHT;
  constructor(
    private localStorageService: LocalStorageService,
    private themeService: ThemeService
  ) {
    this.setTheme();
  }

  setTheme(): void {
    const hasThemeValue = this.localStorageService.hasThemeValue();

    if (hasThemeValue) {
      const themeValue = this.localStorageService.getTheme();
      this.themeService.switchTheme(themeValue);
      this.localStorageService.setTheme(themeValue);
    } else {
      this.localStorageService.setTheme(this.defaultTheme);
    }
  }
}
