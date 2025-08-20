import {
  Injectable,
  signal
} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  // Reactive search query
  searchQuery = signal<string>('');

  // Update search query
  updateSearchQuery(query: string) {
    this.searchQuery.set(query.trim());
  }

}