import { Injectable } from '@angular/core';
import { UserSettings } from '../_models/userSettings';
import { Language } from '../_models/languages';
import { DEFAULT_APP_LANGUAGE, USER_SETTINGS } from '../app.constants';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private userSettings: UserSettings | null = null;

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
}
