export interface BudgetFeasibility {
  status: 'Under Budget' | 'Tight' | 'Over Budget';
  percentage: number;
  advice: string;
}

/**
 * Calculates feasibility status and provides tailored budget advice.
 */
export function calculateBudgetFeasibility(totalCost: number, budget: number): BudgetFeasibility {
  if (budget <= 0) {
    return {
      status: 'Over Budget',
      percentage: 100,
      advice: 'Please set a valid budget greater than $0 to check feasibility.',
    };
  }

  const percentage = Math.round((totalCost / budget) * 100);
  let status: 'Under Budget' | 'Tight' | 'Over Budget';
  let advice = '';

  if (totalCost <= budget * 0.85) {
    status = 'Under Budget';
    const savings = (budget - totalCost).toFixed(2);
    advice = `Great job! Your meal plan fits comfortably within your budget. You saved $${savings} today!`;
  } else if (totalCost <= budget) {
    status = 'Tight';
    const buffer = (budget - totalCost).toFixed(2);
    advice = `Your meal plan is within budget, but it's close ($${buffer} remaining). Consider buying store-brand items to save more.`;
  } else {
    status = 'Over Budget';
    const deficit = (totalCost - budget).toFixed(2);
    advice = `Your plan is over budget by $${deficit}. Try listing ingredients you already have, swapping expensive items for alternatives, or reducing servings.`;
  }

  return {
    status,
    percentage,
    advice,
  };
}
