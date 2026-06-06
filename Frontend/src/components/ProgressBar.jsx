import { motion } from 'framer-motion';

function getBarColor(score) {
  if (score >= 9) return 'bg-green';
  if (score >= 7) return 'bg-amber';
  return 'bg-red';
}

export default function ProgressBar({ label, score, maxScore = 10 }) {
  const percentage = Math.min((score / maxScore) * 100, 100);
  const barColor = getBarColor(score);

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-text-secondary w-24 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-2 bg-border-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          className={`h-full rounded-full ${barColor}`}
        />
      </div>
      <span className="text-sm font-semibold text-text-primary w-8 text-right tabular-nums">
        {score}
      </span>
    </div>
  );
}
