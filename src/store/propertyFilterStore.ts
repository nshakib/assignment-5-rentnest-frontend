import { create } from "zustand";

export interface Filters {
  city: string;
  categoryId: string;
  minRent: string;
  maxRent: string;
}

interface PropertyFilterStore extends Filters {
  setFilters: (filters: Partial<Filters>) => void;
  initialize: (filters: Partial<Filters>) => void;
  reset: () => void;
}

const initialState: Filters = {
  city: "",
  categoryId: "",
  minRent: "",
  maxRent: "",
};

export const usePropertyFilterStore = create<PropertyFilterStore>((set) => ({
  ...initialState,

  setFilters: (filters) =>
    set((state) => ({
      ...state,
      ...filters,
    })),

  initialize: (filters) =>
    set((state) => ({
      ...state,
      ...filters,
    })),

  reset: () => set(initialState),
}));