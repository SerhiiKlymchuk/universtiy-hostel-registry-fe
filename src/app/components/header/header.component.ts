import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isAuthorized: boolean = this.authService.isAuthorized();

  public isAdminPage: boolean = location.pathname.includes('/admin');

  constructor(private authService: AuthService) {}

  public logout(): void {
    this.authService.logout();
  }
}
