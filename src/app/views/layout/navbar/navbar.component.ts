import { Component, OnInit, Inject, Renderer2, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

import { MENU } from './menu';
import { MenuItem } from './menu.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cargando = true;
  bFunciones = false;
  rolId = localStorage.getItem('rolId');
  /**
  * Fixed header menu on scroll
  */
  @HostListener('window:scroll', ['$event']) getScrollHeight(event) {    
    if (window.matchMedia('(min-width: 992px)').matches) {
      let header: HTMLElement = document.querySelector('.horizontal-menu') as HTMLElement;
      if(window.pageYOffset >= 60) {
        header.parentElement.classList.add('fixed-on-scroll')
      } else {
        header.parentElement.classList.remove('fixed-on-scroll')
      }
    }
  }

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (/((\/funciones)(\/.*)*)$/i.test(this.router.url ) ) { this.bFunciones = true }
    this.cargando = false
    /**
    * closing the header menu after route change in tablet/mobile devices
    */
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subMenus !== undefined ? item.subMenus.length > 0 : false;
  }

  /**
   * Logout
   */
  onLogout(e) {
    e.preventDefault();
    localStorage.removeItem('isLoggedin');

    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/auth/login']);
    }
  }

  /**
   * Toggle header menu in tablet/mobile devices
   */
  toggleHeaderMenu() {
    document.querySelector('.horizontal-menu .bottom-navbar').classList.toggle('header-toggled');
  }

  getEmployeeRol(arrayId:string[]):boolean{
    for (const id of arrayId) {
      if (this.rolId === '1'){
        return true;
      }
      if (this.rolId === id){
        return true
      }
      if (this.rolId === id){
        return true;
      }
      if (this.rolId === id){
        return true;
      }
    }
    
    return false;
  }

}
