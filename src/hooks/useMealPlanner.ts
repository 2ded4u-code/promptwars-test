import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { UserPreferences, MealPlan } from '../types/planner';
import { generateMealPlan as runPlanner } from '../utils/planner';

const DEFAULT_PREFERENCES: UserPreferences = {
  budget: 30,
  people: 2,
  dietary: 'non-vegetarian',
  skill: 'beginner',
  time: 30,
  availableIngredients: [],
  allergies: [],
};

export function useMealPlanner() {
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>(
    'cooking-todo-preferences',
    DEFAULT_PREFERENCES
  );

  const [mealPlan, setMealPlan] = useLocalStorage<MealPlan | null>(
    'cooking-todo-mealplan',
    null
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const updatePreference = <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
    // Clear validation error on change
    if (validationErrors[key]) {
      setValidationErrors(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!preferences.budget || preferences.budget <= 0 || isNaN(preferences.budget)) {
      errors.budget = 'Please enter a valid daily budget greater than $0.';
    }
    if (!preferences.people || preferences.people <= 0 || isNaN(preferences.people) || !Number.isInteger(preferences.people)) {
      errors.people = 'Please enter a valid whole number of people (at least 1).';
    }
    if (!preferences.time || preferences.time < 5 || isNaN(preferences.time)) {
      errors.time = 'Please enter a cooking time of at least 5 minutes.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generatePlan = () => {
    if (!validate()) return;

    setLoading(true);
    setError(null);

    // Simulate slight generation delay (500ms) for high-end feel / transitions
    setTimeout(() => {
      try {
        const plan = runPlanner(preferences);
        setMealPlan(plan);
      } catch (err: any) {
        console.error('Planner Error:', err);
        setError(err.message || 'An unexpected error occurred while generating your meal plan.');
        setMealPlan(null);
      } finally {
        setLoading(false);
      }
    }, 600);
  };

  const resetPlanner = () => {
    setPreferences(DEFAULT_PREFERENCES);
    setMealPlan(null);
    setError(null);
    setValidationErrors({});
  };

  return {
    preferences,
    updatePreference,
    mealPlan,
    loading,
    error,
    validationErrors,
    generatePlan,
    resetPlanner,
  };
}
