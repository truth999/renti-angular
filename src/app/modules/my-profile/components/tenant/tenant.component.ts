import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSettings() {
    this.router.navigate(['/app/settings']);
  }

}
