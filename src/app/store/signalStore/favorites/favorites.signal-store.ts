import { signalStore, withMethods, withState } from "@ngrx/signals";

export interface FavoritesState {}

export const FavoritesStore = signalStore(
  { providedIn: 'root' },

  withState<FavoritesState>({}),

  withMethods((store) => ({}))
);