import { useState } from 'react';
import { useDeepSeek } from '@/hooks/useDeepSeek';

export default function DeepSeekChat() {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [input, setInput] = useState('');
  const { analyze, isLoading } = useDeepSeek();

  const handleSend = async () => {
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    
    const response = await analyze(input);
    setMessages(prev => [...prev, { role: 'assistant', content: typeof response === 'string' ? response : JSON.stringify(response) }]);
    setInput('');
  };

  return (
    <div className="border rounded-lg p-4 h-96 flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-2 my-2 rounded ${msg.role === 'user' ? 'bg-blue-50' : 'bg-gray-50'}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="셀러 관련 질문을 입력하세요..."
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          {isLoading ? '전송 중...' : '보내기'}
        </button>
      </div>
    </div>
  );
}
