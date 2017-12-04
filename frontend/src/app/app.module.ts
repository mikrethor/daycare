import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF } from '@angular/common';

import { routing } from './components/app.routing';
import { AppComponent } from './components/application/app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { LoginService } from './services/login-service';
import { ConstantsService } from 'app/services/constants-service';

@NgModule({
  declarations: [
    AppComponent,LoginComponent,NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    routing

  ],
  providers: [LoginService,ConstantsService, { provide: LocationStrategy, useClass: HashLocationStrategy, },
    { provide: APP_BASE_HREF, useValue: '/', },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
