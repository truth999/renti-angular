import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  onOpenMenu() {
    const mobileMenuContentEl = document.querySelector('.layout');

    mobileMenuContentEl.classList.add('toggled');
  }

  logOut() {
    this.authService.logout();
  }

}
