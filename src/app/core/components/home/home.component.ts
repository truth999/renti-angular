import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  onSignup() {
    this.router.navigate(['auth/signup'], { relativeTo: this.route });
  }

  onLogin() {
    this.router.navigate(['auth/login'], { relativeTo: this.route });
  }

}
