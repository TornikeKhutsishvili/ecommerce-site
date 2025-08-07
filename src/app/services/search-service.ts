import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  search(query: string, items: any[]) {
    return items.filter(item => item.title.toLowerCase().includes(query.toLowerCase())); // Filters products by name
  }

  private searchQuery = new BehaviorSubject<string>(''); // start meaning is empty
  searchQuery$ = this.searchQuery.asObservable(); // Because of this, we will be able to import it elsewhere

  updateSearchQuery(query: string) {
    this.searchQuery.next(query);
  }

}