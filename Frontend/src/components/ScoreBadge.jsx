import { motion } from 'framer-motion';

function getScoreStyle(score) {
  if (score >= 9) {
    return {
      bg: 'bg-green-bg',
      text: 'text-green',
      border: 'border-green-border',
    };
  }
  if (score >= 7) {
    return {
      bg: 'bg-amber-bg',
      text: 'text-amber',
      border: 'border-amber-border',
    };
  }
  return {
    bg: 'bg-red-bg',
    text: 'text-red',
    border: 'border-red-border',
  };
}

export default function ScoreBadge({ score }) {
  const style = getScoreStyle(score);

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${style.bg} ${style.text} ${style.border}`}
    >
      {score}/10
    </motion.span>
  );
}
