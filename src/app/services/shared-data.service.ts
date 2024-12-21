import { Injectable } from '@angular/core';
import { CompilerRequest, CompilerResponse } from '../models/compiler.api';
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