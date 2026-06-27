import type { Recipe, UserPreferences, MealPlan, GroceryItem } from '../types/planner';
import { RECIPES } from '../data/recipes';
import { calculateBudgetFeasibility } from './cost';

/**
 * Normalizes a string for comparison by lowercasing and trimming.
 */
export function normalizeString(str: string): string {
  return str.toLowerCase().trim();
}

/**
 * Checks if an ingredient is owned by the user, based on case-insensitive fuzzy matching.
 */
export function isIngredientOwned(ingredientName: string, availableIngredients: string[]): boolean {
  const normalizedName = normalizeString(ingredientName);
  return availableIngredients.some(available => {
    const normalizedAvailable = normalizeString(available);
    if (!normalizedAvailable) return false;
    return (
      normalizedName.includes(normalizedAvailable) ||
      normalizedAvailable.includes(normalizedName)
    );
  });
}

/**
 * Checks if a recipe contains any allergens that the user is allergic to.
 */
export function hasAllergenConflict(recipeAllergens: string[], userAllergies: string[]): boolean {
  return recipeAllergens.some(recipeAllergen =>
    userAllergies.some(userAllergy =>
      normalizeString(recipeAllergen).includes(normalizeString(userAllergy)) ||
      normalizeString(userAllergy).includes(normalizeString(recipeAllergen))
    )
  );
}

/**
 * Filters the recipes database to find matching options for a specific course.
 * Degrades filters gracefully if no exact matches are found.
 */
export function findRecipeForCourse(
  course: 'breakfast' | 'lunch' | 'dinner',
  preferences: UserPreferences
): Recipe | null {
  const { dietary, skill, time, allergies } = preferences;

  // Helper to check diet match
  const matchesDiet = (recipe: Recipe) => {
    if (dietary === 'vegan') return recipe.diet === 'vegan';
    if (dietary === 'vegetarian') return recipe.diet === 'vegan' || recipe.diet === 'vegetarian';
    return true; // non-vegetarian matches anything
  };

  // Helper to check skill match
  const matchesSkill = (recipe: Recipe, allowedSkills: string[]) => {
    return allowedSkills.includes(recipe.skill);
  };

  // Helper to check time match
  const matchesTime = (recipe: Recipe, maxTime: number) => {
    return recipe.time <= maxTime;
  };

  // Helper to check allergy conflicts
  const matchesAllergies = (recipe: Recipe) => {
    return !hasAllergenConflict(recipe.allergens, allergies);
  };

  // Skill levels hierarchy
  const skillHierarchy: Record<string, string[]> = {
    beginner: ['beginner'],
    intermediate: ['beginner', 'intermediate'],
    advanced: ['beginner', 'intermediate', 'advanced'],
  };

  const allowedSkills = skillHierarchy[skill] || ['beginner', 'intermediate', 'advanced'];

  // Course base filter
  const courseRecipes = RECIPES.filter(r => r.course === course);

  // Phase 1: Try strict match
  let matches = courseRecipes.filter(
    r => matchesDiet(r) && matchesSkill(r, allowedSkills) && matchesTime(r, time) && matchesAllergies(r)
  );

  if (matches.length > 0) {
    return matches[0];
  }

  // Phase 2: Relax cooking skill filter (difficulty)
  matches = courseRecipes.filter(
    r => matchesDiet(r) && matchesTime(r, time) && matchesAllergies(r)
  );

  if (matches.length > 0) {
    // Return the easiest recipe first
    return matches.sort((a, b) => {
      const skillScore = { beginner: 1, intermediate: 2, advanced: 3 };
      return skillScore[a.skill] - skillScore[b.skill];
    })[0];
  }

  // Phase 3: Relax cooking time filter (allow up to 2x time limit, or find minimum time)
  matches = courseRecipes.filter(
    r => matchesDiet(r) && matchesAllergies(r)
  );

  if (matches.length > 0) {
    // Return the one with the smallest cooking time
    return matches.sort((a, b) => a.time - b.time)[0];
  }

  // Phase 4: Fallback to any recipe matching diet, even ignoring allergies as a last resort
  matches = courseRecipes.filter(r => matchesDiet(r));
  if (matches.length > 0) {
    return matches[0];
  }

  return null;
}

