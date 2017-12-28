import {Component, OnInit} from '@angular/core';
import {DaycareService} from '../../services/daycare-service';
import {UserService} from '../../services/user-service';
import {ActivatedRoute} from '@angular/router';
import {Role} from '../../pojo/pojo';

@Component({
  selector: 'daycare-navbar',
  templateUrl: './navbar.html',
})
export class NavbarComponent  implements OnInit {
  username:string;
  idDaycare:number;
  idAdmin:number;
  roles:Array<Role>=[];

  menuData = {
    "menu": [
      { "id": 3, "name": "Logout", "image": "/Images/dashboard_on.gif", "link": "/daycare/logout", },
    ]
  };
  
  constructor(
    private daycareService: DaycareService,
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.username = params['username']; 
    });

      this.userService.getUser(this.username).subscribe(
      user => {
         this.idDaycare=user.daycare.id;
         for (let role of user.roles) {
          this.roles.push(role);
        }

         this.idAdmin=user.id;
         if(this.userService.isInRoles("ADMIN",this.roles)){
          this.menuData = {
            "menu": [
              { "id": 0, "name": "Children", "image": "/Images/dashboard_on.gif", "link": "/daycare/"+this.idDaycare+"/admin/"+this.idAdmin+"/children", },
              { "id": 1, "name": "Educators", "image": "/Images/dashboard_on.gif", "link": "/daycare/"+this.idDaycare+"/admin/"+this.idAdmin+"/educators", },
              { "id": 2, "name": "Parents", "image": "/Images/dashboard_on.gif", "link": "/daycare/"+this.idDaycare+"/admin/"+this.idAdmin+"/parents", },
              { "id": 3, "name": "Logout", "image": "/Images/dashboard_on.gif", "link": "/daycare/logout", },
            ]
          };
        }
      },
      this.daycareService.errorSubscribe,
      this.daycareService.completed);
    
 
  }
  
}