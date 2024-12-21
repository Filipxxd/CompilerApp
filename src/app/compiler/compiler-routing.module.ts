import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompilationPage } from './compiler.page';

const routes: Routes = [
  {
    path: '',
    component: CompilationPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompilationPageRoutingModule {}
