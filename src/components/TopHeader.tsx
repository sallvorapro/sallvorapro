import React from 'react';
import { Wallet, ShieldCheck, LogOut } from 'lucide-react';
import { UserProfile, NavigationTab } from '../types';

interface TopHeaderProps {
  user: UserProfile;
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onNavigateToAccount: () => void;
  onLogout?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  user,
  currentTab,
  onSelectTab,
  onNavigateToAccount,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs select-none">
      {/* Brand Logo & Name */}
      <div
        className="flex items-center gap-2.5 cursor-pointer"
        onClick={() => onSelectTab('home')}
      >
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-400 to-yellow-400 flex items-center justify-center shadow-xs text-white font-bold shrink-0">
          <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-sm sm:text-base font-extrabold text-gray-900 leading-none">Lifvox</h1>
            {user.isAdmin && (
              <span className="px-1.5 py-0.5 bg-amber-100 text-amber-900 text-[9px] font-black uppercase rounded tracking-wider border border-amber-300">
                ADMIN
              </span>
            )}
          </div>
          <p className="text-[9px] sm:text-[10px] text-gray-400 font-semibold mt-0.5">SellvoraPro</p>
        </div>
      </div>

      {/* Right Badges & Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Super Admin Control Panel Switcher */}
        {user.isAdmin && (
          <button
            id="btn-header-admin-panel"
            onClick={() => onSelectTab(currentTab === 'admin' ? 'home' : 'admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold transition-all shadow-xs active:scale-95 ${
              currentTab === 'admin'
                ? 'bg-amber-500 text-gray-950 ring-2 ring-amber-400/50'
                : 'bg-gray-900 text-amber-400 hover:bg-gray-800'
            }`}
            title="Super Admin Control Panel"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{currentTab === 'admin' ? 'Exit Admin' : 'Admin Panel'}</span>
          </button>
        )}

        {/* Balance Badge */}
        <button
          onClick={onNavigateToAccount}
          className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100/80 text-[#00A651] border border-emerald-200/70 px-3 py-1.5 rounded-full text-xs font-bold shadow-xs active:scale-95 transition-all"
        >
          <Wallet className="w-3.5 h-3.5 text-emerald-600" />
          <span>{user.balance.toFixed(2)} USDT</span>
        </button>

        {/* User Avatar Button */}
        <button
          id="btn-header-account"
          onClick={onNavigateToAccount}
          className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1.5 rounded-full text-xs font-bold active:scale-95 transition-all"
        >
          <div
            className={`w-5 h-5 rounded-full text-white flex items-center justify-center text-[10px] font-extrabold ${
              user.isAdmin ? 'bg-amber-600' : 'bg-[#00A651]'
            }`}
          >
            {user.avatarText || 'U'}
          </div>
          <span className="hidden sm:inline text-gray-800">{user.username}</span>
        </button>

        {/* Logout Button */}
        {onLogout && (
          <button
            id="btn-header-logout"
            onClick={onLogout}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-rose-50 hover:text-rose-600 active:scale-95 text-gray-500 flex items-center justify-center transition-colors"
            title="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </header>
  );
};
