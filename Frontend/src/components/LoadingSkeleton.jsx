export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-8 my-8 px-4 w-full animate-fade-in">
      {/* Two solution skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SkeletonCard color="emerald" label="Solution 1" />
        <SkeletonCard color="violet" label="Solution 2" />
      </div>

      {/* Judge skeleton */}
      <div className="mt-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse-slow" />
          <div className="h-5 w-48 rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse-slow" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="h-12 rounded-xl bg-zinc-200 dark:bg-zinc-800 animate-pulse-slow" />
            <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse-slow" />
          </div>
          <div className="space-y-3">
            <div className="h-12 rounded-xl bg-zinc-200 dark:bg-zinc-800 animate-pulse-slow" />
            <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard({ color, label }) {
  const dotColor = color === 'emerald' ? 'bg-emerald-500/40' : 'bg-violet-500/40';

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <span className={`w-2 h-2 rounded-full ${dotColor} animate-pulse-slow`} />
        <span className="text-sm font-semibold tracking-wide uppercase text-zinc-400">
          {label}
        </span>
      </div>

      {/* Shimmer lines */}
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse-slow" />
        <div className="h-4 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse-slow [animation-delay:150ms]" />
        <div className="h-4 w-4/6 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse-slow [animation-delay:300ms]" />

        {/* Fake code block */}
        <div className="rounded-xl bg-zinc-950 p-4 mt-4 space-y-2">
          <div className="h-3 w-3/4 rounded bg-zinc-800 animate-pulse-slow [animation-delay:100ms]" />
          <div className="h-3 w-1/2 rounded bg-zinc-800 animate-pulse-slow [animation-delay:200ms]" />
          <div className="h-3 w-5/6 rounded bg-zinc-800 animate-pulse-slow [animation-delay:300ms]" />
          <div className="h-3 w-2/3 rounded bg-zinc-800 animate-pulse-slow [animation-delay:400ms]" />
        </div>

        <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse-slow [animation-delay:450ms]" />
        <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse-slow [animation-delay:500ms]" />
      </div>
    </div>
  );
}
