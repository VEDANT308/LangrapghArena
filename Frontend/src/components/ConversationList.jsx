import ConversationBlock from './ConversationBlock';

export default function ConversationList({ conversations }) {
  if (conversations.length === 0) return null;

  return (
    <div className="space-y-10">
      {conversations.map((conv, idx) => (
        <div key={idx}>
          {idx > 0 && (
            <div className="border-t border-border mb-10" />
          )}
          <ConversationBlock data={conv} />
        </div>
      ))}
    </div>
  );
}
