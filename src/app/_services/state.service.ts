import { Injectable } from '@angular/core';
import { UserSettings } from '../_models/userSettings';
import { Language } from '../_models/languages';
import { DEFAULT_APP_LANGUAGE, SAVED_COMPILATIONS, USER_SETTINGS } from '../app.constants';
import { StorageService } from './storage.service';
import { Compilation } from '../_models/compilation';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private userSettings: UserSettings | null = null;
  private currentCompilation: Compilation | null = null;
  private compilations: Compilation[] | null = null;

  constructor(
    private storageService: StorageService,
  ) { }

  async setUserSettings(userSettings: UserSettings) {
    this.userSettings = userSettings;
    await this.storageService.set(USER_SETTINGS, this.userSettings);
  }

  async getUserSettings(): Promise<UserSettings> {
    if (!this.userSettings){
      this.userSettings = await this.storageService.get(USER_SETTINGS);
      
      if (!this.userSettings){
        this.userSettings = {
          internalization: DEFAULT_APP_LANGUAGE,
          theme: 'light',
          language: Language.PYTHON
        };

        await this.storageService.set(USER_SETTINGS, this.userSettings);
      }
    }

    return this.userSettings;
  }

  setCurrentCompilation(compilation: Compilation | null) {
    this.currentCompilation = compilation;
  }

  getCurrentCompilation(): Compilation | null {
    return this.currentCompilation;
  }

  async setCompilations(compilations: Compilation[]) {
    this.compilations = compilations;
    await this.storageService.set(SAVED_COMPILATIONS, this.compilations);
  }

  async getCompilations(): Promise<Compilation[]> {
    if (!this.compilations){
      this.compilations = await this.storageService.get(SAVED_COMPILATIONS);
      
      if (!this.compilations){
        this.compilations = [];
        await this.storageService.set(SAVED_COMPILATIONS, this.compilations);
      }
    }

    return this.compilations;
  }
}
