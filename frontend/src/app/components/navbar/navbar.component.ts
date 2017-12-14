import { Component } from '@angular/core';

@Component({
  selector: 'daycare-navbar',
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  //TODO the menu has to be generated with ROLES
  //Admin
  menuData = {
    "menu": [
      { "id": 0, "name": "Children", "image": "/Images/dashboard_on.gif", "link": "/daycare/:idDaycare/admin/:idAdmin/children", },
      { "id": 1, "name": "Educators", "image": "/Images/dashboard_on.gif", "link": "/daycare/:idDaycare/admin/:idAdmin/educators", },
      { "id": 2, "name": "Parents", "image": "/Images/dashboard_on.gif", "link": "/daycare/:idDaycare/admin/:idAdmin/parents", },
      { "id": 3, "name": "Logout", "image": "/Images/dashboard_on.gif", "link": "/daycare/logout", },
    ]
  };
  
  constructor() { }
}