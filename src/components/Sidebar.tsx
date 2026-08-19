import React from 'react';
import { Home, ShoppingBag, FileText, Headphones, User, LogOut, Wallet } from 'lucide-react';
import { NavigationTab, UserProfile } from '../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  user: UserProfile;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  user,
  onLogout,
}) => {
  const navItems: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'earn', label: 'Earn', icon: ShoppingBag },
    { id: 'records', label: 'Records', icon: FileText },
    { id: 'support', label: 'Support', icon: Headphones },
    { id: 'account', label: 'Account', icon: User },
  ];

  return (
    <aside className="hidden md:flex w-64 md:w-72 bg-white border-r border-gray-200 flex-col justify-between min-h-screen shrink-0 sticky top-0 h-screen select-none">
      <div>
        {/* Brand Header */}
        <div className="p-5 flex items-center gap-3 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-400 to-yellow-400 flex items-center justify-center shadow-sm shadow-orange-200 text-white font-bold">
            <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-tight">Lifvox</h1>
            <p className="text-[11px] text-gray-400 font-medium">E-Commerce Commissions</p>
          </div>
        </div>

        {/* User Card */}
        <div className="p-4 mx-3 my-3 bg-gray-50/80 rounded-2xl border border-gray-100 flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
            {user.avatarText}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-800 truncate">{user.username}</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200/60">
                VIP {user.vipLevel}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5 font-medium">
              <Wallet className="w-3 h-3 text-gray-400 shrink-0" />
              <span>{user.balance.toFixed(2)} USDT</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="px-3 space-y-1.5 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-150 text-left ${
                  isActive
                    ? 'bg-[#00A651] text-white shadow-sm shadow-emerald-700/20'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Footer */}
      <div className="p-4 border-t border-gray-100">
        <button
          id="btn-sidebar-logout"
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
