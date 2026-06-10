import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Search, Trash2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Battle history store

export default function HistoryPage() {
  const { history, clearHistory } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredHistory = history.filter(battle => 
    battle.problem.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Battle History</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">Review past match-ups and judge decisions.</p>
        </div>
        
        {history.length > 0 && (
          <button 
            onClick={clearHistory}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
          >
            <Trash2 size={16} />
            Clear History
          </button>
        )}
      </div>

      {history.length > 0 && (
        <div className="mb-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
          <input 
            type="text" 
            placeholder="Search past battles by prompt..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {filteredHistory.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-zinc-400" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">No battles found</h3>
          <p className="text-zinc-500 dark:text-zinc-400">
            {searchTerm ? "No results match your search." : "You haven't fought any battles yet."}
          </p>
          {!searchTerm && (
            <button 
              onClick={() => navigate('/arena')}
              className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors"
            >
              Go to Arena
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map(battle => {
            const mScore = battle.judge.solution_1_score;
            const cScore = battle.judge.solution_2_score;
            const winner = mScore > cScore ? 'Gemini' : cScore > mScore ? 'Mistral' : 'Tie';
            const isTie = winner === 'Tie';

            return (
              <div key={battle.id} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-md">
                        {new Date(battle.date).toLocaleDateString()}
                      </span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                        isTie ? 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400' :
                        winner === 'Gemini' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 
                        'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                      }`}>
                        Winner: {winner}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-white line-clamp-2">
                      {battle.problem}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex gap-4">
                      <div className="text-center">
                        <p className="text-xs text-zinc-500 mb-1">Gemini</p>
                        <p className={`text-xl font-bold ${winner === 'Gemini' ? 'text-blue-500' : 'text-zinc-700 dark:text-zinc-300'}`}>{mScore}</p>
                      </div>
                      <div className="w-px bg-zinc-200 dark:bg-zinc-800"></div>
                      <div className="text-center">
                        <p className="text-xs text-zinc-500 mb-1">Mistral</p>
                        <p className={`text-xl font-bold ${winner === 'Mistral' ? 'text-emerald-500' : 'text-zinc-700 dark:text-zinc-300'}`}>{cScore}</p>
                      </div>
                    </div>
                    
                    <button className="w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:bg-zinc-100 dark:group-hover:bg-zinc-700 transition-all">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
