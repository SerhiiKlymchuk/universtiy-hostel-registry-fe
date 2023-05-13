import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  public routes: any = [
    {
      label: 'Hostels',
      link: '/admin/hostels',
      show: true
    },
    {
      label: 'Universities',
      link: '/admin/universities',
      show: true
    },
    {
      label: 'User',
      link: '/admin/users',
      show: this.authService.isAdmin()
    },
  ]

  constructor(private authService: AuthService) {}

}
