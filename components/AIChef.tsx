import React, { useState, useRef, useEffect } from 'react';
import { X, Send, ChefHat, Sparkles } from 'lucide-react';
import { generateChefResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AIChefProps {
  hasActiveCart?: boolean;
}

export const AIChef: React.FC<AIChefProps> = ({ hasActiveCart = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Namaste! I'm your Dhiraj Chana Shop assistant. Ask me for recipes using our Chana, Kurmura, or Poha!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await generateChefResponse(messages, input);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I can't connect to the kitchen right now.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const positionClass = hasActiveCart ? 'bottom-24' : 'bottom-6';

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed left-6 z-40 p-4 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 transition-all duration-300 transform hover:scale-110 flex items-center gap-2 ${positionClass} ${isOpen ? 'hidden' : 'flex'}`}
      >
        <ChefHat size={24} />
        <span className="font-semibold hidden sm:inline">Ask AI Chef</span>
      </button>

      {/* Chat Window */}
      <div className={`fixed left-6 z-50 w-[calc(100%-3rem)] sm:w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 border border-orange-100 ${positionClass} ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-full">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm">Dhiraj's AI Kitchen</h3>
              <p className="text-xs text-orange-100">Powered by Gemini</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                msg.role === 'user'
                  ? 'bg-orange-600 text-white self-end rounded-br-none'
                  : 'bg-white text-gray-800 border border-gray-200 self-start rounded-bl-none shadow-sm'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="self-start bg-white p-3 rounded-2xl rounded-bl-none border border-gray-200 shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-75" />
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-150" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask for a recipe..."
            className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
};