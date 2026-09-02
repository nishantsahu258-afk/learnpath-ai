import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { askAssistant } from '../services/geminiService';
import { Card } from '../components/ui/Card';

export function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! I am your AI Assistant. How can I help you with your learning today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setError(null);
    
    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const chatHistory = newMessages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
      const prompt = `You are a helpful learning assistant. Provide a short, direct answer without markdown codeblocks or excessive formatting.\n\nConversation history:\n${chatHistory}\nAssistant:`;
      
      const responseText = await askAssistant(prompt);
      
      setMessages([...newMessages, { role: 'assistant', content: responseText }]);
    } catch (err) {
      setError(err.message || 'Failed to get a response.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = async () => {
    if (messages.length === 0) return;
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (!lastUserMessage) return;
    
    setError(null);
    setIsLoading(true);
    
    try {
      const chatHistory = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
      const prompt = `You are a helpful learning assistant. Provide a short, direct answer without markdown codeblocks or excessive formatting.\n\nConversation history:\n${chatHistory}\nAssistant:`;
      
      const responseText = await askAssistant(prompt);
      setMessages([...messages, { role: 'assistant', content: responseText }]);
    } catch (err) {
      setError(err.message || 'Failed to get a response.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] max-w-4xl mx-auto flex flex-col pb-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          AI Assistant <Bot className="text-fuchsia-400" size={32} />
        </h1>
        <p className="text-slate-400">Ask any questions related to your learning journey.</p>
      </div>

      <Card className="flex-1 p-0 flex flex-col min-h-0 border-slate-800 bg-slate-900/50">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-fuchsia-600/20 text-fuchsia-400' : 'bg-cyan-600/20 text-cyan-400'
              }`}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`max-w-[80%] rounded-2xl p-4 whitespace-pre-wrap ${
                msg.role === 'user' 
                  ? 'bg-fuchsia-600/10 border border-fuchsia-500/20 text-white rounded-tr-sm' 
                  : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center shrink-0">
                <Bot size={20} className="animate-pulse" />
              </div>
              <div className="bg-slate-800 border border-slate-700 text-slate-400 p-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{animationDelay: '0.2s'}}></span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{animationDelay: '0.4s'}}></span>
              </div>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-3">
                <AlertTriangle size={24} className="text-red-500" />
              </div>
              <p className="text-slate-300 mb-4">{error}</p>
              <Button variant="outline" onClick={handleRetry} className="gap-2 bg-slate-800 hover:bg-slate-700">
                <RefreshCcw size={16} /> Try Again
              </Button>
            </div>
          )}
          
          <div ref={endOfMessagesRef} />
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950/50">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
              disabled={isLoading}
            />
            <Button variant="gradient" type="submit" disabled={!input.trim() || isLoading} className="px-6 rounded-xl">
              <Send size={18} />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
