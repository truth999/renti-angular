import { Component, OnInit } from '@angular/core';
import { Language } from '../../models';
import { config } from '../../../../config';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  supportedLanguages: Language[] = config.supportedLanguages;
  currentLanguage: Language = this.supportedLanguages[0];

  constructor(
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.currentLanguage = this.supportedLanguages.find(language => language.code === this.translateService.currentLang);
  }

  changeLanguage(language: Language) {
    this.translateService.use(language.code);
    this.currentLanguage = language;
  }

}
