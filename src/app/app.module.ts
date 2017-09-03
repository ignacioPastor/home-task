import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SetData } from '../pages/set-data/set-data';
import { SetDataAssigned } from '../pages/set-data-assigned/set-data-assigned';
import { ToggleTypeSetData } from '../pages/toggle-type-set-data/toggle-type-set-data';
import { EditUserPage } from '../pages/edit-user/edit-user';
import { SettingsPage } from '../pages/settings/settings';
import { ReportBugPage } from '../pages/report-bug/report-bug';

import { NavbarComponent } from '../components/navbar/navbar';

import { NotificationProvider } from '../providers/notification/notification';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SetData,
    SetDataAssigned,
    ToggleTypeSetData,
    EditUserPage,
    NavbarComponent,
    LoginPage,
    SignupPage,
    SettingsPage,
    ReportBugPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SetData,
    SetDataAssigned,
    EditUserPage,
    ToggleTypeSetData,
    LoginPage,
    SignupPage,
    SettingsPage,
    ReportBugPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NotificationProvider,
    AuthProvider,
    UserProvider
  ]
})
export class AppModule {}
