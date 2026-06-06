import { motion } from 'framer-motion';
import { User } from 'lucide-react';

export default function QuestionCard({ problem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="bg-card border border-border rounded-xl p-5"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
          <User size={13} className="text-accent" />
        </div>
        <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
          You
        </span>
      </div>
      <p className="text-[15px] leading-relaxed text-text-primary font-medium">
        {problem}
      </p>
    </motion.div>
  );
}
