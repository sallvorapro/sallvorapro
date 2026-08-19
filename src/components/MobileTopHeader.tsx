import React from 'react';
import { Menu, Wallet, Sparkles } from 'lucide-react';
import { UserProfile, NavigationTab } from '../types';

interface MobileTopHeaderProps {
  user: UserProfile;
  onOpenDrawer: () => void;
  onNavigateToAccount: () => void;
}

export const MobileTopHeader: React.FC<MobileTopHeaderProps> = ({
  user,
  onOpenDrawer,
  onNavigateToAccount,
}) => {
  return (
    <header className="md:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200/80 px-4 py-3 flex items-center justify-between shadow-2xs">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-400 to-yellow-400 flex items-center justify-center shadow-xs text-white font-bold">
          <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        </div>
        <div>
          <h1 className="text-sm font-extrabold text-gray-900 leading-none">Lifvox</h1>
          <p className="text-[9px] text-gray-400 font-semibold mt-0.5">E-Commerce</p>
        </div>
      </div>

      {/* User Balance & Menu Trigger */}
      <div className="flex items-center gap-2">
        <button
          onClick={onNavigateToAccount}
          className="flex items-center gap-1.5 bg-emerald-50 text-[#00A651] border border-emerald-200/70 px-2.5 py-1 rounded-full text-xs font-bold shadow-2xs active:scale-95 transition-transform"
        >
          <Wallet className="w-3.5 h-3.5 text-emerald-600" />
          <span>{user.balance.toFixed(2)} USDT</span>
        </button>

        <button
          id="btn-mobile-menu-toggle"
          onClick={onOpenDrawer}
          className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-700 flex items-center justify-center transition-colors"
          title="Open Menu"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
