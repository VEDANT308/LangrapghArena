import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function ChatInput({ onSend, isLoading }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 160) + 'px';
    }
  }, [value]);

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue('');
  }

  return (
    <div className="py-4">
      <div className="max-w-3xl mx-auto">
        <div
          className="flex items-end gap-3 bg-card border border-border rounded-2xl px-4 py-3 shadow-sm transition-shadow duration-150 focus-within:shadow-md focus-within:border-text-muted/30"
          style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            disabled={isLoading}
            rows={1}
            className="flex-1 resize-none text-[15px] leading-relaxed text-text-primary placeholder-text-muted bg-transparent outline-none disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={!value.trim() || isLoading}
            className="w-9 h-9 shrink-0 rounded-full bg-accent flex items-center justify-center text-white hover:bg-accent/90 transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <Send size={15} />
          </button>
        </div>
        <p className="text-center text-[11px] text-text-muted mt-2.5">
          Press Enter to send · Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}
