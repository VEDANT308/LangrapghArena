import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';
import ProgressBar from './ProgressBar';

function getVerdict(score1, score2) {
  if (score1 > score2) return '🏆 Solution 1 Preferred';
  if (score2 > score1) return '🏆 Solution 2 Preferred';
  return '🏆 Tie';
}

export default function JudgeCard({ judge }) {
  const {
    solution_1_score,
    solution_2_score,
    solution_1_reasoning,
    solution_2_reasoning,
  } = judge;

  const verdict = getVerdict(solution_1_score, solution_2_score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut', delay: 0.1 }}
      className="bg-card border border-border rounded-xl p-6"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-border-secondary">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center">
            <Scale size={14} className="text-accent" />
          </div>
          <span className="text-sm font-semibold text-text-primary">
            Judge Analysis
          </span>
        </div>
        <span className="text-sm font-medium text-text-primary">
          {verdict}
        </span>
      </div>

      {/* Reasoning */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
            Why Solution 1
          </h4>
          <p className="text-sm leading-relaxed text-text-secondary">
            {solution_1_reasoning}
          </p>
        </div>
        <div>
          <h4 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
            Why Solution 2
          </h4>
          <p className="text-sm leading-relaxed text-text-secondary">
            {solution_2_reasoning}
          </p>
        </div>
      </div>

      {/* Score Comparison */}
      <div className="pt-4 border-t border-border-secondary space-y-3">
        <h4 className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
          Score Comparison
        </h4>
        <ProgressBar label="Solution 1" score={solution_1_score} />
        <ProgressBar label="Solution 2" score={solution_2_score} />
      </div>
    </motion.div>
  );
}
