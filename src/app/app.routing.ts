import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/homepage/homepage.module').then(m => m.HomepageModule)
      },
    
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        pathMatch: 'full',
        redirectTo: '/admin/hostels'
      },
      {
        path: 'hostels',
        loadChildren: () => import('./pages/admin/hostels-list/hostels-list.module').then(m => m.HostelsListModule)
      },
      {
        path: 'universities',
        loadChildren: () => import('./pages/admin/universities-list/universities-list.module').then(m => m.UniversitiesListModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/admin/users-list/users-list.module').then(m => m.UsersListModule)
      },
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'top'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
