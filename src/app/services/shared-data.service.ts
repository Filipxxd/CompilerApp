import { Injectable } from '@angular/core';
import { Compilation } from '../models/compilation';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private savedCompilation: Compilation | null = null;

  setSavedCompilation(compilation: Compilation) {
    this.savedCompilation = compilation;
  }

  getSavedCompilation(): Compilation | null {
    return this.savedCompilation;
  }

  clear() {
    this.savedCompilation = null;
  }
}