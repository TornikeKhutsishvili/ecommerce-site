import { signalStore, withMethods, withState } from "@ngrx/signals";

export interface FavouritesState {}

export const FavouritesStore = signalStore(
  { providedIn: 'root' },

  withState<FavouritesState>({}),

  withMethods((store) => ({}))
);