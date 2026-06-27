import React from 'react';
import { TrendingDown, TrendingUp, AlertCircle } from 'lucide-react';
import { Card } from './ui/Card';

interface BudgetGaugeProps {
  cost: number;
  budget: number;
  status: 'Under Budget' | 'Tight' | 'Over Budget';
  percentage: number;
  advice: string;
}

export const BudgetGauge: React.FC<BudgetGaugeProps> = ({
  cost,
  budget,
  status,
  percentage,
  advice,
}) => {
  // SVG gauge computations
  const radius = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  
  // Cap percentage visual display at 100% for the main stroke, but let text show actual number
  const visualPercentage = Math.min(percentage, 100);
  const strokeDashoffset = circumference - (visualPercentage / 100) * circumference;

  // Colors based on budget status
  const colorMap = {
    'Under Budget': {
      text: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/30',
      border: 'border-emerald-100 dark:border-emerald-900/30',
      stroke: 'stroke-emerald-500',
      bgStroke: 'stroke-emerald-100 dark:stroke-emerald-900/20',
      icon: <TrendingDown className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
    },
    'Tight': {
      text: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      border: 'border-amber-100 dark:border-amber-900/30',
      stroke: 'stroke-amber-500',
      bgStroke: 'stroke-amber-100 dark:stroke-amber-900/20',
      icon: <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
    },
    'Over Budget': {
      text: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-50 dark:bg-rose-950/30',
      border: 'border-rose-100 dark:border-rose-900/30',
      stroke: 'stroke-rose-500',
      bgStroke: 'stroke-rose-100 dark:stroke-rose-900/20',
      icon: <AlertCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />,
    },
  };

  const activeColors = colorMap[status];

  return (
    <Card className="flex flex-col md:flex-row items-center gap-6 p-6">
      {/* SVG Radial Progress Gauge */}
      <div className="relative flex items-center justify-center h-36 w-36 flex-shrink-0">
        <svg className="transform -rotate-90 w-full h-full">
          {/* Background circle */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            className={`${activeColors.bgStroke} transition-all duration-300`}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            className={`${activeColors.stroke} transition-all duration-500 ease-out`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        {/* Centered Stats Text */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {percentage}%
          </span>
          <span className="text-xxs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            of budget
          </span>
        </div>
      </div>

      {/* Budget Context & Advice */}
      <div className="flex-1 text-center md:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Budget Feasibility Summary
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xl font-bold text-slate-800 dark:text-slate-100`}>
                ${cost.toFixed(2)}
              </span>
              <span className="text-slate-400 dark:text-slate-500 text-sm">
                / ${budget.toFixed(2)} limit
              </span>
            </div>
          </div>

          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${activeColors.bg} ${activeColors.text} ${activeColors.border} border self-center sm:self-auto`}>
            {activeColors.icon}
            {status}
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-3.5 border border-slate-100 dark:border-slate-800/50">
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {advice}
          </p>
        </div>
      </div>
    </Card>
  );
};
