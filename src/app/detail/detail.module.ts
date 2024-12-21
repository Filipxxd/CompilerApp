import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailPage } from './detail.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { DetailPageRoutingModule } from './detail-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    DetailPageRoutingModule,
    TranslateModule
  ],
  declarations: [DetailPage]
})
export class DetailPageModule {}
