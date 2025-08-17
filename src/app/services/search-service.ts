import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private translate: TranslateService) {}

  // Reactive search query
  searchQuery = signal<string>('');

  // Update search query
  updateSearchQuery(query: string) {
    this.searchQuery.set(query.trim());
  }

}