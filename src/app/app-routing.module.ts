import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';

// import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule)
      },
      {
        path: 'transactions',
        loadChildren: () => import('./pages/transactions/transactions.module').then(m => m.TransactionsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {path: '**', redirectTo: 'login'}
];

// export const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'login',
//     pathMatch: 'full',
//   },
//   {
//     path: 'login',
//     loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
//     data: {
//       title: 'Login Page'
//     }
//   },
//   {
//     path: 'register',
//     component: RegisterComponent,
//     data: {
//       title: 'Register Page'
//     }
//   },
//   {
//     path: '',
//     component: DefaultLayoutComponent,
//     canActivate: [AuthGuard],
//     data: {
//       title: 'Home'
//     },
//     children: [

//       {
//         path: 'reports',
//         loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule)
//       },
//       {
//         path: 'transactions',
//         loadChildren: () => import('./pages/transactions/transactions.module').then(m => m.TransactionsModule)
//       },
//       {
//         path: 'dashboard',
//         loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
//       },
//     ]
//   }
// ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
