import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  EventEmitter,
  inject,
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
export class Navigation implements AfterViewInit {

  @Output() filterApplied = new EventEmitter<any[]>();
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;

  products = signal<any[]>([]);
  filteredProducts = signal<any[]>([]);
  cartItemCount = signal<number>(0);

  isDarkMode = signal<boolean>(false);
  isMenuOpen = signal<boolean>(false);
  isblack = signal('');
  islight = signal('');
  sun = signal('☀');
  moon = signal('🌙');
  currentUrl = signal('');

  private collapseInstance!: Collapse;
  private router = inject(Router);

  private productService = inject(ProductService);
  private filterService = inject(FilterService);
  private searchService = inject(SearchService);
  private themeService = inject(ThemeService);
  private renderer = inject(Renderer2);
  private authService = inject(AuthService);

  searchQuery = this.searchService.searchQuery;
  currentUser = this.authService.currentUser;
  isLoggedIn = this.authService.isLoggedIn;

  public translate = inject(TranslateService);
  public languageService = inject(Language);

  selectedLanguage = signal<string>('en');
  languages = [
    { code: 'en', name: 'English' },
    { code: 'ge', name: 'ქართული' }
  ];


  // constructor
  constructor() {
    // Load products
    this.productService.getProducts().subscribe(data => {
      this.products.set(data);
      this.filterService.setAllProducts(data);
    });

    // Reactive filteredProducts
    effect(() => {
      const query = this.searchQuery().toLowerCase();
      const filtered = this.filterService.filteredProducts().filter(p => {
        const title = this.translate.instant(p.title).toLowerCase();
        const category = this.translate.instant(p.category).toLowerCase();
        return title.includes(query) || category.includes(query);
      }
        // p.title.toLowerCase().includes(query) ||
        // p.category.toLowerCase().includes(query)
      );
      this.filteredProducts.set(filtered);
    });

    this.router.events.subscribe(() => {
      this.currentUrl.set(this.router.url);
    });

    this.isDarkMode.set(this.themeService.getSavedTheme() === 'dark');

    this.isblack.set('#343a40');
    this.islight.set('#f8f9fa');

    this.selectedLanguage.set(this.languageService.getCurrentLang());
  }

  // search
  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchService.updateSearchQuery(target.value);
  }

  // Price filter
  filterByPrice(event: any) {
    const target = event.target as HTMLSelectElement;
    const value = parseFloat(target.value) || null;
    this.filterService.setPriceFilter(value);
  }

  // Sort filter
  sortByPrice(order: 'low' | 'high' | null) {
    this.filterService.setSortOrder(order);
  }

  // collapse
  ngAfterViewInit(): void {
    this.collapseInstance = new Collapse(
      this.navbarCollapse.nativeElement,
      { toggle: false }
    );
  }

  // Toggle menu
  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
    this.collapseInstance.toggle();
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    this.collapseInstance.hide();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDarkMode.set(this.themeService.getSavedTheme() === 'dark');
    this.updateNavbarTheme();
  }

  updateNavbarTheme() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    this.renderer.removeClass(navbar, 'navbar-light');
    this.renderer.removeClass(navbar, 'navbar-dark');
    this.renderer.addClass(navbar, this.isDarkMode() ? 'navbar-dark' : 'navbar-light');
  }

  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
    this.selectedLanguage.set(lang);
  }

  logout() {
    this.authService.logout();
  }

}