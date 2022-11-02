import { Component, OnInit } from '@angular/core';

import { ThemeService } from 'src/app/shared/services/theme.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service';
import { ThemeEnum } from 'src/app/shared/enums/theme.enum';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit {
  switchValue: boolean;
  themeEnum = ThemeEnum;
  constructor(private themeService: ThemeService,
    private localStorageService: LocalStorageService) { 
      const themeValue = this.localStorageService.getTheme();
      if(themeValue === 'light') {
        this.switchValue = true;
      }
      else {
        this.switchValue = false;
      }
    }

  ngOnInit(): void {
  }

    onChange() {
      if(this.switchValue === false) {
        this.themeService.switchTheme(this.themeEnum.LIGHT);
        this.localStorageService.setTheme(this.themeEnum.LIGHT);
      }
      else {
        this.themeService.switchTheme(this.themeEnum.DARK);
        this.localStorageService.setTheme(this.themeEnum.DARK);
      }
    }

}