/**
 * Generates a full single-day meal plan based on user preferences.
 */
export function generateMealPlan(preferences: UserPreferences): MealPlan {
  const { people, availableIngredients } = preferences;

  const breakfast = findRecipeForCourse('breakfast', preferences);
  const lunch = findRecipeForCourse('lunch', preferences);
  const dinner = findRecipeForCourse('dinner', preferences);

  if (!breakfast || !lunch || !dinner) {
    throw new Error('Could not find suitable recipes for all meals. Please relax your filters.');
  }

  // Scale portion factor (base recipes are designed for 2 people)
  const portionFactor = people / 2;

  // Process ingredients across all meals
  const allIngredients: { recipeIngredient: any; isOwned: boolean }[] = [];
  const substitutions: Record<string, string[]> = {};

  const processRecipeIngredients = (recipe: Recipe) => {
    recipe.ingredients.forEach(ing => {
      const isOwned = isIngredientOwned(ing.name, availableIngredients);
      allIngredients.push({ recipeIngredient: ing, isOwned });

      // Add substitutions if not owned and available in recipe
      if (!isOwned && recipe.substitutions[ing.name]) {
        substitutions[ing.name] = recipe.substitutions[ing.name];
      }
    });
  };

  processRecipeIngredients(breakfast);
  processRecipeIngredients(lunch);
  processRecipeIngredients(dinner);

  // Aggregate grocery list and owned list
  const groceryAggregation: Record<string, GroceryItem> = {};
  const ownedAggregation: Record<string, GroceryItem> = {};

  allIngredients.forEach(({ recipeIngredient, isOwned }) => {
    const key = recipeIngredient.name.toLowerCase().trim();
    const scaledQty = recipeIngredient.quantity * portionFactor;
    const scaledPrice = recipeIngredient.isPantry || isOwned ? 0 : recipeIngredient.price * portionFactor;

    if (isOwned) {
      if (ownedAggregation[key]) {
        ownedAggregation[key].scaledQuantity += scaledQty;
      } else {
        ownedAggregation[key] = {
          ...recipeIngredient,
          isOwned: true,
          scaledQuantity: Number(scaledQty.toFixed(2)),
          scaledPrice: 0,
        };
      }
    } else {
      if (groceryAggregation[key]) {
        groceryAggregation[key].scaledQuantity += scaledQty;
        groceryAggregation[key].scaledPrice += scaledPrice;
      } else {
        groceryAggregation[key] = {
          ...recipeIngredient,
          isOwned: false,
          scaledQuantity: Number(scaledQty.toFixed(2)),
          scaledPrice: Number(scaledPrice.toFixed(2)),
        };
      }
    }
  });

  const groceryList = Object.values(groceryAggregation).map(item => ({
    ...item,
    scaledQuantity: Number(item.scaledQuantity.toFixed(2)),
    scaledPrice: Number(item.scaledPrice.toFixed(2)),
  }));

  const ownedIngredients = Object.values(ownedAggregation).map(item => ({
    ...item,
    scaledQuantity: Number(item.scaledQuantity.toFixed(2)),
    scaledPrice: 0,
  }));

  const missingIngredients = groceryList.map(item => item.name);

  // Calculate total cost
  const estimatedTotalCost = Number(groceryList.reduce((sum, item) => sum + item.scaledPrice, 0).toFixed(2));

  // Budget Feasibility
  const budgetFeasibility = calculateBudgetFeasibility(estimatedTotalCost, preferences.budget);

  // Nutritional Summary (represents per-person intakes, which is the sum of per-serving values)
  const nutritionalSummary = {
    calories: breakfast.calories + lunch.calories + dinner.calories,
    protein: breakfast.macronutrients.protein + lunch.macronutrients.protein + dinner.macronutrients.protein,
    carbs: breakfast.macronutrients.carbs + lunch.macronutrients.carbs + dinner.macronutrients.carbs,
    fat: breakfast.macronutrients.fat + lunch.macronutrients.fat + dinner.macronutrients.fat,
  };

  return {
    breakfast,
    lunch,
    dinner,
    groceryList,
    ownedIngredients,
    missingIngredients,
    substitutions,
    estimatedTotalCost,
    budgetFeasibility,
    nutritionalSummary,
  };
}
