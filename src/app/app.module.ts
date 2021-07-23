import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { LoginComponent } from './view/auth/login/login.component';
import { LayoutComponent } from './view/layout/layout/layout.component';
import { ViewCategoriesComponent } from './view/categories/view-categories/view-categories.component';
import { HeaderComponent } from './view/layout/header/header.component';
import { CardComponent } from './view/components/card/card.component';
import { BoardComponent } from './view/board/board/board.component';
import { AuthInterceptor } from './services/interceptor/auth.interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PageNotFoundComponent } from './view/components/page-not-found/page-not-found.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { CategoriesEditGridComponent } from './view/board/categories-edit-grid/categories-edit-grid.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    ViewCategoriesComponent,
    HeaderComponent,
    CardComponent,
    BoardComponent,
    PageNotFoundComponent,
    CategoriesEditGridComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastModule,
    ConfirmDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
