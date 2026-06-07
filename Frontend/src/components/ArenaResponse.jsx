import ReactMarkdown from 'react-markdown';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Reusable Markdown renderer with styled components.
 * Shared between Solution 1 and Solution 2 to avoid duplication.
 */
function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      components={{
        h1: (props) => <h1 className="text-2xl font-bold mt-6 mb-4 text-zinc-900 dark:text-white" {...props} />,
        h2: (props) => <h2 className="text-xl font-bold mt-5 mb-3 text-zinc-900 dark:text-white" {...props} />,
        h3: (props) => <h3 className="text-lg font-bold mt-4 mb-2 text-zinc-900 dark:text-white" {...props} />,
        p: (props) => <p className="mb-4 leading-relaxed text-zinc-700 dark:text-zinc-300" {...props} />,
        ul: (props) => <ul className="list-disc pl-6 mb-4 text-zinc-700 dark:text-zinc-300 space-y-1" {...props} />,
        ol: (props) => <ol className="list-decimal pl-6 mb-4 text-zinc-700 dark:text-zinc-300 space-y-1" {...props} />,
        li: (props) => <li className="text-zinc-700 dark:text-zinc-300" {...props} />,
        a: (props) => <a className="text-blue-600 hover:text-blue-500 underline" target="_blank" rel="noopener noreferrer" {...props} />,
        strong: (props) => <strong className="font-semibold text-zinc-900 dark:text-zinc-100" {...props} />,
        blockquote: (props) => (
          <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-700 pl-4 my-4 text-zinc-600 dark:text-zinc-400 italic" {...props} />
        ),
        code: ({ className, children, ...props }) => {
          // Block code has a className like "language-python"
          const isBlock = /language-/.test(className || '');
          if (isBlock) {
            return (
              <div className="rounded-xl overflow-hidden my-4 border border-zinc-200 dark:border-zinc-800">
                <pre className="p-4 bg-zinc-950 overflow-x-auto text-sm text-zinc-100">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            );
          }
          return (
            <code className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-1.5 py-0.5 rounded-md text-sm font-mono" {...props}>
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

/**
 * Score bar visualization with animated fill.
 */
function ScoreBar({ score, color }) {
  const percentage = (score / 10) * 100;
  const bgClass = color === 'emerald'
    ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
    : 'bg-gradient-to-r from-violet-500 to-violet-400';
  const trackClass = color === 'emerald'
    ? 'bg-emerald-500/10'
    : 'bg-violet-500/10';

  return (
    <div className={`w-full h-2 rounded-full ${trackClass} overflow-hidden`}>
      <div
        className={`h-full rounded-full ${bgClass} animate-score-fill`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export default function ArenaResponse({ solution1, solution2, judge }) {
  return (
    <div className="flex flex-col gap-8 my-8 px-4 w-full animate-slide-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Solution 1 */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm flex flex-col transition-all hover:shadow-md group">
          <h3 className="text-sm font-semibold tracking-wide uppercase text-zinc-500 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" /> Solution 1
          </h3>
          <div className="text-zinc-700 dark:text-zinc-300 flex-1">
            <MarkdownRenderer content={solution1} />
          </div>
        </div>

        {/* Solution 2 */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm flex flex-col transition-all hover:shadow-md group">
          <h3 className="text-sm font-semibold tracking-wide uppercase text-zinc-500 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-500 group-hover:scale-125 transition-transform" /> Solution 2
          </h3>
          <div className="text-zinc-700 dark:text-zinc-300 flex-1">
            <MarkdownRenderer content={solution2} />
          </div>
        </div>
      </div>

      {/* Judge Panel */}
      {judge && (
        <div className="mt-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm animate-fade-in">
          <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-3 mb-6">
            ⚖️ Judge Verdict
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Solution 1 Score */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-zinc-900 px-5 py-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-zinc-600 dark:text-zinc-400">Solution 1</span>
                  <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{judge.solution_1_score}/10</span>
                </div>
                <ScoreBar score={judge.solution_1_score} color="emerald" />
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed px-2">
                {judge.solution_1_reasoning}
              </p>
            </div>

            {/* Solution 2 Score */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-zinc-900 px-5 py-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-zinc-600 dark:text-zinc-400">Solution 2</span>
                  <span className="text-2xl font-bold text-violet-600 dark:text-violet-400">{judge.solution_2_score}/10</span>
                </div>
                <ScoreBar score={judge.solution_2_score} color="violet" />
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed px-2">
                {judge.solution_2_reasoning}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { API_URL };