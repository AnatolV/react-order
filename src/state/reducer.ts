import type { StoreData, Product } from '../types';
import { SET_DATA, UPDATE_QUANTITY, REMOVE_FROM_CART } from './actions';

export interface State {
  data: StoreData | null;
  loading: boolean;
}

export type Action =
  | { type: typeof SET_DATA; payload: StoreData }
  | { type: typeof UPDATE_QUANTITY; payload: { productId: string; quantity: number } }
  | { type: typeof REMOVE_FROM_CART; payload: { productId: string } };

export const initialState: State = {
  data: null,
  loading: true,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case UPDATE_QUANTITY: {
      if (!state.data) return state;
      const { productId, quantity } = action.payload;
      const updatedProducts = state.data.products.map((p: Product) =>
        p.id === productId ? { ...p, quantity } : p
      );
      return {
        ...state,
        data: {
          ...state.data,
          products: updatedProducts,
        },
      };
    }
    case REMOVE_FROM_CART: {
      if (!state.data) return state;
      const { productId } = action.payload;
      const updatedProducts = state.data.products.filter(
        (p: Product) => p.id !== productId
      );
      return {
        ...state,
        data: {
          ...state.data,
          products: updatedProducts,
        },
      };
    }
    default:
      return state;
  }
}
