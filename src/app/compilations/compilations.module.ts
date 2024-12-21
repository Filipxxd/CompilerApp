import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompilationsPage } from './compilations.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CompilationsPageRoutingModule } from './compilations-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    CompilationsPageRoutingModule,
    TranslateModule
  ],
  declarations: [CompilationsPage]
})
export class CompilationsPageModule {}
