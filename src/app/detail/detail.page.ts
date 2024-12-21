import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { Compilation } from '../models/compilation';
import { SAVED_COMPILATIONS } from '../app.constants';
import { SharedDataService } from '../services/shared-data.service';
import { LanguageDisplayNames } from '../models/languages';

@Component({
  selector: 'detail',
  templateUrl: 'detail.page.html',
  styleUrls: ['detail.page.scss'],
  standalone: false
})
export class DetailPage implements OnInit {
  public languageDisplayNames = LanguageDisplayNames;
  compilation: Compilation | null = null;
  alreadySaved: boolean = false;

  constructor(    
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private sharedDataService: SharedDataService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.alreadySaved = true;
    const compilationId = this.route.snapshot.paramMap.get('id');

    if (compilationId) {
      const compilations = await this.storageService.get(SAVED_COMPILATIONS) as Compilation[];
      this.compilation = compilations.find((c) => c.id === compilationId) || null;
    } else {
      this.compilation = this.sharedDataService.getSavedCompilation();
      this.alreadySaved = false;
    }

    this.sharedDataService.clear();

    if (!this.compilation){
        const toast = await this.toastController.create({
          message: 'Compiler not found',
          duration: 1500,
          position: 'top',
          icon: 'alert-circle-outline',
          swipeGesture: 'vertical'
        });
        
        await toast.present();
        this.router.navigate(['/tabs/compilations']);
    }
  }

  async onSave() {
    if (!this.compilation) return;

    const compilations = (await this.storageService.get(SAVED_COMPILATIONS)) || [] as Compilation[];

    const index = compilations.findIndex((c: { id: string; }) => c.id === this.compilation!.id);
    if (index !== -1) {
      compilations[index] = this.compilation;
    } else {
      compilations.push(this.compilation);
    }

    this.storageService.set(SAVED_COMPILATIONS, compilations);

    const toast = await this.toastController.create({
      message: 'Compiler has been saved',
      duration: 1500,
      position: 'top',
      icon: 'checkmark-outline',
      swipeGesture: 'vertical'
    });

    await toast.present();
    this.alreadySaved = true;
  }

  async onEdit() {
    if (!this.compilation) return;

    this.sharedDataService.setSavedCompilation(this.compilation);
    this.router.navigate(['/tabs/compilation']);
  }

  async onDelete() {
    const alert = await this.alertController.create({
      header: 'Delete Compiler',
      message: 'Are you sure you want to delete this compilation?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: async () => {
            if (this.alreadySaved){
              const compilations = (await this.storageService.get(SAVED_COMPILATIONS)) || [] as Compilation[];
              const updatedCompilations = compilations.filter((c: { id: string; }) => c.id !== this.compilation!.id);
              this.storageService.set(SAVED_COMPILATIONS, updatedCompilations);
            }
            this.router.navigate(['/tabs/compilations']);

            const toast = await this.toastController.create({
              message: 'Compiler has been deleted',
              duration: 1500,
              position: 'top',
              icon: 'checkmark-outline',
              swipeGesture: 'vertical'
            });

            await toast.present();
          }
        }
      ]
    });

    await alert.present();
  }
}