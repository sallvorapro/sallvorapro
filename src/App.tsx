/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TopHeader } from './components/TopHeader';
import { BottomNavBar } from './components/BottomNavBar';
import { AuthScreen } from './components/AuthScreen';
import { HomeView } from './components/HomeView';
import { EarnView } from './components/EarnView';
import { RecordView } from './components/RecordView';
import { SupportView } from './components/SupportView';
import { AccountView } from './components/AccountView';
import { AdminDashboardView } from './components/admin/AdminDashboardView';

import { RechargeModal } from './components/modals/RechargeModal';
import { WithdrawalModal } from './components/modals/WithdrawalModal';
import { GrabOrderModal } from './components/modals/GrabOrderModal';
import { TeamsModal } from './components/modals/TeamsModal';
import { InvitationModal } from './components/modals/InvitationModal';
import { LeaderboardModal } from './components/modals/LeaderboardModal';
import { LiveChatModal } from './components/modals/LiveChatModal';
import { KYCModal } from './components/modals/KYCModal';
import { SecurityModal } from './components/modals/SecurityModal';

import {
  initialUser,
  initialManagedUsers,
  initialDepositRequests,
  initialWithdrawalRequests,
  defaultPlatformSettings,
} from './mockData';
import {
  NavigationTab,
  UserProfile,
  OrderItem,
  ManagedUser,
  DepositRequest,
  WithdrawalRequest,
  PlatformSettings,
} from './types';
import { CheckCircle2, MessageSquare } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Admin Data State
  const [managedUsers, setManagedUsers] = useState<ManagedUser[]>(initialManagedUsers);
  const [depositRequests, setDepositRequests] = useState<DepositRequest[]>(initialDepositRequests);
  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>(initialWithdrawalRequests);
  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>(defaultPlatformSettings);

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
    // If admin logs in, default to Admin dashboard or home
    if (loginData.isAdmin) {
      setCurrentTab('admin');
      showToast(`Welcome Master Admin! Control Dashboard active.`);
    } else {
      setCurrentTab('home');
      showToast(`Welcome back, ${loginData.username || 'User'}!`);
    }
  };

  const handleDepositSuccess = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      balance: prev.balance + amount,
    }));
    // Also create a deposit request record for admin
    const newDepReq: DepositRequest = {
      id: `dep_${Date.now()}`,
      userId: user.id,
      username: user.username,
      email: user.email,
      amount,
      network: 'USDT (TRC-20)',
      txHash: `0x${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`,
      status: 'approved',
      createdAt: 'Just now',
    };
    setDepositRequests((prev) => [newDepReq, ...prev]);
    showToast(`Successfully deposited +${amount.toFixed(2)} USDT!`);
  };

  const handleWithdrawSuccess = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      balance: Math.max(0, prev.balance - amount),
    }));
    // Create pending withdrawal request in admin panel
    const newWthReq: WithdrawalRequest = {
      id: `wth_${Date.now()}`,
      userId: user.id,
      username: user.username,
      email: user.email,
      amount,
      network: 'USDT (TRC-20)',
      walletAddress: 'TYD2v7wM4Uq8vYx1zNkLpQ9wEx8v5J3K7L',
      status: 'pending',
      createdAt: 'Just now',
    };
    setWithdrawalRequests((prev) => [newWthReq, ...prev]);
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

  // Admin Actions Handlers
  const handleUpdateManagedUser = (updatedUser: ManagedUser) => {
    setManagedUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
    // If not found (new user created), add it
    if (!managedUsers.some((u) => u.id === updatedUser.id)) {
      setManagedUsers((prev) => [updatedUser, ...prev]);
    }
    // If the admin edited the current user account
    if (updatedUser.id === user.id || updatedUser.email === user.email) {
      setUser((prev) => ({
        ...prev,
        balance: updatedUser.balance,
        vipLevel: updatedUser.vipLevel,
        vipName: updatedUser.vipName,
        commissionRate: updatedUser.commissionRate,
      }));
    }
    showToast(`User ${updatedUser.username} updated successfully!`);
  };

  const handleApproveDeposit = (depositId: string) => {
    setDepositRequests((prev) =>
      prev.map((d) => {
        if (d.id === depositId) {
          // Credit user balance in managed users
          setManagedUsers((uList) =>
            uList.map((u) =>
              u.id === d.userId || u.email === d.email
                ? { ...u, balance: u.balance + d.amount, totalDeposited: u.totalDeposited + d.amount }
                : u
            )
          );
          return { ...d, status: 'approved' as const };
        }
        return d;
      })
    );
    showToast('Deposit approved and credited to user wallet!');
  };

  const handleRejectDeposit = (depositId: string) => {
    setDepositRequests((prev) =>
      prev.map((d) => (d.id === depositId ? { ...d, status: 'rejected' as const } : d))
    );
    showToast('Deposit request rejected.');
  };

  const handleApproveWithdrawal = (withdrawalId: string) => {
    setWithdrawalRequests((prev) =>
      prev.map((w) => {
        if (w.id === withdrawalId) {
          setManagedUsers((uList) =>
            uList.map((u) =>
              u.id === w.userId || u.email === w.email
                ? { ...u, totalWithdrawn: u.totalWithdrawn + w.amount }
                : u
            )
          );
          return { ...w, status: 'approved' as const, processedAt: 'Just now' };
        }
        return w;
      })
    );
    showToast('Withdrawal approved and marked sent!');
  };

  const handleRejectWithdrawal = (withdrawalId: string) => {
    setWithdrawalRequests((prev) =>
      prev.map((w) => {
        if (w.id === withdrawalId) {
          // Refund user balance
          setManagedUsers((uList) =>
            uList.map((u) =>
              u.id === w.userId || u.email === w.email
                ? { ...u, balance: u.balance + w.amount }
                : u
            )
          );
          return { ...w, status: 'rejected' as const };
        }
        return w;
      })
    );
    showToast('Withdrawal rejected and funds refunded to user.');
  };

  if (!isAuthenticated) {
    return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 sm:top-5 sm:right-5 z-50 bg-[#00A651] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-in fade-in slide-in-from-top-4 duration-200 max-w-[90vw]">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <TopHeader
        user={user}
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onNavigateToAccount={() => setCurrentTab('account')}
        onLogout={() => {
          setIsAuthenticated(false);
          showToast('Logged out successfully');
        }}
      />

      {/* Main Content View Container */}
      <main className="flex-1 min-h-[calc(100vh-60px)] overflow-y-auto w-full min-w-0 pb-20">
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

        {/* Super Admin Control Panel */}
        {currentTab === 'admin' && user.isAdmin && (
          <AdminDashboardView
            users={managedUsers}
            onUpdateUser={handleUpdateManagedUser}
            depositRequests={depositRequests}
            onApproveDeposit={handleApproveDeposit}
            onRejectDeposit={handleRejectDeposit}
            withdrawalRequests={withdrawalRequests}
            onApproveWithdrawal={handleApproveWithdrawal}
            onRejectWithdrawal={handleRejectWithdrawal}
            platformSettings={platformSettings}
            onUpdateSettings={(newSet) => {
              setPlatformSettings(newSet);
              showToast('Platform settings saved!');
            }}
            onExitAdminView={() => setCurrentTab('home')}
          />
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <BottomNavBar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        isAdmin={user.isAdmin}
      />

      {/* Floating Live Support Button */}
      <button
        id="btn-floating-support"
        onClick={() => setIsLiveChatOpen(true)}
        className="fixed bottom-20 right-4 sm:right-6 z-30 w-12 h-12 rounded-full bg-[#00A651] text-white flex items-center justify-center shadow-lg shadow-emerald-700/30 hover:scale-110 active:scale-95 transition-all"
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
