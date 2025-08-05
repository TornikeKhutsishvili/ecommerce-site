import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Output, Renderer2, signal, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { FilterService } from '../../services/filter-service';
import { SearchService } from '../../services/search-service';
import { ThemeService } from '../../services/theme-service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Collapse } from 'bootstrap';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.scss']
})
export class Navigation implements AfterViewInit {

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



  constructor() {
    this.isDarkMode.set(this.themeService.getSavedTheme() === 'dark');

    this.isblack.set('#343a40');
    this.islight.set('#f8f9fa');


    this.authService.loadFromStorage();


    this.router.events.subscribe(() => {
      this.currentUrl.set(this.router.url);
    });
  }



  ngOnInit(): void {
    this.updateNavbarTheme();

    this.productService.getProducts().subscribe((data) => {
      this.products.set(data);
    });
  }



  ngAfterViewInit(): void {
    this.collapseInstance = new Collapse(this.navbarCollapse.nativeElement, { toggle: false });
  }



  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode.set(this.themeService.getSavedTheme() === 'dark');
    this.updateNavbarTheme();
  }



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



  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
    this.collapseInstance.toggle();
  }



  closeMenu(): void {
    this.isMenuOpen.set(false);
    this.collapseInstance.hide();
  }



  onSearch(event: any) {
    const query = event.target.value.trim();
    this.searchService.updateSearchQuery(query);
  }



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



  logout() {
    this.authService.logout();
  }

}