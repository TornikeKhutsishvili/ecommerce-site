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

import {
  Router,
  RouterLink,
  RouterModule
} from '@angular/router';

import {
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';

import {
  BehaviorSubject,
  combineLatest,
  map
} from 'rxjs';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { FilterService } from '../../services/filter-service';
import { SearchService } from '../../services/search-service';
import { ThemeService } from '../../services/theme-service';
import { AuthService } from '../../services/auth-service';
import { Language } from '../../services/language';
import { Collapse } from 'bootstrap';

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
  filteredProducts = signal<any[]>([]);

  private priceFilter$ = new BehaviorSubject<string>('');

  cartItemCount = signal<number>(0);

  isDarkMode = signal<boolean>(false);
  isMenuOpen = signal<boolean>(false);

  isblack = signal<string>('');
  islight = signal<string>('');
  sun = signal('☀');
  moon = signal('🌙');

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



  // constructor
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



  // ngOnInit
  ngOnInit(): void {
    this.updateNavbarTheme();

    this.productService.getProducts().subscribe((data) => {
      this.products.set(data);
    });


    // Combine products, search query and price filter to update filteredProducts signal
    combineLatest([
      this.productService.getProducts(),
      this.searchService.searchQuery$,
      this.priceFilter$
    ]).pipe(
      map(([products, query, priceFilter]) => {
        let filtered = products;

        if (query) {
          filtered = this.searchService.search(query, filtered);
        }

        if (priceFilter === 'low') {
          filtered = filtered.slice().sort((a, b) => a.price - b.price);
        } else if (priceFilter === 'high') {
          filtered = filtered.slice().sort((a, b) => b.price - a.price);
        }

        return filtered;
      })
    ).subscribe(filtered => {
      this.filteredProducts.set(filtered);
      this.filterApplied.emit(filtered);
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
  filterByPrice(event: any) {
    const value = event.target.value;
    this.priceFilter$.next(value);
  }



  // // filter by price
  // filterByPrice(event: any, products: any[]) {
  //   const value = event.target.value;

  //   if (!products || products.length === 0) return;

  //   let sortedProducts = [...products];

  //   if (value === 'low') {
  //     sortedProducts.sort((a, b) => a.price - b.price);
  //   } else if (value === 'high') {
  //     sortedProducts.sort((a, b) => b.price - a.price);
  //   }

  //   this.filterService.setFilteredProducts(sortedProducts);
  // }



  // logout
  logout() {
    this.authService.logout();
  }

}