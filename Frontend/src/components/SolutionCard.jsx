import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import ScoreBadge from './ScoreBadge';
import { Sparkles } from 'lucide-react';

export default function SolutionCard({ title, content, score, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut', delay: index * 0.05 }}
      className="bg-card border border-border rounded-xl p-5 flex flex-col hover:-translate-y-0.5 transition-transform duration-150"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border-secondary">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-border-secondary flex items-center justify-center">
            <Sparkles size={12} className="text-text-muted" />
          </div>
          <span className="text-sm font-semibold text-text-primary">
            {title}
          </span>
        </div>
        <ScoreBadge score={score} />
      </div>

      {/* Content */}
      <div className="prose text-sm flex-1">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </motion.div>
  );
}
