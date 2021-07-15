import { LoginComponent } from './view/auth/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './view/layout/layout/layout.component';
import { ViewCategoriesComponent } from './view/categories/view-categories/view-categories.component';
import { BoardComponent } from './view/board/board/board.component';
import { PageNotFoundComponent } from './view/components/page-not-found/page-not-found.component';
import { AuthGuard } from './services/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'error',
    component: PageNotFoundComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'categorias',
        component: ViewCategoriesComponent,
      },
      {
        path: 'tablero/:id',
        component: BoardComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'error',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
