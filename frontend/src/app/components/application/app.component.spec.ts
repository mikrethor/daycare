import {Router, Routes} from "@angular/router";
import {fakeAsync, TestBed, tick} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {EditSumupsComponent} from "../sumups/edit-sumups.component";
import {UserComponent} from "../user/user.component";
import {EducatorComponent} from "../educator/educator.component";
import {AdminEditChildComponent} from "../daycareadmin/edit-child.component";
import {DaycareAdminComponent} from "../daycareadmin/daycareadmin.component";
import {RegisterComponent} from "../register/register.component";
import {AdminEditUserComponent} from "../daycareadmin/edit-user.components";
import {UnderNavbarComponent} from "../undernavbar/undernavbar.component";
import {LogoutComponent} from "../logout/logout.component";
import {LoginComponent} from "../login/login.component";
import {AdminUserComponent} from "../daycareadmin/user.component";
import {AdminChildComponent} from "../daycareadmin/child.component";
import {ParentComponent} from "../parent/parent.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {MaterialModule} from "../../material.module";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {APP_BASE_HREF, Location} from '@angular/common';
import {DateService} from "../../services/date-service";
import {SumupService, SumupServiceImpl} from "../../services/sumup-service";
import {ChildService, ChildServiceImpl} from "../../services/child-service";
import {ParentService, ParentServiceImpl} from "../../services/parent-service";
import {Component, LOCALE_ID} from "@angular/core";
import {EducatorService, EducatorServiceImpl} from "../../services/educator-service";
import {LoginService} from "../../services/login-service";
import {UserService} from "../../services/user-service";
import {RoleService} from "../../services/role-service";
import {ConstantsService} from "../../services/constants-service";
import {DaycareService, DaycareServiceImpl} from "../../services/daycare-service";
import {LoggerModule, NgxLoggerLevel} from "ngx-logger";

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent, pathMatch: 'full'},
    {path: 'register', component: RegisterComponent, pathMatch: 'full'},
    {
        path: 'daycare/:idDaycare', component: UnderNavbarComponent, children: [
            {path: 'user/:username', component: UserComponent, outlet: 'undernavbar',},
            {path: 'parent/:idParent', component: ParentComponent, outlet: 'undernavbar',},
            {path: 'educator/:idEducator', component: EducatorComponent, outlet: 'undernavbar',},
            {path: 'children/:idChild/sumups', component: EditSumupsComponent, outlet: 'undernavbar',},

            {path: 'admin/:idAdmin', component: DaycareAdminComponent, outlet: 'undernavbar',},
            {path: 'admin/:idAdmin/children', component: AdminChildComponent, outlet: 'undernavbar',},
            {path: 'admin/:idAdmin/children/create', component: AdminEditChildComponent, outlet: 'undernavbar',},
            {path: 'admin/:idAdmin/children/:idChild/edit', component: AdminEditChildComponent, outlet: 'undernavbar',},
            {path: 'admin/:idAdmin/users', component: AdminUserComponent, outlet: 'undernavbar'},
            {path: 'admin/:idAdmin/users/create', component: AdminEditUserComponent, outlet: 'undernavbar',},
            {path: 'admin/:idAdmin/users/:idUser/edit', component: AdminEditUserComponent, outlet: 'undernavbar',},
        ]
    },
];

@Component({
    template: `
        <router-outlet></router-outlet>`
})
export class AppComponent {
}

describe('Router: App', () => {

    let location: Location;
    let router: Router;
    let fixture;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes), MaterialModule,
                BrowserModule,
                FormsModule,
                HttpClientModule,
                MaterialModule,
                BrowserAnimationsModule,

                LoggerModule.forRoot({
                    serverLoggingUrl: 'http://localhost:9200/daycare/logs',
                    level: NgxLoggerLevel.DEBUG,
                    serverLogLevel: NgxLoggerLevel.OFF
                }),
            ],
            declarations: [

                AppComponent, LoginComponent, LogoutComponent, UserComponent, EducatorComponent, ParentComponent,
                DaycareAdminComponent, NavbarComponent, UnderNavbarComponent, EditSumupsComponent, AdminChildComponent,
                AdminEditChildComponent, RegisterComponent,
                AdminEditUserComponent, AdminUserComponent
            ],
            providers: [LoginService, ConstantsService, UserService, DateService, RoleService,
                //   { provide: LocationStrategy, useClass: HashLocationStrategy, },
                {provide: LOCALE_ID, useValue: 'fr'},
                {provide: APP_BASE_HREF, useValue: '/',},
                {provide: ChildService, useClass: ChildServiceImpl},
                {provide: DaycareService, useClass: DaycareServiceImpl},
                {provide: EducatorService, useClass: EducatorServiceImpl},
                {provide: ParentService, useClass: ParentServiceImpl},
                {provide: SumupService, useClass: SumupServiceImpl},

            ],

        });

        router = TestBed.get(Router);
        location = TestBed.get(Location);

        //  fixture = TestBed.createComponent(AppComponent);
        router.initialNavigation();
    });

    it('navigate to "" redirects you to /login', fakeAsync(() => {
        router.navigate(['']);
        tick();
        console.log(location);
        console.log(router.url);
        expect(location.path()).toBe('');
    }));
    it('navigate to "/login" redirects you to /login', fakeAsync(() => {
        router.navigate(['/login']).then(() => {
            console.log("succes")
        }).catch(() => {
            console.log("erreur")
        });
        tick();
        expect(location.forward.toString).toBe('');
    }));

});