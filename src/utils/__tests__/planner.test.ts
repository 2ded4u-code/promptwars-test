import { describe, it, expect } from 'vitest';
import { isIngredientOwned, hasAllergenConflict, generateMealPlan } from '../planner';
import { calculateBudgetFeasibility } from '../cost';
import type { UserPreferences } from '../../types/planner';

describe('isIngredientOwned', () => {
  it('should match exact string case-insensitively', () => {
    expect(isIngredientOwned('Bread', ['bread', 'eggs'])).toBe(true);
    expect(isIngredientOwned('bread', ['Bread', 'Eggs'])).toBe(true);
  });

  it('should match fuzzy matches', () => {
    expect(isIngredientOwned('Gluten-Free Bread', ['bread'])).toBe(true);
    expect(isIngredientOwned('Salt', ['Salt & Pepper'])).toBe(true);
  });

  it('should return false for non-matching ingredients', () => {
    expect(isIngredientOwned('Apples', ['pears', 'oranges'])).toBe(false);
  });
});

describe('hasAllergenConflict', () => {
  it('should return true if recipe allergens contain user allergies', () => {
    expect(hasAllergenConflict(['gluten', 'dairy'], ['gluten'])).toBe(true);
    expect(hasAllergenConflict(['nuts'], ['Peanut', 'nuts'])).toBe(true);
  });

  it('should return false if there is no conflict', () => {
    expect(hasAllergenConflict(['fish'], ['nuts', 'soy'])).toBe(false);
  });
});

describe('calculateBudgetFeasibility', () => {
  it('should report Under Budget when cost is below 85%', () => {
    const res = calculateBudgetFeasibility(10, 20);
    expect(res.status).toBe('Under Budget');
    expect(res.percentage).toBe(50);
  });

  it('should report Tight when cost is between 85% and 100%', () => {
    const res = calculateBudgetFeasibility(18, 20);
    expect(res.status).toBe('Tight');
    expect(res.percentage).toBe(90);
  });

  it('should report Over Budget when cost is above 100%', () => {
    const res = calculateBudgetFeasibility(25, 20);
    expect(res.status).toBe('Over Budget');
    expect(res.percentage).toBe(125);
  });

  it('should handle zero or negative budget gracefully', () => {
    const res = calculateBudgetFeasibility(25, 0);
    expect(res.status).toBe('Over Budget');
  });
});

describe('generateMealPlan Portion Scaling and Pantry Deductions', () => {
  it('should scale ingredients and remove owned ingredients from grocery list costs', () => {
    const preferences: UserPreferences = {
      budget: 50,
      people: 4, // 2x normal portions (base is 2 servings)
      dietary: 'vegetarian',
      skill: 'beginner',
      time: 45,
      availableIngredients: ['Avocado', 'Lemon Juice'],
      allergies: [],
    };

    const mealPlan = generateMealPlan(preferences);

    // Verify meals exist
    expect(mealPlan.breakfast).toBeDefined();
    expect(mealPlan.lunch).toBeDefined();
    expect(mealPlan.dinner).toBeDefined();

    // Verify portions scaled
    // Breakfast avocado should be owned and not contribute to total grocery cost
    const avocadoInOwned = mealPlan.ownedIngredients.find(ing => ing.name === 'Avocado');
    expect(avocadoInOwned).toBeDefined();
    expect(avocadoInOwned?.scaledQuantity).toBe(2); // base is 1, for 4 people it should be 2

    const avocadoInGrocery = mealPlan.groceryList.find(ing => ing.name === 'Avocado');
    expect(avocadoInGrocery).toBeUndefined(); // Should be excluded from grocery list since it is owned
  });

  it('should respect dietary exclusions', () => {
    const preferences: UserPreferences = {
      budget: 100,
      people: 2,
      dietary: 'vegan',
      skill: 'advanced',
      time: 60,
      availableIngredients: [],
      allergies: [],
    };

    const mealPlan = generateMealPlan(preferences);

    expect(mealPlan.breakfast.diet).toBe('vegan');
    expect(mealPlan.lunch.diet).toBe('vegan');
    expect(mealPlan.dinner.diet).toBe('vegan');
  });

  it('should degrade gracefully for highly restrictive cooking times', () => {
    const preferences: UserPreferences = {
      budget: 100,
      people: 2,
      dietary: 'non-vegetarian',
      skill: 'beginner',
      time: 5, // Extremely small time, no recipe exists under 5 mins
      availableIngredients: [],
      allergies: [],
    };

    const mealPlan = generateMealPlan(preferences);
    
    // Should still return the shortest recipes rather than crashing
    expect(mealPlan.breakfast).toBeDefined();
    expect(mealPlan.lunch).toBeDefined();
    expect(mealPlan.dinner).toBeDefined();
  });
});
