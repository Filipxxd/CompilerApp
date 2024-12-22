import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationPage } from './navigation.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: NavigationPage,
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
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
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
export class NavigationPageRoutingModule {}
