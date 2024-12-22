import { Component, OnInit } from '@angular/core';
import { LanguageDisplayNames } from '../_models/languages';
import { UserSettings } from '../_models/userSettings';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
import { StateService } from '../_services/state.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false
})
export class SettingsPage implements OnInit {
  public languageDisplayNames = LanguageDisplayNames;
  userSettings: UserSettings | null = null;
  internalizationLanguages: string[] = [];

  constructor(
    private translate: TranslateService,
    private stateService: StateService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
      this.internalizationLanguages = this.translate.getLangs();
  }

  async ionViewWillEnter() {
      this.userSettings = await this.stateService.getUserSettings();
  }

  async changeInternalizationLanguage(event: CustomEvent){
    const lang = event.detail.value;

    if (this.internalizationLanguages.includes(lang))
    {
      this.userSettings!.internalization = lang;
      await this.stateService.setUserSettings(this.userSettings!);
      this.translate.use(lang);

      const toast = await this.toastController.create({
        message: this.translate.instant('settingsPage.toastSuccess'),
        duration: 1500,
        position: 'top',
        icon: 'checkmark-outline',
        swipeGesture: 'vertical'
      });
      
      await toast.present();
    }else{
      const toast = await this.toastController.create({
        message: this.translate.instant('shared.toastError'),
        duration: 1500,
        position: 'top',
        icon: 'alert-circle-outline',
        swipeGesture: 'vertical'
      });

      await toast.present();
    }
  }
}
