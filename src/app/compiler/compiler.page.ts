import { Component, OnInit } from '@angular/core';
import { CompilerApiService } from '../_services/compiler-api.service';
import { Language } from '../_models/languages';
import { CompilerRequest, CompilerResponse } from '../_models/compiler.api';
import { Router } from '@angular/router';
import { Compilation } from '../_models/compilation';
import { ToastController } from '@ionic/angular';
import { v4 as uuid } from 'uuid';
import { StateService } from '../_services/state.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'compiler',
  templateUrl: './compiler.page.html',
  styleUrls: ['./compiler.page.scss'],
  standalone: false
})
export class CompilationPage implements OnInit {
  request: CompilerRequest = {
    language: Language.PYTHON,
    code: '',
    input: ''
  };
  existingCompilation: Compilation | null = null;
  languages = Object.values(Language);
  isBusy: boolean = false;

  constructor(
    private compilerApi: CompilerApiService,
    private router: Router,
    private stateService: StateService,    
    private translateService: TranslateService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async ionViewWillEnter(){
    const userSettings = await this.stateService.getUserSettings();
    this.existingCompilation = this.stateService.getCurrentCompilation();

    this.request = this.existingCompilation 
      ? { ...this.existingCompilation.request }
      : { language: userSettings.programmingLanguage, code: '', input: '' };

    this.stateService.setCurrentCompilation(null);
  }

  async onSubmit() {
    this.isBusy = true;

    this.compilerApi.compileCode(this.request).subscribe({
      next: async (response: CompilerResponse) => {
        this.stateService.setCurrentCompilation({
          id: this.existingCompilation?.id  ?? uuid(),
          title: this.existingCompilation?.title ?? 'Untitled',
          request: this.request,
          response: response,
          timestamp: new Date()
        });

        this.router.navigate(['tabs/detail']);
      },
      error: async () => {
        const toast = await this.toastController.create({
          message: this.translateService.instant('shared.toastError'),
          duration: 1500,
          position: 'top',
          icon: 'alert-circle-outline',
          swipeGesture: 'vertical'
        });
        
        await toast.present();
        this.isBusy = false;
      },
      complete: () => this.isBusy = false,
    });
  }
}
