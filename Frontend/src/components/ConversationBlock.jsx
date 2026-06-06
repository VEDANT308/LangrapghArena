import QuestionCard from './QuestionCard';
import SolutionCard from './SolutionCard';
import JudgeCard from './JudgeCard';

export default function ConversationBlock({ data }) {
  const { problem, solution_1, solution_2, judge } = data;

  return (
    <div className="space-y-4">
      {/* Question */}
      <QuestionCard problem={problem} />

      {/* Solutions — side by side */}
      <div className="grid grid-cols-2 gap-5">
        <SolutionCard
          title="Solution 1"
          content={solution_1}
          score={judge.solution_1_score}
          index={0}
        />
        <SolutionCard
          title="Solution 2"
          content={solution_2}
          score={judge.solution_2_score}
          index={1}
        />
      </div>

      {/* Judge */}
      <JudgeCard judge={judge} />
    </div>
  );
}
