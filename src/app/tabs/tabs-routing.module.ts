import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'compiler',
        loadChildren: () => import('../compiler/compiler.module').then(m => m.CompilationPageModule)
      },
      {
        path: 'compilations',
        loadChildren: () => import('../compilations/compilations.module').then(m => m.CompilationsPageModule)
      },
      {
        path: 'detail',
        loadChildren: () => import('../detail/detail.module').then(m => m.DetailPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/compiler',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/compiler',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
