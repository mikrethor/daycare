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
    { path: '', redirectTo: 'daycare/login', pathMatch: 'full' },
    { path: 'daycare/login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    // { path: 'daycare/user/:username', component: UserComponent },
    { path: 'daycare', component: UnderNavbarComponent ,children:[
            { path: 'user', component: UserComponent, outlet:'undernavbar',},
            { path: 'daycare/:idDaycare/parent/:idParent', component: ParentComponent },
            { path: 'daycare/:idDaycare/educator/:idEducator', component: EducatorComponent },
            { path: 'daycare/:idDaycare/admin/:idAdmin', component: DaycareAdminComponent },
            { path: 'daycare/:idDaycare/admin/:idAdmin/children', component: AdminChildComponent },
            { path: 'daycare/:idDaycare/admin/:idAdmin/children/create', component: AdminEditChildComponent },
            { path: 'daycare/:idDaycare/admin/:idAdmin/children/:idChild/edit', component: AdminEditChildComponent },
            { path: 'daycare/:idDaycare/children/:idChildren/sumups', component: EditSumupsComponent },
            { path: 'daycare/:idDaycare/admin/:idAdmin/users', component: AdminUserComponent },
            { path: 'daycare/:idDaycare/admin/:idAdmin/users/create', component: AdminEditUserComponent },
            { path: 'daycare/:idDaycare/admin/:idAdmin/users/:idUser/edit', component: AdminEditUserComponent },

        ] },


];

export const routing = RouterModule.forRoot(routes);