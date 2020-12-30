import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatIconModule, MatInputModule, MatSelectModule, MatProgressSpinnerModule,
        MatToolbarModule, MatCardModule, MatSlideToggleModule, MatDialogModule } from '@angular/material';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ImageLabelScreenComponent } from './components/image-label-screen/image-label-screen.component';
import 'hammerjs';
import { environment } from 'src/environments/environment';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DataImageDialogComponent } from './components/data-image-dialog/data-image-dialog.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { InfoComponent } from './components/info/info.component';
import { PageHostDirective } from './directives/page-host.directive';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ImageLabelScreenComponent,
    SideNavComponent,
    DataImageDialogComponent,
    InfoComponent,
    PageHostDirective,
    MainComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule, AngularFireStorageModule, AngularFireDatabaseModule,
    BrowserModule, BrowserAnimationsModule, MatButtonModule, MatIconModule, MatInputModule,
    AppRoutingModule, MatSelectModule, MatToolbarModule, MatCardModule, MatSlideToggleModule,
    MatDialogModule, MatProgressSpinnerModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [AngularFirestore],
  entryComponents: [DataImageDialogComponent, ImageLabelScreenComponent, InfoComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
