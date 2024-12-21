import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompilationsPage } from './compilations.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CompilationsPageRoutingModule } from './compilations-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    CompilationsPageRoutingModule
  ],
  declarations: [CompilationsPage]
})
export class CompilationsPageModule {}
