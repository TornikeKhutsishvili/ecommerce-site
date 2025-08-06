import { CommonModule } from '@angular/common';

import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  Renderer2,
  signal,
  ViewChild
} from '@angular/core';

import { ProductService } from '../../services/product-service';
import { FilterService } from '../../services/filter-service';
import { SearchService } from '../../services/search-service';
import { ThemeService } from '../../services/theme-service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Collapse } from 'bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Language } from '../../services/language';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.scss']
})
export class Navigation implements AfterViewInit, OnInit {

  @Output() filterApplied = new EventEmitter<any[]>();
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;

  products = signal<any[]>([]);
  cartItemCount = signal<number>(0);

  isDarkMode = signal<boolean>(false);
  isMenuOpen = signal<boolean>(false);

  isblack = signal<string>('');
  islight = signal<string>('');

  sun = '☀';
  moon = '🌙';

  private router = inject(Router);
  currentUrl = signal<string>('');

  private collapseInstance!: Collapse;

  private productService = inject(ProductService);
  private filterService = inject(FilterService);
  private searchService = inject(SearchService);
  private themeService = inject(ThemeService);
  private renderer = inject(Renderer2);
  private authService = inject(AuthService);

  currentUser = this.authService.currentUser;
  isLoggedIn = this.authService.isLoggedIn;

  public translate = inject(TranslateService);
  public languageService = inject(Language);
  selectedLanguage: string;

  languages = [
    { code: 'en', name: 'English' },
    { code: 'ge', name: 'ქართული' }
  ];

  constructor() {

    this.isDarkMode.set(this.themeService.getSavedTheme() === 'dark');

    this.isblack.set('#343a40');
    this.islight.set('#f8f9fa');


    this.authService.loadFromStorage();


    this.router.events.subscribe(() => {
      this.currentUrl.set(this.router.url);
    });


    this.selectedLanguage = this.languageService.getCurrentLang();

  }



  ngOnInit(): void {
    this.updateNavbarTheme();

    this.productService.getProducts().subscribe((data) => {
      this.products.set(data);
    });
  }


  // collapse instance
  ngAfterViewInit(): void {
    this.collapseInstance = new Collapse(this.navbarCollapse.nativeElement, { toggle: false });
  }



  // change language
  changeLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
    this.selectedLanguage = lang;
  }



  // change theme
  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode.set(this.themeService.getSavedTheme() === 'dark');
    this.updateNavbarTheme();
  }



  // update navbar theme
  updateNavbarTheme(): void {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      this.renderer.removeClass(navbar, 'navbar-light');
      this.renderer.removeClass(navbar, 'navbar-dark');

      if (this.isDarkMode()) {
        this.renderer.addClass(navbar, 'navbar-dark');
      } else {
        this.renderer.addClass(navbar, 'navbar-light');
      }
    }
  }



  // update navbar theme
  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
    this.collapseInstance.toggle();
  }



  // close menu
  closeMenu(): void {
    this.isMenuOpen.set(false);
    this.collapseInstance.hide();
  }



  // search
  onSearch(event: any) {
    const query = event.target.value.trim();
    this.searchService.updateSearchQuery(query);
  }



  // filter by price
  filterByPrice(event: any, products: any[]) {
    const value = event.target.value;

    if (!products || products.length === 0) return;

    let sortedProducts = [...products];

    if (value === 'low') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === 'high') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    this.filterService.setFilteredProducts(sortedProducts);
  }



  // logout
  logout() {
    this.authService.logout();
  }

}