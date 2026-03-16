import { signalStore, withMethods, withState } from "@ngrx/signals";

export interface ProductsState {}

export const ProductsStore = signalStore(
  { providedIn: 'root' },

  withState<ProductsState>({}),

  withMethods((store) => ({}))
);