import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompilationPage } from './compiler.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CompilationPageRoutingModule } from './compiler-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    CompilationPageRoutingModule,
    TranslateModule
  ],
  declarations: [CompilationPage]
})
export class CompilationPageModule {}
