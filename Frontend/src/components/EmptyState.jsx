import { Scale } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-20">
      <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
        <Scale size={24} className="text-accent" />
      </div>
      <h2 className="text-xl font-semibold text-text-primary mb-2">
        AI Judge
      </h2>
      <p className="text-sm text-text-muted max-w-sm leading-relaxed">
        Ask any question and watch two AI models compete.
        A judge will score and analyze both responses.
      </p>
    </div>
  );
}
