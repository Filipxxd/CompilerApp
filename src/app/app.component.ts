import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserSettings } from './_models/userSettings';
import { StateService } from './_services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private translateService: TranslateService,
    private stateService: StateService) {}

  ngOnInit() {
    this.translateService.addLangs(['english', 'czech']);

    this.stateService.getUserSettings().then((userSettings: UserSettings) => {
      this.translateService.use(userSettings.internalization);
    });
  }
}
