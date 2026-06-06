import { motion } from 'framer-motion';

export default function LoadingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className="bg-card border border-border rounded-xl p-5 flex items-center gap-3"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
    >
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-accent"
            style={{
              animation: 'pulse-dot 1.2s ease-in-out infinite',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
      <span className="text-sm text-text-muted">
        Evaluating responses...
      </span>
    </motion.div>
  );
}
