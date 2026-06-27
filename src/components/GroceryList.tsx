import React, { useState } from 'react';
import { ShoppingBag, Check, CheckSquare, Coffee } from 'lucide-react';
import type { GroceryItem } from '../types/planner';
import { Card } from './ui/Card';

interface GroceryListProps {
  groceryList: GroceryItem[];
  ownedIngredients: GroceryItem[];
}

export const GroceryList: React.FC<GroceryListProps> = ({
  groceryList,
  ownedIngredients,
}) => {
  // Checkbox state for grocery shopping items
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (name: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  // Group missing ingredients by category
  const categories: Record<string, GroceryItem[]> = {};
  groceryList.forEach(item => {
    const cat = item.category || 'Other';
    if (!categories[cat]) {
      categories[cat] = [];
    }
    categories[cat].push(item);
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 1. Missing Ingredients (Grocery Shopping List) */}
      <Card className="lg:col-span-2 flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Grocery Shopping List
            </h3>
          </div>
          <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold px-2.5 py-1 rounded-full">
            {groceryList.length} items missing
          </span>
        </div>

        {groceryList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center flex-1">
            <div className="h-12 w-12 rounded-full bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center text-emerald-500 mb-3">
              <Check className="h-6 w-6" />
            </div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              You have all ingredients!
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-[280px]">
              No missing ingredients found based on your kitchen pantry list.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6 flex-1">
            {Object.entries(categories).map(([category, items]) => (
              <div key={category}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                  {category}
                </h4>
                <div className="flex flex-col gap-2">
                  {items.map((item, idx) => {
                    const isChecked = !!checkedItems[item.name];
                    return (
                      <label
                        key={idx}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer select-none transition-all duration-200 ${
                          isChecked
                            ? 'bg-slate-50 dark:bg-slate-800/20 border-slate-100 dark:border-slate-800/30 text-slate-400 dark:text-slate-500'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleItem(item.name)}
                            className="sr-only" // hidden but accessible
                          />
                          <div className={`h-5 w-5 rounded-md border flex items-center justify-center transition-all ${
                            isChecked
                              ? 'bg-indigo-600 border-indigo-600 text-white'
                              : 'border-slate-300 dark:border-slate-700'
                          }`}>
                            {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                          </div>
                          <span className={`text-sm leading-none font-medium ${isChecked ? 'line-through' : ''}`}>
                            {item.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                            {item.scaledQuantity} {item.unit}
                          </span>
                          <span className={`text-xs font-semibold ${isChecked ? 'text-slate-400 line-through' : 'text-slate-800 dark:text-slate-200'}`}>
                            ${item.scaledPrice.toFixed(2)}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* 2. Ingredients Already Available */}
      <Card className="flex flex-col">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-4 mb-4">
          <Coffee className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            Available in Kitchen
          </h3>
        </div>

        {ownedIngredients.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center flex-1">
            <div className="h-10 w-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
              <CheckSquare className="h-5 w-5" />
            </div>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              No owned items used
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-[200px]">
              None of your available ingredients are in today's recipes.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 flex-1 max-h-[480px] overflow-y-auto pr-1">
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-2 leading-relaxed">
              These ingredients are already in your kitchen and were excluded from your shopping cost (saved you ${ (ownedIngredients.length * 1.25 * (ownedIngredients[0]?.scaledQuantity || 1)).toFixed(2) } estimated):
            </p>
            {ownedIngredients.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50 rounded-xl text-slate-600 dark:text-slate-400"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-4 w-4 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                  <span className="text-sm font-medium">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-500">
                    {item.scaledQuantity} {item.unit}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    $0.00
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
