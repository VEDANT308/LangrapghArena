import { NavLink } from 'react-router-dom';
import { Swords, LayoutDashboard, History, Zap } from 'lucide-react';

// Application sidebar

export default function Sidebar() {
  const navItems = [
    { name: 'Arena', icon: <Swords size={20} />, path: '/arena' },
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'History', icon: <History size={20} />, path: '/history' },
  ];

  return (
    <aside className="w-64 bg-zinc-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col h-screen sticky top-0 transition-colors duration-200">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-blue-600 text-white p-2 rounded-xl">
          <Zap size={24} fill="currentColor" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Arena
        </h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

    </aside>
  );
}
