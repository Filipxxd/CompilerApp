import { Component, OnInit } from '@angular/core';
import { CompilerApiService } from '../services/compiler-api.service';
import { Language, LanguageDisplayNames } from '../models/languages';
import { CompilerRequest, CompilerResponse } from '../models/compiler.api';
import { Router } from '@angular/router';
import { SharedDataService } from '../services/shared-data.service';
import { Compilation } from '../models/compilation';
import { ToastController } from '@ionic/angular';
import { v4 as uuid } from 'uuid';

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
    private sharedDataService: SharedDataService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async ionViewWillEnter(){
    const savedCompilation = this.sharedDataService.getSavedCompilation();
    if (savedCompilation) {
      this.isEditMode = true;
      this.compilationId = savedCompilation.id;
      this.request = { ...savedCompilation.request };
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
        const savedCompilation: Compilation = {
          id: this.isEditMode ? this.compilationId! : uuid(),
          title: this.isEditMode ? this.sharedDataService.getSavedCompilation()!.title : 'Untitled Compiler',
          request: this.request,
          response: response,
          timestamp: new Date()
        };

        this.sharedDataService.setSavedCompilation(savedCompilation);

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
