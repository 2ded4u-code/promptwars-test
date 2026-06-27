export type DietaryPreference = 'vegetarian' | 'vegan' | 'non-vegetarian';
export type CookingSkill = 'beginner' | 'intermediate' | 'advanced';
export type CourseType = 'breakfast' | 'lunch' | 'dinner';

export interface UserPreferences {
  budget: number;
  people: number;
  dietary: DietaryPreference;
  skill: CookingSkill;
  time: number;
  availableIngredients: string[];
  allergies: string[];
}

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  price: number;
  category: string;
  isPantry?: boolean;
  isOwned?: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  course: CourseType;
  diet: DietaryPreference;
  skill: CookingSkill;
  time: number; // total time in minutes
  calories: number;
  macronutrients: {
    protein: number;
    carbs: number;
    fat: number;
  };
  ingredients: Ingredient[];
  instructions: string[];
  substitutions: Record<string, string[]>;
  allergens: string[];
}

export interface GroceryItem extends Ingredient {
  scaledQuantity: number;
  scaledPrice: number;
}

export interface MealPlan {
  breakfast: Recipe;
  lunch: Recipe;
  dinner: Recipe;
  groceryList: GroceryItem[];
  ownedIngredients: GroceryItem[];
  missingIngredients: string[];
  substitutions: Record<string, string[]>;
  estimatedTotalCost: number;
  budgetFeasibility: {
    status: 'Under Budget' | 'Tight' | 'Over Budget';
    percentage: number;
    advice: string;
  };
  nutritionalSummary: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}
