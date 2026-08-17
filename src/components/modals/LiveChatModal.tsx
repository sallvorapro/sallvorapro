import React, { useState } from 'react';
import { X, Send, Headphones, CheckCheck, Bot, User } from 'lucide-react';
import { SupportMessage } from '../../types';

interface LiveChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveChatModal: React.FC<LiveChatModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<SupportMessage[]>([
    {
      id: 'm1',
      sender: 'agent',
      text: 'Hello! Welcome to Lifvox / SellvoraPro Official Customer Support. How can we assist you with your orders or account today?',
      time: 'Just now',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg: SupportMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: inputVal,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = inputVal;
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let reply = 'Thank you for reaching out! A senior support specialist is reviewing your request. For urgent balance/order issues, our Telegram channel is also active 24/7.';
      const lower = currentInput.toLowerCase();
      if (lower.includes('deposit') || lower.includes('recharge')) {
        reply = 'Deposits are credited automatically via TRC20/ERC20 after 1-3 blockchain block confirmations. You can view your deposit address under Quick Actions > Recharge.';
      } else if (lower.includes('withdraw')) {
        reply = 'Withdrawals are processed around the clock with zero platform fees. Please ensure your USDT wallet address is accurate.';
      } else if (lower.includes('order') || lower.includes('grab')) {
        reply = 'To grab orders, go to the Earn tab and click on Amazon or eBay. You will earn a 4% commission on VIP 1 Bronze!';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a_${Date.now()}`,
          sender: 'agent',
          text: reply,
          time: 'Just now',
        },
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full h-[540px] shadow-2xl flex flex-col relative border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-4 bg-[#00A651] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-bold">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm">Lifvox VIP Live Support</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
              </div>
              <p className="text-[11px] text-emerald-100 font-medium">Average reply time: &lt;1 minute</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/15 hover:bg-black/25 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/70">
          {messages.map((msg) => {
            const isMe = msg.sender === 'user';
            return (
              <div key={msg.id} className={`flex gap-2.5 ${isMe ? 'justify-end' : 'justify-start'}`}>
                {!isMe && (
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] rounded-2xl p-3.5 text-xs font-medium shadow-xs leading-relaxed ${
                    isMe
                      ? 'bg-[#00A651] text-white rounded-tr-xs'
                      : 'bg-white text-gray-800 border border-gray-200/80 rounded-tl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div
                    className={`text-[9px] mt-1 flex items-center gap-1 ${
                      isMe ? 'text-emerald-100 justify-end' : 'text-gray-400'
                    }`}
                  >
                    <span>{msg.time}</span>
                    {isMe && <CheckCheck className="w-3 h-3" />}
                  </div>
                </div>
                {isMe && (
                  <div className="w-7 h-7 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-gray-400 text-xs pl-2">
              <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></span>
              <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></span>
              <span className="text-[11px]">Support Agent is typing...</span>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2 items-center">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type your question here..."
            className="flex-1 px-4 py-2.5 bg-gray-100 border border-transparent focus:border-emerald-500 rounded-xl text-xs font-medium focus:bg-white focus:outline-none transition-all"
          />
          <button
            type="submit"
            className="p-2.5 bg-[#00A651] hover:bg-[#009247] text-white rounded-xl shadow-xs transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
