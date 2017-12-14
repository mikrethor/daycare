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
import { UserComponent } from './components/user/user.component';
import { EducatorComponent } from './components/educator/educator.component';
import { DaycareAdminComponent } from './components/daycareadmin/daycareadmin.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { LoginService } from './services/login-service';
import { ConstantsService } from 'app/services/constants-service';
import { DaycareService } from 'app/services/daycare-service';

@NgModule({
  declarations: [
    AppComponent,LoginComponent,UserComponent,EducatorComponent,DaycareAdminComponent,NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    routing

  ],
  providers: [LoginService,ConstantsService,DaycareService, { provide: LocationStrategy, useClass: HashLocationStrategy, },
    { provide: APP_BASE_HREF, useValue: '/', },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
