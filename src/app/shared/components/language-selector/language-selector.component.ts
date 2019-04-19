import { Component, OnInit } from '@angular/core';
import { Language } from '../../models/shared.model';
import { config } from '../../../../config';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

  availableLanguages: Language[] = config.availableLanguages;
  currentLanguage: Language = this.availableLanguages[0];

  constructor(
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.currentLanguage = this.availableLanguages.find(language => language.code === this.translateService.currentLang);
  }

  changeLanguage(language: Language) {
    this.translateService.use(language.code);
    this.currentLanguage = language;
  }

}
