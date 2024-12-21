import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Compilation } from '../models/compilation';
import { SAVED_COMPILATIONS } from '../app.constants';

@Component({
  selector: 'compilations',
  templateUrl: 'compilations.page.html',
  styleUrls: ['compilations.page.scss'],
  standalone: false,
})
export class CompilationsPage implements OnInit {
  compilations: Compilation[] | null = null;
  filteredCompilations: Compilation[] | null = null;
  searchTerm: string = '';

  constructor(    
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.compilations = await this.storageService.get(SAVED_COMPILATIONS);
    if (this.compilations) {
      this.compilations.sort((a: Compilation, b: Compilation) => {
        return b.timestamp.getTime() - a.timestamp.getTime();
      });
      this.filteredCompilations = this.compilations;
    }
  }

  navigateToDetail(compilationId: string) {
    this.router.navigate(['tabs/detail', { id: compilationId }]);
  }

  onSearchChange(event: any) {
    const query = event.target.value.toLowerCase();

    if (this.compilations) {
      this.filteredCompilations = this.compilations.filter(compilation => 
        compilation.title.toLowerCase().includes(query)
      );
    }
  }
}