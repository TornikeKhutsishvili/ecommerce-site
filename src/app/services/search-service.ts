import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  // search(query: string, items: any[]) {
  //   const term = query?.toLocaleLowerCase('ka').trim();
  //   const regex = new RegExp(term, 'iu');
  //   // return items.filter(item => item?.title.toLowerCase('ka').includes(term)); // Filters products by name
  //   return items.filter(item => regex.test(item.title));
  // }

  search(query: string, items: any[]) {

    if (!query) return items; // If empty, show all products

    // Georgian + English lowercase
    const termKa = query.toLocaleLowerCase('ka').trim();
    const termEn = query.toLocaleLowerCase('en').trim();

    // Unicode regex, which processes both languages simultaneously
    const regex = new RegExp(`${termKa}|${termEn}`, 'iu');

    return items.filter(item => {
      const titleKa = item.title?.toLocaleLowerCase('ka');
      const titleEn = item.title?.toLocaleLowerCase('en');
      return regex.test(titleKa) || regex.test(titleEn);
    });

  }

  // start meaning is empty
  private searchQuery = new BehaviorSubject<string>('');
  // Because of this, we will be able to import it elsewhere
  searchQuery$ = this.searchQuery.asObservable();

  // update query
  updateSearchQuery(query: string) {
    this.searchQuery.next(query);
  }

}