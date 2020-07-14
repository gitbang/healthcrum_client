import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { HomeModule } from "./home/home.module";
import { CompanyModule } from "./company/company.module";
import { DoctorModule } from "./doctor/doctor.module";
import { PatientModule } from "./patient/patient.module";
import { AdminLayoutModule } from "./admin/admin-layout.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ErrorpageComponent } from "./errorpage/errorpage.component";
import { ChartsModule } from "ng2-charts";
import { MapsComponent } from "./maps/maps.component";
import {
  SocialLoginModule,
  AuthServiceConfig,
  LoginOpt
} from "angularx-social-login";

import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from "angularx-social-login";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
registerLocaleData(en);
import { NZ_I18N, en_US } from "ng-zorro-antd/i18n";
const fbLoginOptions: LoginOpt = {
  scope:
    "pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages",
  return_scopes: true,
  enable_profile_selector: true
}; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11

const googleLoginOptions: LoginOpt = {
  scope: "profile email"
};
//2550504528540252
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      "1017141930490-47e1u6484cls0o66hinlnn7ievgmhotu.apps.googleusercontent.com",
      googleLoginOptions
    )
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("2550504528540252", fbLoginOptions)
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    CompanyModule,
    DoctorModule,
    PatientModule,
    AdminLayoutModule,
    FontAwesomeModule,
    SocialLoginModule,
    ChartsModule
  ],
  declarations: [
    AppComponent,
    ErrorpageComponent,
    MapsComponent,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    { provide: NZ_I18N, useValue: en_US }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
