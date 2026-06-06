import { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import ConversationList from './components/ConversationList';
import ChatInput from './components/ChatInput';
import LoadingIndicator from './components/LoadingIndicator';
import EmptyState from './components/EmptyState';

const API_URL = 'http://localhost:3000/evaluate';

export default function App() {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom on new conversation
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [conversations, isLoading]);

  async function handleSend(problem) {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      setConversations((prev) => [...prev, data]);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  function handleNewChat() {
    setConversations([]);
    setError(null);
  }

  return (
    <div className="h-screen flex flex-col bg-bg">
      <Header onNewChat={handleNewChat} />

      {/* Scrollable Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto flex flex-col">
        {conversations.length === 0 && !isLoading ? (
          <EmptyState />
        ) : (
          <div className="max-w-[1100px] w-full mx-auto px-6 py-8">
            <ConversationList conversations={conversations} />
            {isLoading && <div className="mt-6"><LoadingIndicator /></div>}
          </div>
        )}

        {error && (
          <div className="max-w-[1100px] w-full mx-auto px-6">
            <div className="mt-4 p-4 bg-red-bg border border-red-border rounded-xl text-sm text-red">
              {error}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Input */}
      <div className="border-t border-border bg-card">
        <div className="max-w-[800px] w-full mx-auto px-6">
          <ChatInput onSend={handleSend} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
