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
import { LogoutComponent } from './components/logout/logout.component';
import { UserComponent } from './components/user/user.component';
import { EducatorComponent } from './components/educator/educator.component';
import { ParentComponent } from './components/parent/parent.component';
import { DaycareAdminComponent } from './components/daycareadmin/daycareadmin.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EditSumupsComponent } from './components/sumups/edit-sumups.component';
import { AdminChildComponent } from './components/daycareadmin/child.component';
import { AdminEducatorComponent } from './components/daycareadmin/educator.component';
import { AdminParentComponent } from './components/daycareadmin/parent.component';
import { AdminEditChildComponent } from './components/daycareadmin/edit-child.component';
import { AdminEditEducatorComponent } from './components/daycareadmin/edit-educator.component';
import { AdminEditParentComponent } from './components/daycareadmin/edit-parent.component';
import { LoginService } from './services/login-service';
import { ConstantsService } from 'app/services/constants-service';
import { DaycareServiceImpl ,DaycareService } from 'app/services/daycare-service';
import { UserService } from 'app/services/user-service';

@NgModule({
  declarations: [
    AppComponent,LoginComponent,LogoutComponent,UserComponent,EducatorComponent,ParentComponent,
    DaycareAdminComponent,NavbarComponent,EditSumupsComponent,AdminChildComponent,AdminEducatorComponent,
    AdminParentComponent,AdminEditChildComponent,AdminEditEducatorComponent,AdminEditParentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    routing

  ],
  providers: [LoginService,ConstantsService,UserService, 
    { provide: LocationStrategy, useClass: HashLocationStrategy, },
    { provide: APP_BASE_HREF, useValue: '/', },
    { provide : DaycareService, useClass:DaycareServiceImpl},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
