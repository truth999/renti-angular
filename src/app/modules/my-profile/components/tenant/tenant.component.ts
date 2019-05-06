import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-my-profile-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.scss']
})
export class TenantComponent implements OnInit {
  spokenLanguages = [
    'Hungarian',
    'English',
    'Arabic',
    'Chinese',
    'French',
    'German',
    'Hindi',
    'Hindi',
    'Japanese',
    'Romanian',
    'Russian',
    'Slovakian',
    'Spanish',
    'Other'
  ];

  password = '';
  passwordStrengthBarLabel = '';
  baseColor = '#dbdce8';
  phone: string;

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
  }

  onSettings() {
    this.router.navigate(['/app/settings']);
  }

  onBack() {
    this.location.back();
  }

}
