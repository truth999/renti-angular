import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import {
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
  NgxUiLoaderModule, POSITION, SPINNER,
} from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

import { config } from '../config';

import { MyProfileService } from './modules/my-profile/services/my-profile.service';
import { MyPropertiesService } from './modules/my-properties/services/my-properties.service';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { environment } from '../environments/environment';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: config.siteColor,
  bgsPosition: POSITION.centerCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce,
  hasProgressBar: false,
  logoPosition: POSITION.centerCenter,
  logoSize: 120,
  logoUrl: 'assets/images/logo-no-title.png',
};

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: environment.mqtt.hostname,
  port: environment.mqtt.port,
  path: '/',
  protocol: 'ws'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CoreModule,
    SharedModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({ exclude: config.excludeLoaderRoutes }),
    AgmCoreModule.forRoot(),
    AgmJsMarkerClustererModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
  ],
  providers: [
    MyProfileService,
    MyPropertiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
