import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompilationsPage } from './compilations.page';

const routes: Routes = [
  {
    path: '',
    component: CompilationsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompilationsPageRoutingModule {}
