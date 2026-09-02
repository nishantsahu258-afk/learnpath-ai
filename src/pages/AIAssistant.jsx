import { useState, useRef, useEffect } from 'react';
import { 
  PaperPlaneRight, 
  Paperclip, 
  BookOpen, 
  Sparkle, 
  Question, 
  TrendUp, 
  Info, 
  Warning, 
  ArrowsClockwise,
  User 
} from '@phosphor-icons/react';
import { askAssistant } from '../services/geminiService';
import { useLearning } from '../context/LearningContext';
import { 
  HeaderRobotMascot, 
  HeroCosmicRobot, 
  BotMessageAvatar 
} from '../components/assistant/AssistantMascot';

export function AIAssistant() {
  const { learningPath } = useLearning();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading, error]);

  const formatCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const sendMessage = async (textToSend) => {
    const userText = (textToSend || input).trim();
    if (!userText || isLoading) return;

    setInput('');
    setError(null);
    
    const userMsg = { 
      role: 'user', 
      content: userText,
      time: formatCurrentTime()
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const pathContext = learningPath 
        ? `User's Current Goal: "${learningPath.goal || 'General Learning'}"\nModules: ${learningPath.modules?.map(m => m.title).join(', ') || 'N/A'}`
        : '';

      const chatHistory = newMessages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
      const prompt = `You are a friendly, encouraging, and intelligent AI Learning Assistant. Provide helpful, direct, and engaging answers.

${pathContext}

Conversation history:
${chatHistory}
Assistant:`;
      
      const responseText = await askAssistant(prompt);
      
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: responseText,
        time: formatCurrentTime()
      }]);
    } catch (err) {
      setError(err.message || 'Failed to get a response.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handlePromptClick = (promptQuery) => {
    sendMessage(promptQuery);
  };

  const handleRetry = async () => {
    if (messages.length === 0) return;
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (!lastUserMessage) return;
    
    setError(null);
    setIsLoading(true);
    
    try {
      const chatHistory = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
      const prompt = `You are a helpful learning assistant. Provide a clear, direct answer.\n\nConversation history:\n${chatHistory}\nAssistant:`;
      
      const responseText = await askAssistant(prompt);
      setMessages([...messages, { 
        role: 'assistant', 
        content: responseText,
        time: formatCurrentTime()
      }]);
    } catch (err) {
      setError(err.message || 'Failed to get a response.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1240px] mx-auto text-white flex flex-col select-none h-[calc(100vh-6.8rem)] min-h-[500px]">
      
      {/* 1. TOP HEADER (Centered with mascot icon and sparkle) */}
      <div className="flex flex-col items-center justify-center text-center mb-3 pt-0.5 shrink-0">
        <div className="flex items-center gap-2.5">
          <HeaderRobotMascot />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2 tracking-tight">
            AI Assistant
            <span className="text-fuchsia-400 text-xl animate-pulse">✦</span>
          </h1>
        </div>
        <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
          Ask any questions related to your learning journey.
        </p>
      </div>

      {/* 2. MAIN CARD CONTAINER */}
      <div className="bg-[#0c0a1d] border border-purple-900/40 rounded-3xl p-4 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative overflow-hidden flex flex-col flex-1 min-h-0">
        
        {/* Soft internal cosmic ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-fuchsia-600/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col flex-1 min-h-0 h-full">
          
          {/* 3. EMPTY STATE: Hero Mascot + 4 Quick Prompt Pills (Only visible when chat has not started) */}
          {messages.length === 0 && (
            <div className="my-auto flex flex-col items-center justify-center text-center py-2 shrink-0 animate-in fade-in duration-300">
              {/* Hero Mascot */}
              <div className="flex flex-col items-center justify-center text-center pt-1 pb-3">
                <HeroCosmicRobot />
                
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2 mb-1">
                  Hi there! <span className="text-xl">👋</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md text-center leading-relaxed">
                  I’m your AI Assistant. I can help you learn better, understand concepts, practice and grow every day.
                </p>
              </div>

              {/* 4 Quick Action Prompt Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mt-1 mb-2">
                <button
                  onClick={() => handlePromptClick("Can you explain a core concept from my learning path in simple terms?")}
                  className="px-4 py-2 rounded-xl bg-[#150f2a] border border-purple-900/40 hover:border-fuchsia-500/60 hover:bg-[#1f133d] text-xs sm:text-sm font-medium text-slate-200 transition-all flex items-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] group"
                >
                  <BookOpen size={16} weight="duotone" className="text-purple-400 group-hover:text-purple-300 transition-colors" />
                  <span>Explain a concept</span>
                </button>

                <button
                  onClick={() => handlePromptClick("Give me a hands-on practice challenge based on my current topic.")}
                  className="px-4 py-2 rounded-xl bg-[#150f2a] border border-purple-900/40 hover:border-fuchsia-500/60 hover:bg-[#1f133d] text-xs sm:text-sm font-medium text-slate-200 transition-all flex items-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] group"
                >
                  <Sparkle size={16} weight="duotone" className="text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors" />
                  <span>Help me practice</span>
                </button>

                <button
                  onClick={() => handlePromptClick("Create a quick 3-question quiz to test my understanding.")}
                  className="px-4 py-2 rounded-xl bg-[#150f2a] border border-purple-900/40 hover:border-fuchsia-500/60 hover:bg-[#1f133d] text-xs sm:text-sm font-medium text-slate-200 transition-all flex items-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] group"
                >
                  <Question size={16} weight="bold" className="text-amber-400 group-hover:text-amber-300 transition-colors" />
                  <span>Create a quiz</span>
                </button>

                <button
                  onClick={() => handlePromptClick("Review my overall learning progress and give me strategic feedback.")}
                  className="px-4 py-2 rounded-xl bg-[#150f2a] border border-purple-900/40 hover:border-fuchsia-500/60 hover:bg-[#1f133d] text-xs sm:text-sm font-medium text-slate-200 transition-all flex items-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] group"
                >
                  <TrendUp size={16} weight="bold" className="text-pink-400 group-hover:text-pink-300 transition-colors" />
                  <span>Review my progress</span>
                </button>
              </div>
            </div>
          )}

          {/* 4. ACTIVE CHAT TOP BAR (Only visible when conversation is active) */}
          {messages.length > 0 && (
            <div className="shrink-0 flex items-center justify-between pb-3 mb-2 border-b border-purple-900/30">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                <span className="font-semibold text-slate-200 tracking-wide">Conversation Active</span>
              </div>
              <button
                type="button"
                onClick={() => setMessages([])}
                className="text-xs text-slate-400 hover:text-fuchsia-300 transition-all cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#140e28] hover:bg-[#1f143d] border border-purple-900/40 hover:border-fuchsia-500/40 shadow-sm"
              >
                <span>+ New Chat</span>
              </button>
            </div>
          )}

          {/* 5. CHAT MESSAGES STREAM (Takes full remaining height, scrolls internally) */}
          {(messages.length > 0 || isLoading || error) && (
            <div 
              ref={chatContainerRef}
              className="flex-1 min-h-0 overflow-y-auto space-y-4 px-2 sm:px-3 py-3 mb-2 scrollbar-thin scrollbar-thumb-purple-900/50 scroll-smooth animate-in fade-in duration-200"
            >
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Bot Avatar */}
                  {msg.role === 'assistant' && <BotMessageAvatar />}
                  
                  {/* Message Bubble */}
                  <div className="relative group max-w-[85%] sm:max-w-xl">
                    <div 
                      className={`rounded-2xl px-5 py-3.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-lg ${
                        msg.role === 'user'
                          ? 'bg-[#15102a] border border-purple-900/40 text-white rounded-br-sm'
                          : 'bg-[#121026] border border-purple-900/30 text-slate-100 rounded-bl-sm'
                      }`}
                    >
                      <div>{msg.content}</div>
                      
                      {/* Timestamp in bottom right */}
                      <div className="text-[10px] text-slate-500 mt-1.5 text-right font-medium">
                        {msg.time || '10:30 AM'}
                      </div>
                    </div>
                  </div>

                  {/* User Avatar */}
                  {msg.role === 'user' && (
                    <div className="w-9 h-9 rounded-full bg-[#120f26] border border-purple-500/50 flex items-center justify-center text-purple-300 shrink-0 shadow-[0_0_10px_rgba(217,70,239,0.3)]">
                      <User size={16} weight="duotone" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-end gap-3 justify-start">
                  <BotMessageAvatar />
                  <div className="bg-[#121026] border border-purple-900/30 rounded-2xl rounded-bl-sm px-5 py-3.5 flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}

              {error && (
                <div className="flex flex-col items-center justify-center py-4 text-center">
                  <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center mb-2">
                    <Warning size={22} weight="duotone" className="text-red-500" />
                  </div>
                  <p className="text-xs text-slate-300 mb-2">{error}</p>
                  <button 
                    onClick={handleRetry} 
                    className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-white flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <ArrowsClockwise size={14} weight="bold" /> Try Again
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 6. INPUT BAR CONTAINER (Always anchored at bottom) */}
          <form onSubmit={handleSubmit} className="relative shrink-0 mt-auto pt-2">
            <div className="bg-[#0e0c1f] border border-purple-900/40 rounded-2xl p-1.5 sm:p-2 flex items-center gap-2 shadow-inner focus-within:border-fuchsia-500/50 transition-all">
              
              {/* Attachment Icon Button */}
              <button
                type="button"
                className="w-10 h-10 rounded-xl bg-[#140e28] border border-purple-900/40 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 hover:bg-[#1a1236] transition-all shrink-0 cursor-pointer"
                title="Attach file"
              >
                <Paperclip size={18} weight="regular" />
              </button>

              {/* Text Input */}
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
                disabled={isLoading}
              />

              {/* Glowing Gradient Send Button */}
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 flex items-center justify-center text-white shadow-[0_0_18px_rgba(217,70,239,0.5)] hover:shadow-[0_0_26px_rgba(217,70,239,0.85)] hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
                title="Send message"
              >
                <PaperPlaneRight size={18} weight="fill" />
              </button>

            </div>

            {/* Disclaimer under Input */}
            <div className="text-[11px] text-slate-500 mt-2.5 text-center flex items-center justify-center gap-1.5 font-normal">
              <span>AI can make mistakes. Verify important information.</span>
              <Info size={13} weight="regular" className="text-slate-500 inline" />
            </div>
          </form>

        </div>

      </div>

    </div>
  );
}
