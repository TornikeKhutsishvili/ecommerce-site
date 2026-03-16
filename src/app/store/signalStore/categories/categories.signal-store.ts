import { signalStore, withMethods, withState } from "@ngrx/signals";

export interface CatogoriesState {}

export const CatogoriesStore = signalStore(
  { providedIn: 'root' },

  withState<CatogoriesState>({}),

  withMethods((store) => ({}))
);