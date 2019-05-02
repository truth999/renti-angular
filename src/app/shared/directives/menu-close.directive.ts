import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appMenuClose]'
})
export class MenuCloseDirective implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.addEventListener('click', () => {
      const mobileMenuContentEl = document.querySelector('.layout');

      mobileMenuContentEl.classList.remove('toggled');
    });
  }

}
