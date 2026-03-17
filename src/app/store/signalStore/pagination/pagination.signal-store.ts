import { signalStore, withMethods, withState } from "@ngrx/signals";

export interface PaginationState {}

export const PaginationStore = signalStore(
  { providedIn: 'root' },

  withState<PaginationState>({}),

  withMethods((store) => ({}))
);