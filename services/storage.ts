import { Product } from '../types';
import { PRODUCTS } from '../constants';

const STORAGE_KEY = 'sr_chefao_products_v1';

export const storageService = {
  getProducts: (): Product[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Error loading from storage", e);
    }
    // Return default constants if nothing in storage
    return PRODUCTS;
  },

  saveProducts: (products: Product[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error("Error saving to storage", e);
    }
  },

  resetToDefault: () => {
    localStorage.removeItem(STORAGE_KEY);
    return PRODUCTS;
  }
};