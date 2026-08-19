import React, { useState } from 'react';
import {
  Headphones,
  MessageSquare,
  HelpCircle,
  BookOpen,
  Send,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { faqsList } from '../mockData';

interface SupportViewProps {
  onOpenLiveChat: () => void;
}

export const SupportView: React.FC<SupportViewProps> = ({ onOpenLiveChat }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showFaqModal, setShowFaqModal] = useState(false);

  const topCards = [
    {
      id: 'customer-service',
      title: 'Customer Service',
      desc: '24/7 online support for all your needs',
      icon: Headphones,
      iconBg: 'bg-blue-50 text-blue-500',
      action: onOpenLiveChat,
    },
    {
      id: 'live-chat',
      title: 'Live Chat',
      desc: 'Chat with our team in real-time',
      icon: MessageSquare,
      iconBg: 'bg-emerald-50 text-emerald-500',
      action: onOpenLiveChat,
    },
    {
      id: 'faq',
      title: 'FAQ',
      desc: 'Find answers to common questions',
      icon: HelpCircle,
      iconBg: 'bg-orange-50 text-orange-500',
      action: () => setShowFaqModal(true),
    },
    {
      id: 'help-center',
      title: 'Help Center',
      desc: 'Guides and tutorials to get started',
      icon: BookOpen,
      iconBg: 'bg-purple-50 text-purple-500',
      action: () => setShowFaqModal(true),
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900">Support</h2>
        <p className="text-xs text-gray-500 mt-1 font-medium">
          Get help and support for your account
        </p>
      </div>

      {/* 4 Action Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {topCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={card.action}
              className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between relative group"
            >
              <div className="absolute top-4 right-4 text-gray-300 group-hover:text-gray-600 transition-colors">
                <ExternalLink className="w-4 h-4" />
              </div>
              <div>
                <div
                  className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">{card.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Need Quick Help? Section */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs space-y-4">
        <h3 className="text-sm font-extrabold text-gray-900">Need Quick Help?</h3>

        <div className="space-y-3">
          {/* Browse FAQ Item */}
          <div
            onClick={() => setShowFaqModal(true)}
            className="p-4 bg-emerald-50/40 hover:bg-emerald-50/80 rounded-2xl border border-emerald-100 flex items-center justify-between cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">Browse FAQ</h4>
                <p className="text-[11px] text-gray-500">Find answers to common questions</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </div>

          {/* Chat on Telegram Item */}
          <div
            onClick={() => alert('Redirecting to official 24/7 Telegram channel @SellvoraSupportBot')}
            className="p-4 bg-emerald-50/40 hover:bg-emerald-50/80 rounded-2xl border border-emerald-100 flex items-center justify-between cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">Chat on Telegram</h4>
                <p className="text-[11px] text-gray-500">Get instant support from our team</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Footer text */}
      <div className="text-center text-xs text-gray-400 font-medium pt-2">
        Our support team is available 24/7 to assist you
      </div>

      {/* FAQ Drawer / Modal */}
      {showFaqModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-gray-100 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Frequently Asked Questions</h3>
                  <p className="text-xs text-gray-400">Everything you need to know</p>
                </div>
              </div>
              <button
                onClick={() => setShowFaqModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {faqsList.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 transition-all"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left gap-3"
                    >
                      <span className="text-xs font-bold text-gray-900">{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <p className="text-xs text-gray-600 mt-2.5 pt-2.5 border-t border-gray-200 leading-relaxed font-medium">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
