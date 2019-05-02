import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onOpenMenu() {
    const mobileMenuContentEl = document.querySelector('.layout');

    mobileMenuContentEl.classList.add('toggled');
  }

}
