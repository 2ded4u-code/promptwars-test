import React, { useState } from 'react';
import { Clock, Flame, Check, AlertTriangle, ArrowRightLeft } from 'lucide-react';
import type { Recipe } from '../types/planner';
import { Card } from './ui/Card';
import { isIngredientOwned } from '../utils/planner';

interface MealCardProps {
  course: 'breakfast' | 'lunch' | 'dinner';
  recipe: Recipe;
  people: number;
  availableIngredients: string[];
}

export const MealCard: React.FC<MealCardProps> = ({
  course,
  recipe,
  people,
  availableIngredients,
}) => {
  // Checkbox state for instructions checklist
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const portionFactor = people / 2;

  // Capitalize course title
  const courseTitle = course.charAt(0).toUpperCase() + course.slice(1);

  // Define course badge style
  const badgeStyles = {
    breakfast: 'bg-orange-50 text-orange-700 dark:bg-orange-950/20 dark:text-orange-400 border-orange-100 dark:border-orange-900/30',
    lunch: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30',
    dinner: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/30',
  };

  return (
    <Card hoverable className="flex flex-col h-full">
      {/* Course Header & Title */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${badgeStyles[course]}`}>
          {courseTitle}
        </span>
        <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 text-xs">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.time}m</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="h-4 w-4 text-orange-500" />
            <span>{recipe.calories} kcal</span>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 leading-snug">
        {recipe.name}
      </h3>

      {/* Allergens Warn */}
      {recipe.allergens.length > 0 && (
        <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 text-xxs font-semibold uppercase tracking-wider mb-4">
          <AlertTriangle className="h-3.5 w-3.5" />
          <span>Allergens: {recipe.allergens.join(', ')}</span>
        </div>
      )}

      {/* Macronutrient Summary Grid */}
      <div className="grid grid-cols-3 gap-2 py-2.5 px-3 mb-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-center border border-slate-100 dark:border-slate-800/50">
        <div>
          <div className="text-xs font-bold text-slate-700 dark:text-slate-200">
            {recipe.macronutrients.protein}g
          </div>
          <div className="text-xxs uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Protein
          </div>
        </div>
        <div>
          <div className="text-xs font-bold text-slate-700 dark:text-slate-200">
            {recipe.macronutrients.carbs}g
          </div>
          <div className="text-xxs uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Carbs
          </div>
        </div>
        <div>
          <div className="text-xs font-bold text-slate-700 dark:text-slate-200">
            {recipe.macronutrients.fat}g
          </div>
          <div className="text-xxs uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Fat
          </div>
        </div>
      </div>

      {/* Ingredients List */}
      <div className="mb-6 flex-1">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Ingredients ({people} {people === 1 ? 'person' : 'people'})
        </h4>
        <ul className="divide-y divide-slate-100 dark:divide-slate-800/80 border-t border-b border-slate-100 dark:border-slate-800/80">
          {recipe.ingredients.map((ing, idx) => {
            const isOwned = isIngredientOwned(ing.name, availableIngredients);
            const scaledQty = ing.quantity * portionFactor;
            return (
              <li key={idx} className="py-2 flex items-center justify-between text-sm">
                <span className={`font-medium ${isOwned ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-700 dark:text-slate-200'}`}>
                  {ing.name}
                  {isOwned && (
                    <span className="ml-1.5 text-xxs font-bold uppercase text-indigo-500 dark:text-indigo-400">
                      (Owned)
                    </span>
                  )}
                </span>
                <span className="text-slate-500 dark:text-slate-400 font-mono text-xs">
                  {Number(scaledQty.toFixed(2))} {ing.unit}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Substitutions Section */}
      {Object.keys(recipe.substitutions).length > 0 && (
        <div className="mb-6 bg-indigo-50/40 dark:bg-indigo-950/10 rounded-xl p-3 border border-indigo-100/50 dark:border-indigo-900/20">
          <div className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-400 text-xs font-bold mb-2">
            <ArrowRightLeft className="h-3.5 w-3.5" />
            <span>Smart Substitutions</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {Object.entries(recipe.substitutions).map(([original, alts]) => (
              <div key={original} className="text-xs text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{original}</span>
                <span className="mx-1">→</span>
                <span>{alts.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cooking Instructions Checklist */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Instructions Checklist
        </h4>
        <div className="flex flex-col gap-2">
          {recipe.instructions.map((step, idx) => {
            const isCompleted = !!completedSteps[idx];
            return (
              <label
                key={idx}
                className={`flex gap-3 p-3 rounded-xl border text-sm cursor-pointer select-none transition-all duration-200 ${
                  isCompleted
                    ? 'bg-slate-50 dark:bg-slate-800/20 border-slate-100 dark:border-slate-800/30 text-slate-400 dark:text-slate-500'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="flex items-center justify-center flex-shrink-0 mt-0.5">
                  <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => toggleStep(idx)}
                    className="sr-only" // Hidden checkbox, but still accessible
                  />
                  <div className={`h-5.5 w-5.5 rounded-lg border flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-slate-300 dark:border-slate-700'
                  }`}>
                    {isCompleted && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </div>
                </div>
                <span className={`leading-relaxed ${isCompleted ? 'line-through' : ''}`}>
                  {step}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
