import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50 transition-colors duration-200">
      {/* Premium Top Decorative Bar */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 w-full"></div>

      {/* Main Container */}
      <main className="pb-16">
        <Dashboard />
      </main>

      {/* Premium Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 text-center text-xs text-slate-400 dark:text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Cooking To-Do List. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-600 dark:hover:text-slate-300">Clean Architecture</span>
            <span>•</span>
            <span className="hover:text-slate-600 dark:hover:text-slate-300">Portions Scaling</span>
            <span>•</span>
            <span className="hover:text-slate-600 dark:hover:text-slate-300">Budget Feasibility Check</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
