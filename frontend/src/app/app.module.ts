import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF } from '@angular/common';

import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

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
import { AdminEditChildComponent } from './components/daycareadmin/edit-child.component';
import { LoginService } from './services/login-service';
import { ConstantsService } from 'app/services/constants-service';
import { DateService } from 'app/services/date-service';
import { ChildServiceImpl, ChildService } from 'app/services/child-service';
import { DaycareServiceImpl, DaycareService } from 'app/services/daycare-service';
import { EducatorServiceImpl ,EducatorService } from 'app/services/educator-service';
import { ParentServiceImpl, ParentService } from 'app/services/parent-service';
import { SumupServiceImpl, SumupService } from 'app/services/sumup-service';
import { UserService } from 'app/services/user-service';
import {AdminEditUserComponent} from "./components/daycareadmin/edit-user.components";
import {AdminUserComponent} from "./components/daycareadmin/user.component";
import {RoleService} from "./services/role-service";

@NgModule({
    declarations: [
        AppComponent,LoginComponent,LogoutComponent,UserComponent,EducatorComponent,ParentComponent,
        DaycareAdminComponent,NavbarComponent,EditSumupsComponent,AdminChildComponent,
        AdminEditChildComponent,
        AdminEditUserComponent,AdminUserComponent
    ],
    imports: [
        LoggerModule.forRoot({serverLoggingUrl: '/api/logs', level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR}),
        BrowserModule,
        FormsModule,
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule,
        routing

    ],
    providers: [LoginService,ConstantsService,UserService,DateService,RoleService,
        { provide: LocationStrategy, useClass: HashLocationStrategy, },
        { provide: APP_BASE_HREF, useValue: '/', },
        { provide : ChildService, useClass:ChildServiceImpl},
        { provide : DaycareService, useClass:DaycareServiceImpl},
        { provide : EducatorService, useClass:EducatorServiceImpl},
        { provide : ParentService, useClass:ParentServiceImpl},
        { provide : SumupService, useClass:SumupServiceImpl},
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
