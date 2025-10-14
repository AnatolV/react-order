import React, { createContext, useContext } from 'react';
import type { Product } from '../types';
import type { State, Action } from '../state/reducer';

interface StoreContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
  products: Product[];
}

export const StoreDataContext = createContext<StoreContextType | undefined>(undefined);

export const useStoreData = () => {
  const context = useContext(StoreDataContext);
  if (context === undefined) {
    throw new Error('useStoreData must be used within a StoreDataProvider');
  }
  return context;
};
