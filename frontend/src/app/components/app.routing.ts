import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { UserComponent } from './user/user.component';
import { ParentComponent } from './parent/parent.component';
import { EducatorComponent } from './educator/educator.component';
import { DaycareAdminComponent } from './daycareadmin/daycareadmin.component';
import { AdminEducatorComponent } from './daycareadmin/educator.component';
import { AdminParentComponent } from './daycareadmin/parent.component';
import { AdminChildComponent } from './daycareadmin/child.component';
import { AdminEditEducatorComponent } from './daycareadmin/edit-educator.component';
import { AdminEditChildComponent } from './daycareadmin/edit-child.component';
import { AdminEditParentComponent } from './daycareadmin/edit-parent.component';
import { EditSumupsComponent } from './sumups/edit-sumups.component';

const routes: Routes = [
    { path: '', redirectTo: 'daycare/login', pathMatch: 'full' },
    { path: 'daycare/login', component: LoginComponent },
    { path: 'daycare/logout', component: LogoutComponent },
    { path: 'daycare/user/:username', component: UserComponent },
    // { path: 'daycare/:idDaycare', component: DaycareComponent },
    { path: 'daycare/:idDaycare/parent/:idParent', component: ParentComponent },
    { path: 'daycare/:idDaycare/educator/:idEducator', component: EducatorComponent },
    { path: 'daycare/:idDaycare/admin/:idAdmin', component: DaycareAdminComponent },
    { path: 'daycare/:idDaycare/admin/:idAdmin/children', component: AdminChildComponent },
    { path: 'daycare/:idDaycare/admin/:idAdmin/children/create', component: AdminEditChildComponent },
    { path: 'daycare/:idDaycare/admin/:idAdmin/children/edit', component: AdminEditChildComponent },
    { path: 'daycare/:idDaycare/admin/:idAdmin/educators', component: AdminEducatorComponent },
    { path: 'daycare/:idDaycare/admin/:idAdmin/educators/create', component: AdminEditEducatorComponent },
    { path: 'daycare/:idDaycare/admin/:idAdmin/educators/edit', component: AdminEditEducatorComponent },
    { path: 'daycare/:idDaycare/admin/:idAdmin/parents', component: AdminParentComponent },
    { path: 'daycare/:idDaycare/admin/:idAdmin/parents/create', component: AdminEditParentComponent },
    { path: 'daycare/:idDaycare/admin/:idAdmin/parents/edit', component: AdminEditParentComponent },
    { path: 'daycare/:idDaycare/children/:idChildren/sumups/:idSumups', component: EditSumupsComponent },

];

export const routing = RouterModule.forRoot(routes);