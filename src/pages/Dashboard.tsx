import React, { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Plus, 
  X, 
  AlertTriangle, 
  Heart, 
  ListTodo,
  ChefHat
} from 'lucide-react';
import { useMealPlanner } from '../hooks/useMealPlanner';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { BudgetGauge } from '../components/BudgetGauge';
import { MealCard } from '../components/MealCard';
import { GroceryList } from '../components/GroceryList';

export const Dashboard: React.FC = () => {
  const {
    preferences,
    updatePreference,
    mealPlan,
    loading,
    error,
    validationErrors,
    generatePlan,
    resetPlanner,
  } = useMealPlanner();

  // Local state for the tag text inputs
  const [ingredientInput, setIngredientInput] = useState('');
  const [allergyInput, setAllergyInput] = useState('');

  // Handle adding available ingredients
  const handleAddIngredient = (e: React.MouseEvent | KeyboardEvent) => {
    if ('key' in e && e.key !== 'Enter' && e.key !== ',') return;
    e.preventDefault();

    const value = ingredientInput.replace(/,/g, '').trim();
    if (value && !preferences.availableIngredients.includes(value)) {
      updatePreference('availableIngredients', [...preferences.availableIngredients, value]);
    }
    setIngredientInput('');
  };

  const handleRemoveIngredient = (index: number) => {
    const next = [...preferences.availableIngredients];
    next.splice(index, 1);
    updatePreference('availableIngredients', next);
  };

  // Handle adding allergies
  const handleAddAllergy = (e: React.MouseEvent | KeyboardEvent) => {
    if ('key' in e && e.key !== 'Enter' && e.key !== ',') return;
    e.preventDefault();

    const value = allergyInput.replace(/,/g, '').trim();
    if (value && !preferences.allergies.includes(value)) {
      updatePreference('allergies', [...preferences.allergies, value]);
    }
    setAllergyInput('');
  };

  const handleRemoveAllergy = (index: number) => {
    const next = [...preferences.allergies];
    next.splice(index, 1);
    updatePreference('allergies', next);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* 1. Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <ChefHat className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
              Cooking To-Do List
            </h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
            Plan your daily meals, track budgets, and manage grocery checklists in one production-ready workspace.
          </p>
        </div>

        {mealPlan && (
          <Button
            variant="outline"
            onClick={resetPlanner}
            className="flex items-center gap-1.5 self-start md:self-auto"
            aria-label="Reset all preferences and generated plan"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Planner
          </Button>
        )}
      </header>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Input Preferences Panel */}
        <Card className="lg:col-span-1 h-fit flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-bold text-slate-950 dark:text-slate-50">
              Meal Preferences
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              Enter your dietary constraints, skill levels, and available staples.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); generatePlan(); }} className="flex flex-col gap-5">
            {/* Portions & Budget */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Daily Budget ($)"
                type="number"
                min="1"
                step="any"
                value={preferences.budget || ''}
                onChange={(e) => updatePreference('budget', parseFloat(e.target.value) || 0)}
                error={validationErrors.budget}
                placeholder="e.g. 30"
                required
              />
              <Input
                label="Portions (People)"
                type="number"
                min="1"
                step="1"
                value={preferences.people || ''}
                onChange={(e) => updatePreference('people', parseInt(e.target.value) || 0)}
                error={validationErrors.people}
                placeholder="e.g. 2"
                required
              />
            </div>

            {/* Diet & Cooking Skill */}
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Dietary Preference"
                value={preferences.dietary}
                onChange={(e) => updatePreference('dietary', e.target.value as any)}
                options={[
                  { value: 'non-vegetarian', label: 'Any Diet' },
                  { value: 'vegetarian', label: 'Vegetarian' },
                  { value: 'vegan', label: 'Vegan' },
                ]}
              />
              <Select
                label="Cooking Skill"
                value={preferences.skill}
                onChange={(e) => updatePreference('skill', e.target.value as any)}
                options={[
                  { value: 'beginner', label: 'Beginner' },
                  { value: 'intermediate', label: 'Intermediate' },
                  { value: 'advanced', label: 'Advanced' },
                ]}
              />
            </div>

            {/* Maximum Cooking Time */}
            <Input
              label="Max Cooking Time per Meal (mins)"
              type="number"
              min="5"
              step="1"
              value={preferences.time || ''}
              onChange={(e) => updatePreference('time', parseInt(e.target.value) || 0)}
              error={validationErrors.time}
              placeholder="e.g. 30"
              required
            />

            {/* Ingredients Already Available (Tags/Chips) */}
            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-2">
                <Input
                  label="Ingredients in Kitchen"
                  value={ingredientInput}
                  onChange={(e) => setIngredientInput(e.target.value)}
                  onKeyDown={handleAddIngredient}
                  placeholder="Type ingredient & press Enter"
                  helperText="e.g. bread, eggs, olive oil"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleAddIngredient}
                  className="mb-1 py-3 px-3.5"
                  aria-label="Add ingredient chip"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {preferences.availableIngredients.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1 border border-slate-100 dark:border-slate-800/40 p-2.5 rounded-xl bg-slate-50/50 dark:bg-slate-900/30">
                  {preferences.availableIngredients.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 text-xs font-semibold px-2 py-0.5 rounded-lg border border-indigo-100/50 dark:border-indigo-900/30"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredient(idx)}
                        className="hover:text-indigo-900 dark:hover:text-indigo-200 cursor-pointer"
                        aria-label={`Remove ${tag} chip`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Allergies (Tags/Chips) */}
            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-2">
                <Input
                  label="Allergies (Optional)"
                  value={allergyInput}
                  onChange={(e) => setAllergyInput(e.target.value)}
                  onKeyDown={handleAddAllergy}
                  placeholder="Type allergy & press Enter"
                  helperText="e.g. gluten, dairy, nuts"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleAddAllergy}
                  className="mb-1 py-3 px-3.5"
                  aria-label="Add allergy chip"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {preferences.allergies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1 border border-slate-100 dark:border-slate-800/40 p-2.5 rounded-xl bg-slate-50/50 dark:bg-slate-900/30">
                  {preferences.allergies.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 text-xs font-semibold px-2 py-0.5 rounded-lg border border-rose-100/50 dark:border-rose-900/30"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveAllergy(idx)}
                        className="hover:text-rose-900 dark:hover:text-rose-200 cursor-pointer"
                        aria-label={`Remove ${tag} allergy chip`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              fullWidth
              className="mt-2 py-3 flex items-center gap-2"
              aria-label="Generate Meal Plan button"
            >
              <Sparkles className="h-4 w-4" />
              {loading ? 'Matching Recipes...' : 'Generate Plan'}
            </Button>
          </form>
        </Card>

        {/* Right Column: Loading, Error, Empty State, or Results */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {loading && (
            <Card className="flex flex-col items-center justify-center py-20 text-center flex-1">
              <div className="relative h-16 w-16 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-slate-100 dark:border-slate-800"></div>
                <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
              </div>
              <p className="text-base font-bold text-slate-800 dark:text-slate-100">
                Finding Your Ideal Meal Plan
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-[280px]">
                Matching locally cached recipes against your portion sizes, budget status, and ingredient profile...
              </p>
            </Card>
          )}

          {!loading && error && (
            <Card className="flex flex-col items-center justify-center py-16 text-center border-rose-100 dark:border-rose-900/20 bg-rose-50/20 dark:bg-rose-950/5">
              <div className="h-12 w-12 rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                Constraints Too Restrictive
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-md leading-relaxed px-4">
                {error}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={resetPlanner}
                className="mt-4"
              >
                Reset Filters & Try Again
              </Button>
            </Card>
          )}

          {!loading && !error && !mealPlan && (
            <Card className="flex flex-col items-center justify-center py-24 text-center border-dashed border-2 border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/10">
              <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-4 animate-pulse">
                <ChefHat className="h-8 w-8" />
              </div>
              <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
                No Plan Generated Yet
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 max-w-[320px] leading-relaxed">
                Fill out the meal preferences form on the left, then click "Generate Plan" to calculate a customized meal plan for your day.
              </p>
            </Card>
          )}

          {!loading && !error && mealPlan && (
            <div className="flex flex-col gap-8 animate-fadeIn">
              {/* A. Budget Feasibility & Radial Progress */}
              <BudgetGauge
                cost={mealPlan.estimatedTotalCost}
                budget={preferences.budget}
                status={mealPlan.budgetFeasibility.status}
                percentage={mealPlan.budgetFeasibility.percentage}
                advice={mealPlan.budgetFeasibility.advice}
              />

              {/* B. Nutrition Summary Card */}
              <Card className="p-6">
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-4 mb-4">
                  <Heart className="h-5 w-5 text-rose-500" />
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    Daily Nutritional Intake (Per-person)
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex flex-col bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-100 dark:border-slate-800/40">
                    <span className="text-xxs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Calories</span>
                    <span className="text-xl font-black text-slate-800 dark:text-slate-100 mt-1">{mealPlan.nutritionalSummary.calories} kcal</span>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-orange-500 h-full rounded-full" style={{ width: `${Math.min((mealPlan.nutritionalSummary.calories / 2000) * 100, 100)}%` }}></div>
                    </div>
                  </div>

                  <div className="flex flex-col bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-100 dark:border-slate-800/40">
                    <span className="text-xxs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Protein</span>
                    <span className="text-xl font-black text-slate-800 dark:text-slate-100 mt-1">{mealPlan.nutritionalSummary.protein}g</span>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${Math.min((mealPlan.nutritionalSummary.protein / 50) * 100, 100)}%` }}></div>
                    </div>
                  </div>

                  <div className="flex flex-col bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-100 dark:border-slate-800/40">
                    <span className="text-xxs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Carbs</span>
                    <span className="text-xl font-black text-slate-800 dark:text-slate-100 mt-1">{mealPlan.nutritionalSummary.carbs}g</span>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min((mealPlan.nutritionalSummary.carbs / 260) * 100, 100)}%` }}></div>
                    </div>
                  </div>

                  <div className="flex flex-col bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-100 dark:border-slate-800/40">
                    <span className="text-xxs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Fat</span>
                    <span className="text-xl font-black text-slate-800 dark:text-slate-100 mt-1">{mealPlan.nutritionalSummary.fat}g</span>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-rose-500 h-full rounded-full" style={{ width: `${Math.min((mealPlan.nutritionalSummary.fat / 70) * 100, 100)}%` }}></div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* C. Three Meal Plans */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MealCard
                  course="breakfast"
                  recipe={mealPlan.breakfast}
                  people={preferences.people}
                  availableIngredients={preferences.availableIngredients}
                />
                <MealCard
                  course="lunch"
                  recipe={mealPlan.lunch}
                  people={preferences.people}
                  availableIngredients={preferences.availableIngredients}
                />
                <MealCard
                  course="dinner"
                  recipe={mealPlan.dinner}
                  people={preferences.people}
                  availableIngredients={preferences.availableIngredients}
                />
              </div>

              {/* D. Grocery Shopping List & Owned pantry items */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 mt-4">
                  <ListTodo className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    Ingredient Checklist & Grocery Items
                  </h3>
                </div>
                <GroceryList
                  groceryList={mealPlan.groceryList}
                  ownedIngredients={mealPlan.ownedIngredients}
                />
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
