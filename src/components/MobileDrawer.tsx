import React from 'react';
import {
  X,
  Wallet,
  Download,
  Crown,
  Home,
  ShoppingBag,
  FileText,
  Headphones,
  User,
  LogOut,
  ShieldCheck,
  Trophy,
  Users,
  UserPlus,
} from 'lucide-react';
import { NavigationTab, UserProfile } from '../types';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  user: UserProfile;
  onLogout: () => void;
  onOpenRecharge: () => void;
  onOpenWithdrawal: () => void;
  onOpenTeams: () => void;
  onOpenInvite: () => void;
  onOpenLeaderboard: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  currentTab,
  onSelectTab,
  user,
  onLogout,
  onOpenRecharge,
  onOpenWithdrawal,
  onOpenTeams,
  onOpenInvite,
  onOpenLeaderboard,
}) => {
  if (!isOpen) return null;

  const handleNav = (tab: NavigationTab) => {
    onSelectTab(tab);
    onClose();
  };

  return (
    <div className="md:hidden fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-200">
        <div>
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-400 to-yellow-400 flex items-center justify-center text-white font-bold">
                <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
              <span className="font-extrabold text-gray-900 text-sm">Lifvox SellvoraPro</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* User Card */}
          <div className="p-4 m-3 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl text-white shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-emerald-900/60 border border-white/30 text-white font-bold flex items-center justify-center text-sm">
                {user.avatarText}
              </div>
              <div>
                <div className="font-bold text-sm leading-tight">{user.username}</div>
                <div className="text-[10px] text-emerald-200 font-medium">Code: {user.referralCode}</div>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-500/30 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-emerald-200 block">Balance</span>
                <span className="font-extrabold text-sm">{user.balance.toFixed(2)} USDT</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-amber-950">
                {user.vipName}
              </span>
            </div>

            {/* Quick Actions in Drawer */}
            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-emerald-500/30">
              <button
                onClick={() => {
                  onClose();
                  onOpenRecharge();
                }}
                className="py-1.5 px-2 bg-white text-[#00A651] rounded-xl text-xs font-bold text-center hover:bg-emerald-50"
              >
                Deposit
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenWithdrawal();
                }}
                className="py-1.5 px-2 bg-emerald-900/60 border border-white/20 text-white rounded-xl text-xs font-bold text-center"
              >
                Withdraw
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {[
              { id: 'home' as const, label: 'Home', icon: Home },
              { id: 'earn' as const, label: 'Earn', icon: ShoppingBag },
              { id: 'records' as const, label: 'Records', icon: FileText },
              { id: 'support' as const, label: 'Support', icon: Headphones },
              { id: 'account' as const, label: 'Account', icon: User },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-left transition-all ${
                    isActive
                      ? 'bg-[#00A651] text-white shadow-xs'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-2 pb-1 border-t border-gray-100 my-2">
              <span className="text-[10px] font-bold text-gray-400 px-3 uppercase tracking-wider">
                Quick Shortcuts
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenTeams();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 text-left"
            >
              <Users className="w-4 h-4 text-amber-500" />
              <span>Team Commission</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenInvite();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 text-left"
            >
              <UserPlus className="w-4 h-4 text-pink-500" />
              <span>Invite Friends</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenLeaderboard();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 text-left"
            >
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span>Leaderboard</span>
            </button>
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
