import React, { useState } from 'react';
import { Crown, ShoppingCart, Store, ChevronRight, Sparkles, Layers } from 'lucide-react';
import { UserProfile } from '../types';

interface EarnViewProps {
  user: UserProfile;
  onOpenGrabOrder: (platform: 'Amazon' | 'eBay' | 'Shopify' | 'AliExpress') => void;
}

export const EarnView: React.FC<EarnViewProps> = ({ user, onOpenGrabOrder }) => {
  const [selectedVipFilter, setSelectedVipFilter] = useState<'All' | 'VIP 1' | 'VIP 2' | 'VIP 3'>('VIP 1');

  const ordersToGo = Math.max(0, user.targetOrdersCount - user.completedOrdersCount);
  const progressPercent = Math.min(100, (user.completedOrdersCount / user.targetOrdersCount) * 100);

  const earnCards = [
    {
      id: 'amazon',
      platform: 'Amazon' as const,
      icon: ShoppingCart,
      iconBg: 'bg-orange-50 text-orange-500',
      vipTag: 'VIP 1',
      vipLevel: 1,
      balanceRange: '20 USDT – 498 USDT',
      commission: '4%',
    },
    {
      id: 'ebay',
      platform: 'eBay' as const,
      icon: Store,
      iconBg: 'bg-blue-50 text-blue-500',
      vipTag: 'VIP 1',
      vipLevel: 1,
      balanceRange: '20 USDT – 498 USDT',
      commission: '4%',
    },
    {
      id: 'shopify',
      platform: 'Shopify' as const,
      icon: Layers,
      iconBg: 'bg-emerald-50 text-emerald-600',
      vipTag: 'VIP 2',
      vipLevel: 2,
      balanceRange: '500 USDT – 1,999 USDT',
      commission: '4.5%',
    },
    {
      id: 'aliexpress',
      platform: 'AliExpress' as const,
      icon: ShoppingCart,
      iconBg: 'bg-red-50 text-red-500',
      vipTag: 'VIP 3',
      vipLevel: 3,
      balanceRange: '2,000 USDT – 4,999 USDT',
      commission: '5.0%',
    },
  ];

  const filteredCards = earnCards.filter((card) => {
    if (selectedVipFilter === 'All') return true;
    return card.vipTag === selectedVipFilter;
  });

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto space-y-5 sm:space-y-6 pb-16">
      {/* Centered Page Header */}
      <div className="text-center">
        <h2 className="text-2xl font-extrabold text-gray-900">Earn</h2>
      </div>

      {/* VIP Status Banner */}
      <div className="w-full bg-[#FFFBEB] border border-amber-200/80 rounded-2xl p-4 md:p-5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-extrabold text-amber-900">{user.vipName}</div>
            <div className="text-xs text-amber-700 font-medium">
              Commission: {(user.commissionRate * 100).toFixed(0)}%
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs font-bold text-amber-900">Next: VIP 2 - Silver</div>
          <div className="text-xs text-amber-700 font-medium">{ordersToGo} orders to go</div>
        </div>
      </div>

      {/* VIP Level Filter Tabs */}
      <div className="flex items-center justify-center gap-3 pt-1">
        {(['All', 'VIP 1', 'VIP 2', 'VIP 3'] as const).map((filter) => {
          const isActive = selectedVipFilter === filter;
          return (
            <button
              key={filter}
              id={`tab-filter-${filter.toLowerCase().replace(' ', '-')}`}
              onClick={() => setSelectedVipFilter(filter)}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all border ${
                isActive
                  ? 'bg-[#00A651] text-white border-[#00A651] shadow-xs'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {filter} {filter === 'VIP 1' && <span className="inline-block ml-1">●</span>}
            </button>
          );
        })}
      </div>

      {/* Task Platform Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {filteredCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              id={`card-earn-${card.id}`}
              onClick={() => onOpenGrabOrder(card.platform)}
              className="bg-white rounded-3xl p-5 border border-emerald-300/80 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center group-hover:scale-105 transition-transform shrink-0`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-base font-extrabold text-gray-900">{card.platform}</h4>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-400 text-amber-950">
                      {card.vipTag}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 font-medium mb-1">
                    Available Balance: {card.balanceRange}
                  </div>
                  <div className="text-xs font-bold text-[#00A651]">
                    Commission: <span className="font-extrabold">{card.commission}</span>
                  </div>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#00A651] flex items-center justify-center group-hover:bg-[#00A651] group-hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress to VIP 2 Bar */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Crown className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-extrabold text-gray-800">Progress to VIP 2 - Silver</span>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="text-xs text-gray-500 font-medium">
          {user.completedOrdersCount} / {user.targetOrdersCount} orders completed
        </div>
      </div>

      {/* No more footer */}
      <div className="text-center text-xs text-gray-400 font-medium pt-8">
        No more
      </div>
    </div>
  );
};
