import { Moon, Sun, Hexagon, Cpu } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const { theme, toggleTheme } = useAppContext();

  return (
    <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between transition-colors duration-200">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="relative flex items-center justify-center w-8 h-8 text-blue-600 dark:text-blue-500">
          <Hexagon className="absolute w-full h-full stroke-[1.5]" />
          <Cpu size={14} className="z-10 group-hover:scale-110 transition-transform" />
        </div>
        <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          LangGraphArena
        </span>
      </Link>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}
