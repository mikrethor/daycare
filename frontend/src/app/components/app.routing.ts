import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {ParentComponent} from './parent/parent.component';
import {EducatorComponent} from './educator/educator.component';
import {DaycareAdminComponent} from './daycareadmin/daycareadmin.component';
import {AdminChildComponent} from './daycareadmin/child.component';
import {AdminEditChildComponent} from './daycareadmin/edit-child.component';
import {EditSumupsComponent} from './sumups/edit-sumups.component';
import {AdminEditUserComponent} from "./daycareadmin/edit-user.components";
import {AdminUserComponent} from "./daycareadmin/user.component";
import {UnderNavbarComponent} from "./undernavbar/undernavbar.component";
import {UserComponent} from "./user/user.component";

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent, pathMatch: 'full' },
    // { path: 'daycare/user/:username', component: UserComponent },
    { path: 'daycare/:idDaycare', component: UnderNavbarComponent , children:[
            // { path: '', redirectTo: 'user/:username'},
            { path: 'user/:username', component: UserComponent, outlet:'undernavbar',},
            { path: 'parent/:idParent', component: ParentComponent ,outlet:'undernavbar', },
            { path: 'educator/:idEducator', component: EducatorComponent,outlet:'undernavbar', },
            { path: 'children/:idChild/sumups', component: EditSumupsComponent ,outlet:'undernavbar',},
            { path: 'admin/:idAdmin', component: DaycareAdminComponent ,outlet:'undernavbar',},
            { path: 'admin/:idAdmin/children', component: AdminChildComponent ,outlet:'undernavbar',},
            { path: 'admin/:idAdmin/children/create', component: AdminEditChildComponent ,outlet:'undernavbar',},
            { path: 'admin/:idAdmin/children/:idChild/edit', component: AdminEditChildComponent ,outlet:'undernavbar',},

            { path: 'admin/:idAdmin/users', component: AdminUserComponent ,outlet:'undernavbar'},
            { path: 'admin/:idAdmin/users/create', component: AdminEditUserComponent ,outlet:'undernavbar',},
            { path: 'admin/:idAdmin/users/:idUser/edit', component: AdminEditUserComponent ,outlet:'undernavbar',},


        ] },
    // { path: 'daycare/:idDaycare',children:[


    // ]},

];

export const routing = RouterModule.forRoot(routes);