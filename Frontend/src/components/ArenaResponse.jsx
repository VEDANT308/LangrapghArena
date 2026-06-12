import ReactMarkdown from 'react-markdown';
import { Trophy, Copy, Check } from 'lucide-react';
import { useState } from 'react';

// Arena response component


function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      components={{
        h1: (props) => <h1 className="text-xl font-bold mt-5 mb-3 text-zinc-900 dark:text-white" {...props} />,
        h2: (props) => <h2 className="text-lg font-bold mt-4 mb-2 text-zinc-900 dark:text-white" {...props} />,
        h3: (props) => <h3 className="text-md font-bold mt-3 mb-2 text-zinc-900 dark:text-white" {...props} />,
        p: (props) => <p className="mb-3 leading-relaxed text-sm text-zinc-700 dark:text-zinc-300" {...props} />,
        ul: (props) => <ul className="list-disc pl-5 mb-3 text-sm text-zinc-700 dark:text-zinc-300 space-y-1" {...props} />,
        ol: (props) => <ol className="list-decimal pl-5 mb-3 text-sm text-zinc-700 dark:text-zinc-300 space-y-1" {...props} />,
        li: (props) => <li className="text-zinc-700 dark:text-zinc-300" {...props} />,
        a: (props) => <a className="text-blue-600 hover:text-blue-500 underline" target="_blank" rel="noopener noreferrer" {...props} />,
        strong: (props) => <strong className="font-semibold text-zinc-900 dark:text-zinc-100" {...props} />,
        blockquote: (props) => (
          <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-700 pl-4 my-3 text-sm text-zinc-600 dark:text-zinc-400 italic" {...props} />
        ),
        code: ({ className, children, ...props }) => {
          const isBlock = /language-/.test(className || '');
          if (isBlock) {
            return (
              <div className="rounded-xl overflow-hidden my-3 border border-zinc-200 dark:border-zinc-800 bg-zinc-950 group relative">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <CopyButton text={String(children)} />
                </div>
                <pre className="p-4 overflow-x-auto text-xs text-zinc-100">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            );
          }
          return (
            <code className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-1.5 py-0.5 rounded-md text-xs font-mono border border-zinc-200 dark:border-zinc-700" {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button 
      onClick={handleCopy}
      className="p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
      title="Copy code"
    >
      {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
    </button>
  );
}

export default function ArenaResponse({ solution1, solution2, judge }) {
  const mScore = judge?.solution_1_score || 0;
  const cScore = judge?.solution_2_score || 0;
  const winner = mScore > cScore ? 'solution1' : cScore > mScore ? 'solution2' : 'tie';

  return (
    <div className="flex flex-col gap-6 my-6 px-2 w-full animate-slide-up">
      {judge && winner !== 'tie' && (
        <div className="flex justify-center -mb-2 z-10">
          <div className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg animate-fade-in">
            <Trophy size={16} className={winner === 'solution1' ? 'text-blue-400 dark:text-blue-600' : 'text-emerald-400 dark:text-emerald-600'} />
            {winner === 'solution1' ? 'Gemini Wins' : 'Mistral Wins'}
          </div>
        </div>
      )}
      {judge && winner === 'tie' && (
        <div className="flex justify-center -mb-2 z-10">
          <div className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 border border-zinc-200 dark:border-zinc-700">
            🤝 It's a Tie
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full items-center justify-center text-xs font-bold text-zinc-400 z-10 shadow-sm">
          VS
        </div>

        <div className={`bg-white dark:bg-zinc-900 border-2 rounded-3xl p-6 shadow-sm flex flex-col transition-all ${
          winner === 'solution1' ? 'border-blue-500 shadow-blue-500/10 shadow-lg' : 'border-zinc-200 dark:border-zinc-800'
        }`}>
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <h3 className="text-sm font-bold tracking-wide text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-sm shadow-blue-500/50" /> 
              Gemini
            </h3>
            {judge && (
              <div className="flex items-center gap-3">
                <span className="text-2xl font-black tracking-tighter text-blue-600 dark:text-blue-400">{mScore}<span className="text-sm text-blue-600/50">/10</span></span>
              </div>
            )}
          </div>
          
          <div className="prose prose-zinc dark:prose-invert max-w-none flex-1">
            <MarkdownRenderer content={solution1} />
          </div>

          {judge && (
            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 -mx-6 -mb-6 p-6 rounded-b-3xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2">
                Judge Reasoning
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {judge.solution_1_reasoning}
              </p>
            </div>
          )}
        </div>

        <div className={`bg-white dark:bg-zinc-900 border-2 rounded-3xl p-6 shadow-sm flex flex-col transition-all ${
          winner === 'solution2' ? 'border-emerald-500 shadow-emerald-500/10 shadow-lg' : 'border-zinc-200 dark:border-zinc-800'
        }`}>
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <h3 className="text-sm font-bold tracking-wide text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" /> 
              Mistral
            </h3>
            {judge && (
              <div className="flex items-center gap-3">
                <span className="text-2xl font-black tracking-tighter text-emerald-600 dark:text-emerald-400">{cScore}<span className="text-sm text-emerald-600/50">/10</span></span>
              </div>
            )}
          </div>
          
          <div className="prose prose-zinc dark:prose-invert max-w-none flex-1">
            <MarkdownRenderer content={solution2} />
          </div>

          {judge && (
            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 -mx-6 -mb-6 p-6 rounded-b-3xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2">
                Judge Reasoning
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {judge.solution_2_reasoning}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
