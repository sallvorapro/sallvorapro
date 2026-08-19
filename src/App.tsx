/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { MobileTopHeader } from './components/MobileTopHeader';
import { MobileDrawer } from './components/MobileDrawer';
import { AuthScreen } from './components/AuthScreen';
import { HomeView } from './components/HomeView';
import { EarnView } from './components/EarnView';
import { RecordView } from './components/RecordView';
import { SupportView } from './components/SupportView';
import { AccountView } from './components/AccountView';

import { RechargeModal } from './components/modals/RechargeModal';
import { WithdrawalModal } from './components/modals/WithdrawalModal';
import { GrabOrderModal } from './components/modals/GrabOrderModal';
import { TeamsModal } from './components/modals/TeamsModal';
import { InvitationModal } from './components/modals/InvitationModal';
import { LeaderboardModal } from './components/modals/LeaderboardModal';
import { LiveChatModal } from './components/modals/LiveChatModal';
import { KYCModal } from './components/modals/KYCModal';
import { SecurityModal } from './components/modals/SecurityModal';

import { initialUser } from './mockData';
import { NavigationTab, UserProfile, OrderItem } from './types';
import { CheckCircle2, MessageSquare } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Mobile drawer state
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Modals state
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isGrabOrderOpen, setIsGrabOrderOpen] = useState(false);
  const [grabPlatform, setGrabPlatform] = useState<'Amazon' | 'eBay' | 'Shopify' | 'AliExpress'>('Amazon');
  const [isTeamsOpen, setIsTeamsOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [isKYCOpen, setIsKYCOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleLoginSuccess = (loginData: Partial<UserProfile>) => {
    setUser((prev) => ({
      ...prev,
      ...loginData,
    }));
    setIsAuthenticated(true);
    setCurrentTab('home');
    showToast(`Welcome back, ${loginData.username || 'User'}!`);
  };

  const handleDepositSuccess = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      balance: prev.balance + amount,
    }));
    showToast(`Successfully deposited +${amount.toFixed(2)} USDT!`);
  };

  const handleWithdrawSuccess = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      balance: Math.max(0, prev.balance - amount),
    }));
    showToast(`Withdrawal of ${amount.toFixed(2)} USDT submitted for processing.`);
  };

  const handleOrderCompleted = (newOrder: OrderItem) => {
    setOrders((prev) => [newOrder, ...prev]);
    setUser((prev) => {
      const newCompleted = prev.completedOrdersCount + 1;
      let newVipLevel = prev.vipLevel;
      let newVipName = prev.vipName;
      let newRate = prev.commissionRate;

      if (newCompleted >= 24) {
        newVipLevel = 2;
        newVipName = 'VIP 2 - Silver';
        newRate = 0.045;
      }

      return {
        ...prev,
        balance: prev.balance + newOrder.commissionEarned,
        completedOrdersCount: newCompleted,
        vipLevel: newVipLevel,
        vipName: newVipName,
        commissionRate: newRate,
      };
    });
    showToast(`Commission +${newOrder.commissionEarned.toFixed(2)} USDT credited!`);
  };

  const handleOpenGrabOrder = (platform: 'Amazon' | 'eBay' | 'Shopify' | 'AliExpress' = 'Amazon') => {
    setGrabPlatform(platform);
    setIsGrabOrderOpen(true);
  };

  if (!isAuthenticated) {
    return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 text-gray-900 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 sm:top-5 sm:right-5 z-50 bg-[#00A651] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-in fade-in slide-in-from-top-4 duration-200 max-w-[90vw]">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Desktop Left Sidebar (hidden on mobile) */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        user={user}
        onLogout={() => {
          setIsAuthenticated(false);
          showToast('Logged out successfully');
        }}
      />

      {/* Mobile Top Header (hidden on desktop) */}
      <MobileTopHeader
        user={user}
        onOpenDrawer={() => setIsMobileDrawerOpen(true)}
        onNavigateToAccount={() => setCurrentTab('account')}
      />

      {/* Mobile Slide-out Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        user={user}
        onLogout={() => {
          setIsAuthenticated(false);
          showToast('Logged out successfully');
        }}
        onOpenRecharge={() => setIsRechargeOpen(true)}
        onOpenWithdrawal={() => setIsWithdrawOpen(true)}
        onOpenTeams={() => setIsTeamsOpen(true)}
        onOpenInvite={() => setIsInviteOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
      />

      {/* Main Content View Container */}
      <main className="flex-1 min-h-screen overflow-y-auto w-full min-w-0">
        {currentTab === 'home' && (
          <HomeView
            user={user}
            onNavigate={setCurrentTab}
            onOpenRecharge={() => setIsRechargeOpen(true)}
            onOpenWithdrawal={() => setIsWithdrawOpen(true)}
            onOpenGrabOrder={handleOpenGrabOrder}
            onOpenTeams={() => setIsTeamsOpen(true)}
            onOpenInvite={() => setIsInviteOpen(true)}
            onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
          />
        )}

        {currentTab === 'earn' && (
          <EarnView
            user={user}
            onOpenGrabOrder={handleOpenGrabOrder}
          />
        )}

        {currentTab === 'records' && (
          <RecordView
            orders={orders}
            onOpenEarn={() => setCurrentTab('earn')}
          />
        )}

        {currentTab === 'support' && (
          <SupportView
            onOpenLiveChat={() => setIsLiveChatOpen(true)}
          />
        )}

        {currentTab === 'account' && (
          <AccountView
            user={user}
            onOpenDeposit={() => setIsRechargeOpen(true)}
            onOpenWithdraw={() => setIsWithdrawOpen(true)}
            onOpenKYC={() => setIsKYCOpen(true)}
            onOpenSecurity={() => setIsSecurityOpen(true)}
            onNavigate={setCurrentTab}
          />
        )}
      </main>

      {/* Floating Live Support Button */}
      <button
        id="btn-floating-support"
        onClick={() => setIsLiveChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#00A651] text-white flex items-center justify-center shadow-lg shadow-emerald-700/30 hover:scale-110 active:scale-95 transition-all"
        title="24/7 Live Support"
      >
        <MessageSquare className="w-5 h-5" />
      </button>

      {/* Modals */}
      <RechargeModal
        isOpen={isRechargeOpen}
        onClose={() => setIsRechargeOpen(false)}
        onDepositSuccess={handleDepositSuccess}
      />

      <WithdrawalModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        userBalance={user.balance}
        onWithdrawSuccess={handleWithdrawSuccess}
      />

      <GrabOrderModal
        isOpen={isGrabOrderOpen}
        onClose={() => setIsGrabOrderOpen(false)}
        user={user}
        platform={grabPlatform}
        onOrderCompleted={handleOrderCompleted}
        onOpenDeposit={() => {
          setIsGrabOrderOpen(false);
          setIsRechargeOpen(true);
        }}
      />

      <TeamsModal
        isOpen={isTeamsOpen}
        onClose={() => setIsTeamsOpen(false)}
        user={user}
        onOpenInvite={() => {
          setIsTeamsOpen(false);
          setIsInviteOpen(true);
        }}
      />

      <InvitationModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        user={user}
      />

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />

      <LiveChatModal
        isOpen={isLiveChatOpen}
        onClose={() => setIsLiveChatOpen(false)}
      />

      <KYCModal
        isOpen={isKYCOpen}
        onClose={() => setIsKYCOpen(false)}
        user={user}
        onVerifySuccess={() => {
          setUser((prev) => ({ ...prev, isVerified: true }));
          showToast('Identity verification approved!');
        }}
      />

      <SecurityModal
        isOpen={isSecurityOpen}
        onClose={() => setIsSecurityOpen(false)}
      />
    </div>
  );
}
