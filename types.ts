export enum Category {
  FRITOS = 'Fritos',
  ASSADOS = 'Assados',
  CHURROS = 'Churros',
  COMBOS = 'Combos'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  popular?: boolean;
  servingSize?: string; // Novo campo: ex: "100 unidades", "500g", etc.
}

export interface CartItem extends Product {
  quantity: number;
}

export interface PartyPlanResponse {
  suggestion: string;
  estimatedQuantity: number;
}