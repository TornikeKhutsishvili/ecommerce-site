import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

export interface FilterState {
  category: string | null;
  search: string;
}

export const FilterStore = signalStore(
  { providedIn: 'root' },

  withState<FilterState>({
    category: null,
    search: ''
  }),

  withMethods((store) => ({
    setCategory(category: string) {
      patchState(store, { category });
    },

    setSearch(search: string) {
      patchState(store, { search });
    },

    clearFilters() {
      patchState(store, { category: null, search: '' });
    }
  }))
);
