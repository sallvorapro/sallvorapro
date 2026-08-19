import React, { useState } from 'react';
import {
  Wallet,
  Download,
  Crown,
  User,
  FileCheck,
  ShieldCheck,
  Lock,
  Bell,
  HelpCircle,
  Settings,
  ChevronRight,
  Copy,
  Check,
} from 'lucide-react';
import { UserProfile, NavigationTab } from '../types';

interface AccountViewProps {
  user: UserProfile;
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
  onOpenKYC: () => void;
  onOpenSecurity: () => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const AccountView: React.FC<AccountViewProps> = ({
  user,
  onOpenDeposit,
  onOpenWithdraw,
  onOpenKYC,
  onOpenSecurity,
  onNavigate,
}) => {
  const [copied, setCopied] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showTransactionsModal, setShowTransactionsModal] = useState<'deposit' | 'withdraw' | null>(null);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const accountMenuItems = [
    {
      id: 'profile',
      title: 'Profile',
      desc: 'Manage your personal information',
      icon: User,
      action: () => alert(`Username: ${user.username}\nEmail: ${user.email}\nVIP Level: ${user.vipName}`),
    },
    {
      id: 'deposit-records',
      title: 'Deposit records',
      desc: 'View all deposit transactions',
      icon: FileCheck,
      action: () => setShowTransactionsModal('deposit'),
    },
    {
      id: 'withdrawal-records',
      title: 'Withdrawal records',
      desc: 'View all withdrawal history',
      icon: Download,
      action: () => setShowTransactionsModal('withdraw'),
    },
    {
      id: 'verification',
      title: 'Verification',
      desc: 'Verify your identity with ID',
      icon: ShieldCheck,
      action: onOpenKYC,
    },
    {
      id: 'security',
      title: 'Security',
      desc: 'Password and 2FA settings',
      icon: Lock,
      action: onOpenSecurity,
    },
    {
      id: 'notifications',
      title: 'Notifications',
      desc: 'Manage alert preferences',
      icon: Bell,
      badge: user.unreadNotifications,
      action: () => setShowNotificationsModal(true),
    },
    {
      id: 'help-support',
      title: 'Help & Support',
      desc: 'Get assistance and FAQs',
      icon: HelpCircle,
      action: () => onNavigate('support'),
    },
    {
      id: 'setting',
      title: 'Setting',
      desc: 'App preferences and language',
      icon: Settings,
      action: () => setShowSettingsModal(true),
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto space-y-5 sm:space-y-6 pb-16">
      {/* Top Profile Header (Green Background) */}
      <div className="w-full bg-[#00A651] rounded-3xl p-6 md:p-8 text-white shadow-md shadow-emerald-700/15">
        {/* User Info Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-emerald-700 text-white font-extrabold text-xl flex items-center justify-center border-2 border-white/40 shadow-sm">
            {user.avatarText}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-xl font-extrabold text-white">{user.username}</h3>
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  user.isVerified
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-400 text-amber-950'
                }`}
              >
                {user.isVerified ? 'Verified' : 'Unverified'}
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-800/80 text-white border border-white/20">
                {user.vipName}
              </span>
            </div>

            {/* Referral code */}
            <div className="flex items-center gap-1.5 text-xs text-emerald-100 font-medium">
              <span>Code: {user.referralCode}</span>
              <button
                onClick={handleCopyCode}
                className="hover:text-white transition-colors"
                title="Copy Code"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Balance Card inside Green Header */}
        <div className="mt-4 pt-4 border-t border-emerald-400/30">
          <div className="text-xs text-emerald-100 font-semibold mb-1">Total Balance</div>
          <div className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            {user.balance.toFixed(2)} <span className="text-lg font-bold text-emerald-100">USDT</span>
          </div>

          {/* Deposit & Withdraw Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              id="btn-account-deposit"
              onClick={onOpenDeposit}
              className="py-3 px-4 rounded-2xl bg-white text-[#00A651] font-extrabold text-xs shadow-sm hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              <span>Deposit</span>
            </button>
            <button
              id="btn-account-withdraw"
              onClick={onOpenWithdraw}
              className="py-3 px-4 rounded-2xl bg-emerald-800/60 hover:bg-emerald-800/80 text-white font-extrabold text-xs border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Withdraw</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIP Card */}
      <div className="bg-white rounded-2xl p-4 md:p-5 border border-gray-200/80 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00A651] flex items-center justify-center">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-extrabold text-gray-900">{user.vipName}</div>
            <div className="text-xs text-gray-500 font-medium">Commission: 4% per order</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-gray-800">Next: VIP 2 - Silver</div>
          <div className="text-xs text-emerald-600 font-semibold">{user.balance.toFixed(0)}/499 USDT</div>
        </div>
      </div>

      {/* Account Menu Items List */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs divide-y divide-gray-100 overflow-hidden">
        {accountMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={item.action}
              className="p-4 flex items-center justify-between hover:bg-gray-50/80 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#00A651] flex items-center justify-center relative">
                  <Icon className="w-5 h-5" />
                  {item.badge && item.badge > 0 ? (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center border-2 border-white">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{item.title}</h4>
                  <p className="text-[11px] text-gray-400 font-medium">{item.desc}</p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-gray-300" />
            </div>
          );
        })}
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h3 className="font-bold text-gray-900 text-base">App Preferences</h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4 text-xs font-semibold">
              <div>
                <label className="text-gray-500 block mb-1">Language</label>
                <select className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <option>English (US)</option>
                  <option>Bengali (বাংলা)</option>
                  <option>Spanish (Español)</option>
                  <option>French (Français)</option>
                </select>
              </div>
              <div>
                <label className="text-gray-500 block mb-1">Base Currency</label>
                <select className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <option>USDT (Tether USD)</option>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                </select>
              </div>
            </div>
            <button
              onClick={() => setShowSettingsModal(false)}
              className="w-full mt-6 py-3 bg-[#00A651] text-white font-bold rounded-xl text-xs"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {showNotificationsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h3 className="font-bold text-gray-900 text-base">System Notifications</h3>
              <button
                onClick={() => setShowNotificationsModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs">
                <div className="font-bold text-emerald-900 mb-0.5">Welcome to Lifvox SellvoraPro!</div>
                <p className="text-emerald-700 text-[11px] leading-relaxed">
                  Your account is active. Complete identity verification to unlock higher order limits.
                </p>
                <div className="text-[10px] text-emerald-500 mt-2">Today, 10:45 AM</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deposit/Withdrawal Transactions Modal */}
      {showTransactionsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h3 className="font-bold text-gray-900 text-base capitalize">
                {showTransactionsModal} Records
              </h3>
              <button
                onClick={() => setShowTransactionsModal(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500"
              >
                ✕
              </button>
            </div>
            <div className="py-8 text-center text-gray-400 text-xs font-medium">
              No recent {showTransactionsModal} history recorded yet.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
