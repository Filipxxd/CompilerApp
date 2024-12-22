import { Component, OnInit } from '@angular/core';
import { CompilerApiService } from '../_services/compiler-api.service';
import { Language, LanguageDisplayNames } from '../_models/languages';
import { CompilerRequest, CompilerResponse } from '../_models/compiler.api';
import { Router } from '@angular/router';
import { Compilation } from '../_models/compilation';
import { ToastController } from '@ionic/angular';
import { v4 as uuid } from 'uuid';
import { StateService } from '../_services/state.service';

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
  public languageDisplayNames = LanguageDisplayNames;
  languages = Object.values(Language);
  isEditMode: boolean = false;
  isBusy: boolean = false;
  compilationId: string | null = null;

  constructor(
    private compilerApi: CompilerApiService,
    private router: Router,
    private stateService: StateService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async ionViewWillEnter(){
    const currentCompilation = this.stateService.getCurrentCompilation();

    if (currentCompilation) {
      this.isEditMode = true;
      this.compilationId = currentCompilation.id;
      this.request = { ...currentCompilation.request };
    }else{
      this.request = {
        language: Language.PYTHON,
        code: '',
        input: ''
      };
      this.compilationId = null;
      this.isEditMode = false;
    }
  }

  async onSubmit() {
    this.isBusy = true;

    this.compilerApi.compileCode(this.request).subscribe({
      next: async (response: CompilerResponse) => {
        const compilation: Compilation = {
          id: this.isEditMode ? this.compilationId! : uuid(),
          title: this.isEditMode ? this.stateService.getCurrentCompilation()!.title : 'Untitled Compiler',
          request: this.request,
          response: response,
          timestamp: new Date()
        };

        this.stateService.setCurrentCompilation(compilation);

        this.router.navigate(['tabs/detail']);
      },
      error: async (error: any) => {
        const toast = await this.toastController.create({
          message: 'Compiler not found',
          duration: 1500,
          position: 'top',
          icon: 'alert-circle-outline',
          swipeGesture: 'vertical'
        });
        
        await toast.present();
        this.isBusy = false;
        console.error('Compiler error:', error);
      },
      complete: async () => {
        this.isBusy = false;
      }
    });
  }
}
