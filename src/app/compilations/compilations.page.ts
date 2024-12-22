import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Compilation } from '../_models/compilation';
import { Language, LanguageDisplayNames } from '../_models/languages';
import { StateService } from '../_services/state.service';

@Component({
  selector: 'compilations',
  templateUrl: 'compilations.page.html',
  styleUrls: ['compilations.page.scss'],
  standalone: false
})
export class CompilationsPage implements OnInit {
  public languageDisplayNames = LanguageDisplayNames;
  filteredCompilations: Compilation[] | null = null;
  searchTerm: string = '';
  selectedLanguage: Language | null = null;
  languages = [null, ...Object.values(Language)];

  constructor(
    private router: Router,
    private stateService: StateService
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    const compilations = await this.stateService.getCompilations();

    if (compilations) {
      compilations.sort((a: Compilation, b: Compilation) => b.timestamp.getTime() - a.timestamp.getTime());
      this.filteredCompilations = compilations;
    }
  }

  navigateToDetail(compilationId: string) {
    this.router.navigate(['tabs/detail', { id: compilationId }]);
  }

  onSearchChange(event: any) {
    const query = event.target.value.toLowerCase();
    this.applyFilters(query, this.selectedLanguage);
  }

  onLanguageChange(event: any) {
    this.selectedLanguage = event.detail.value;
    this.applyFilters(this.searchTerm, this.selectedLanguage);
  }

  async applyFilters(searchTerm: string, language: Language | null) {
    const compilations = await this.stateService.getCompilations();

    if (compilations) {
      this.filteredCompilations = compilations.filter(compilation => {
        const matchesSearchTerm = compilation.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLanguage = language === null || compilation.request.language === language;
        return matchesSearchTerm && matchesLanguage;
      });
    }
  }
}