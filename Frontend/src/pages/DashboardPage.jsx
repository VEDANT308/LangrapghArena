import { useAppContext } from '../context/AppContext';
import { Trophy, Target, TrendingUp, Swords } from 'lucide-react';

// User dashboard

export default function DashboardPage() {
  const { history } = useAppContext();

  const totalBattles = history.length;
  
  // Calculate some basic stats
  const geminiWins = history.filter(b => b.judge.solution_1_score > b.judge.solution_2_score).length;
  const mistralWins = history.filter(b => b.judge.solution_2_score > b.judge.solution_1_score).length;
  const ties = history.filter(b => b.judge.solution_1_score === b.judge.solution_2_score).length;

  const winRateGemini = totalBattles ? Math.round((geminiWins / totalBattles) * 100) : 0;
  const winRateMistral = totalBattles ? Math.round((mistralWins / totalBattles) * 100) : 0;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Dashboard</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-2">Overview of your AI battle statistics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-xl">
              <Swords size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Battles</p>
              <h3 className="text-3xl font-bold text-zinc-900 dark:text-white">{totalBattles}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-xl">
              <Trophy size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Gemini Wins</p>
              <h3 className="text-3xl font-bold text-zinc-900 dark:text-white">{geminiWins}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-xl">
              <Trophy size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Mistral Wins</p>
              <h3 className="text-3xl font-bold text-zinc-900 dark:text-white">{mistralWins}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 rounded-xl">
              <Target size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Ties</p>
              <h3 className="text-3xl font-bold text-zinc-900 dark:text-white">{ties}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Win Rate Bars */}
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm mb-12">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
          <TrendingUp size={20} className="text-zinc-400" /> Win Rates
        </h3>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Gemini</span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{winRateGemini}%</span>
            </div>
            <div className="w-full h-3 bg-blue-100 dark:bg-blue-900/20 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full transition-all duration-1000" style={{ width: `${winRateGemini}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">Mistral</span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{winRateMistral}%</span>
            </div>
            <div className="w-full h-3 bg-emerald-100 dark:bg-emerald-900/20 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${winRateMistral}%` }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Battles */}
      <div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">Recent Activity</h3>
        {history.length === 0 ? (
           <div className="text-center py-12 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700">
             <p className="text-zinc-500 dark:text-zinc-400">No battles fought yet. Head to the Arena!</p>
           </div>
        ) : (
          <div className="space-y-4">
            {history.slice(0, 5).map(battle => {
              const mScore = battle.judge.solution_1_score;
              const cScore = battle.judge.solution_2_score;
              const winner = mScore > cScore ? 'Gemini' : cScore > mScore ? 'Mistral' : 'Tie';
              const isTie = winner === 'Tie';

              return (
                <div key={battle.id} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0 pr-4">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                      {battle.problem}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {new Date(battle.date).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-zinc-500">Winner</p>
                      <p className={`text-sm font-bold ${
                        isTie ? 'text-zinc-500' :
                        winner === 'Gemini' ? 'text-blue-500' : 'text-emerald-500'
                      }`}>
                        {winner}
                      </p>
                    </div>
                    <div className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-sm font-mono text-zinc-600 dark:text-zinc-300">
                      {mScore} - {cScore}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
