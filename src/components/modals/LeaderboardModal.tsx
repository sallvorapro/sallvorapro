import React, { useState } from 'react';
import { X, Trophy, Medal, Flame } from 'lucide-react';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [tab, setTab] = useState<'daily' | 'weekly'>('daily');

  if (!isOpen) return null;

  const topEarners = [
    { rank: 1, name: 'David***9', amount: '8,420.50', vip: 'VIP 4', avatar: 'DA' },
    { rank: 2, name: 'Elena***2', amount: '6,180.00', vip: 'VIP 3', avatar: 'EL' },
    { rank: 3, name: 'Michael***7', amount: '4,950.20', vip: 'VIP 3', avatar: 'MI' },
    { rank: 4, name: 'Sarah***1', amount: '3,210.80', vip: 'VIP 2', avatar: 'SA' },
    { rank: 5, name: 'Alex***6', amount: '2,890.00', vip: 'VIP 2', avatar: 'AL' },
    { rank: 6, name: 'Jason***8', amount: '2,140.40', vip: 'VIP 2', avatar: 'JA' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center font-bold">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">Top Earners Leaderboard</h3>
              <p className="text-xs text-gray-400">Real-time commission rankings</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="grid grid-cols-2 gap-2 my-4 p-1 bg-gray-100 rounded-2xl">
          <button
            onClick={() => setTab('daily')}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              tab === 'daily' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'
            }`}
          >
            Today's Top Earners
          </button>
          <button
            onClick={() => setTab('weekly')}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              tab === 'weekly' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'
            }`}
          >
            Weekly Champions
          </button>
        </div>

        {/* List of top rankers */}
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {topEarners.map((item) => (
            <div
              key={item.rank}
              className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                item.rank === 1
                  ? 'bg-amber-50/70 border-amber-200'
                  : item.rank === 2
                  ? 'bg-slate-50 border-slate-200'
                  : item.rank === 3
                  ? 'bg-orange-50/50 border-orange-200'
                  : 'bg-white border-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-extrabold text-xs shrink-0 ${
                    item.rank === 1
                      ? 'bg-amber-400 text-amber-950 shadow-xs'
                      : item.rank === 2
                      ? 'bg-slate-300 text-slate-800'
                      : item.rank === 3
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 text-gray-500 font-medium'
                  }`}
                >
                  {item.rank}
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                  {item.avatar}
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">{item.name}</div>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-gray-100 text-gray-600 border border-gray-200">
                    {item.vip}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-extrabold text-[#00A651]">+{item.amount} USDT</div>
                <div className="text-[10px] text-gray-400 flex items-center justify-end gap-0.5">
                  <Flame className="w-3 h-3 text-orange-500" />
                  <span>Commissions</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
