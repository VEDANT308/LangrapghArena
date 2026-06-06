import { Scale, Plus } from 'lucide-react';

export default function Header({ onNewChat }) {
  return (
    <header className="h-[72px] border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50 flex items-center justify-between px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
          <Scale size={16} className="text-accent" />
        </div>
        <div>
          <h1 className="text-[15px] font-semibold text-text-primary leading-tight">
            AI Judge
          </h1>
          <p className="text-[11px] text-text-muted leading-tight">
            Compare AI Responses
          </p>
        </div>
      </div>

      {/* Right */}
      <button
        onClick={onNewChat}
        className="flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-medium text-text-secondary border border-border rounded-lg hover:bg-border-secondary hover:text-text-primary transition-colors duration-150 cursor-pointer"
      >
        <Plus size={14} />
        New Chat
      </button>
    </header>
  );
}
