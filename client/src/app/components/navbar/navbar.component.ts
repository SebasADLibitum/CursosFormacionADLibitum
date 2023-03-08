import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    // this.getUsers()
   }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        console.log(data)
      },
      error: () => { },
      complete: () => { }
    })
  }


  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

}
