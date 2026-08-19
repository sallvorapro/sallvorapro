import React, { useState } from 'react';
import {
  Users,
  DollarSign,
  ArrowDownCircle,
  ArrowUpCircle,
  ShieldCheck,
  Search,
  Check,
  X,
  Plus,
  Minus,
  Edit3,
  Sliders,
  AlertCircle,
  Lock,
  Unlock,
  RefreshCw,
  Award,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Megaphone,
} from 'lucide-react';
import { ManagedUser, DepositRequest, WithdrawalRequest, PlatformSettings } from '../../types';

interface AdminDashboardViewProps {
  users: ManagedUser[];
  onUpdateUser: (updatedUser: ManagedUser) => void;
  depositRequests: DepositRequest[];
  onApproveDeposit: (depositId: string) => void;
  onRejectDeposit: (depositId: string) => void;
  withdrawalRequests: WithdrawalRequest[];
  onApproveWithdrawal: (withdrawalId: string) => void;
  onRejectWithdrawal: (withdrawalId: string) => void;
  platformSettings: PlatformSettings;
  onUpdateSettings: (newSettings: PlatformSettings) => void;
  onExitAdminView: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  users,
  onUpdateUser,
  depositRequests,
  onApproveDeposit,
  onRejectDeposit,
  withdrawalRequests,
  onApproveWithdrawal,
  onRejectWithdrawal,
  platformSettings,
  onUpdateSettings,
  onExitAdminView,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'users' | 'deposits' | 'withdrawals' | 'settings'>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVip, setFilterVip] = useState<number | 'all'>('all');
  
  // Selected user for balance editing modal
  const [editingUser, setEditingUser] = useState<ManagedUser | null>(null);
  const [adjustAmount, setAdjustAmount] = useState<string>('');
  const [adjustType, setAdjustType] = useState<'add' | 'subtract'>('add');
  const [adjustVipLevel, setAdjustVipLevel] = useState<number>(1);
  const [adjustNote, setAdjustNote] = useState('');

  // Settings form state
  const [announcementText, setAnnouncementText] = useState(platformSettings.announcement);
  const [minWithdrawalVal, setMinWithdrawalVal] = useState(platformSettings.minWithdrawal);
  const [isSavedToast, setIsSavedToast] = useState(false);

  // New user creation state
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserBalance, setNewUserBalance] = useState('100');
  const [newUserVip, setNewUserVip] = useState(1);

  // Filtered users list
  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchVip = filterVip === 'all' ? true : u.vipLevel === filterVip;
    return matchSearch && matchVip;
  });

  const totalUserBalances = users.reduce((acc, u) => acc + u.balance, 0);
  const pendingDepositsCount = depositRequests.filter((d) => d.status === 'pending').length;
  const pendingWithdrawalsCount = withdrawalRequests.filter((w) => w.status === 'pending').length;

  const handleOpenEditUser = (user: ManagedUser) => {
    setEditingUser(user);
    setAdjustAmount('');
    setAdjustType('add');
    setAdjustVipLevel(user.vipLevel);
    setAdjustNote('');
  };

  const handleSaveUserAdjustments = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    const numAmount = parseFloat(adjustAmount) || 0;
    let newBalance = editingUser.balance;
    if (numAmount > 0) {
      if (adjustType === 'add') {
        newBalance += numAmount;
      } else {
        newBalance = Math.max(0, newBalance - numAmount);
      }
    }

    const vipNames = [
      '',
      'VIP 1 - Bronze',
      'VIP 2 - Silver',
      'VIP 3 - Gold',
      'VIP 4 - Platinum',
      'VIP 5 - Emerald',
      'VIP 6 - Diamond',
    ];
    const vipRates = [0, 0.04, 0.045, 0.05, 0.06, 0.07, 0.08];

    const updated: ManagedUser = {
      ...editingUser,
      balance: newBalance,
      vipLevel: adjustVipLevel,
      vipName: vipNames[adjustVipLevel] || editingUser.vipName,
      commissionRate: vipRates[adjustVipLevel] || editingUser.commissionRate,
    };

    onUpdateUser(updated);
    setEditingUser(null);
  };

  const handleToggleFreezeUser = (user: ManagedUser) => {
    const newStatus = user.status === 'frozen' ? 'active' : 'frozen';
    onUpdateUser({
      ...user,
      status: newStatus,
    });
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newUserEmail) return;

    const vipNames = ['', 'VIP 1 - Bronze', 'VIP 2 - Silver', 'VIP 3 - Gold', 'VIP 4 - Platinum', 'VIP 5 - Emerald', 'VIP 6 - Diamond'];
    const vipRates = [0, 0.04, 0.045, 0.05, 0.06, 0.07, 0.08];

    const created: ManagedUser = {
      id: `usr_${Date.now().toString().slice(-4)}`,
      username: newUsername,
      email: newUserEmail,
      balance: parseFloat(newUserBalance) || 0,
      frozenBalance: 0,
      vipLevel: newUserVip,
      vipName: vipNames[newUserVip] || 'VIP 1 - Bronze',
      commissionRate: vipRates[newUserVip] || 0.04,
      completedOrdersCount: 0,
      isVerified: true,
      status: 'active',
      joinedDate: 'Just now',
      totalDeposited: parseFloat(newUserBalance) || 0,
      totalWithdrawn: 0,
    };

    onUpdateUser(created);
    setShowAddUserModal(false);
    setNewUsername('');
    setNewUserEmail('');
    setNewUserBalance('100');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      ...platformSettings,
      announcement: announcementText,
      minWithdrawal: minWithdrawalVal,
    });
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6 pb-24 select-none">
      {/* Top Admin Banner */}
      <div className="w-full bg-gradient-to-r from-gray-900 via-slate-800 to-zinc-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-gray-800">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold shrink-0 shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-amber-500 text-gray-950 px-2.5 py-0.5 rounded-full font-mono">
                SUPER ADMIN PANEL
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold mt-1 tracking-tight">
              Master Control Dashboard
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Logged in as <span className="text-amber-300 font-bold">admin@gmail.com</span> — Full administrative permissions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={onExitAdminView}
            className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 active:scale-95 text-gray-200 text-xs font-bold rounded-xl border border-gray-700 transition-all flex items-center gap-1.5"
          >
            <ChevronRight className="w-4 h-4" />
            <span>Switch to User View</span>
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Users</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-gray-900 mt-2">{users.length}</div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> All active accounts
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total User Balances</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#00A651] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-gray-900 mt-2">${totalUserBalances.toLocaleString()}</div>
          <span className="text-[11px] text-gray-500 font-medium mt-1">USDT in user wallets</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Deposits</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ArrowDownCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-gray-900 mt-2">{pendingDepositsCount}</div>
          <span className="text-[11px] text-amber-600 font-semibold mt-1">Awaiting approval</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Withdrawals</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <ArrowUpCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-gray-900 mt-2">{pendingWithdrawalsCount}</div>
          <span className="text-[11px] text-rose-600 font-semibold mt-1">Awaiting payout</span>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveAdminTab('users')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeAdminTab === 'users'
              ? 'bg-[#00A651] text-white shadow-md shadow-emerald-700/20'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200/80'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Management ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('deposits')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap relative ${
            activeAdminTab === 'deposits'
              ? 'bg-[#00A651] text-white shadow-md shadow-emerald-700/20'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200/80'
          }`}
        >
          <ArrowDownCircle className="w-4 h-4" />
          <span>Deposit Requests</span>
          {pendingDepositsCount > 0 && (
            <span className="px-2 py-0.5 bg-amber-400 text-gray-900 text-[10px] font-extrabold rounded-full">
              {pendingDepositsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveAdminTab('withdrawals')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap relative ${
            activeAdminTab === 'withdrawals'
              ? 'bg-[#00A651] text-white shadow-md shadow-emerald-700/20'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200/80'
          }`}
        >
          <ArrowUpCircle className="w-4 h-4" />
          <span>Withdrawal Requests</span>
          {pendingWithdrawalsCount > 0 && (
            <span className="px-2 py-0.5 bg-rose-500 text-white text-[10px] font-extrabold rounded-full">
              {pendingWithdrawalsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveAdminTab('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
            activeAdminTab === 'settings'
              ? 'bg-[#00A651] text-white shadow-md shadow-emerald-700/20'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200/80'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Platform Settings</span>
        </button>
      </div>

      {/* Tab Content 1: User Management */}
      {activeAdminTab === 'users' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search username or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
              />
            </div>

            {/* VIP Filter & Add User Button */}
            <div className="flex items-center gap-2">
              <select
                value={filterVip}
                onChange={(e) => setFilterVip(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold text-gray-700 focus:outline-none"
              >
                <option value="all">All VIP Tiers</option>
                <option value={1}>VIP 1 (Bronze)</option>
                <option value={2}>VIP 2 (Silver)</option>
                <option value={3}>VIP 3 (Gold)</option>
                <option value={4}>VIP 4 (Platinum)</option>
                <option value={5}>VIP 5 (Emerald)</option>
                <option value={6}>VIP 6 (Diamond)</option>
              </select>

              <button
                onClick={() => setShowAddUserModal(true)}
                className="px-4 py-2.5 bg-[#00A651] hover:bg-[#009247] active:scale-95 text-white font-bold text-xs rounded-2xl shadow-xs transition-all flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add User</span>
              </button>
            </div>
          </div>

          {/* User Table */}
          <div className="overflow-x-auto rounded-2xl border border-gray-200/70">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/80 text-gray-500 font-bold border-b border-gray-200/80">
                <tr>
                  <th className="p-3.5">User</th>
                  <th className="p-3.5">VIP Tier</th>
                  <th className="p-3.5">Balance</th>
                  <th className="p-3.5">Orders</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#00A651] font-bold flex items-center justify-center text-xs shrink-0">
                          {u.username.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 flex items-center gap-1.5">
                            <span>{u.username}</span>
                            {u.isVerified && (
                              <Check className="w-3 h-3 text-[#00A651] stroke-[3]" />
                            )}
                          </div>
                          <span className="text-[11px] text-gray-400">{u.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className="px-2.5 py-1 bg-amber-50 text-amber-800 rounded-full font-bold text-[10px] border border-amber-200">
                        {u.vipName}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <div className="font-extrabold text-gray-900 text-sm">
                        {u.balance.toFixed(2)} USDT
                      </div>
                      {u.frozenBalance > 0 && (
                        <div className="text-[10px] text-rose-500 font-semibold">
                          Frozen: {u.frozenBalance.toFixed(2)} USDT
                        </div>
                      )}
                    </td>

                    <td className="p-3.5">
                      <span className="font-bold text-gray-800">{u.completedOrdersCount} orders</span>
                    </td>

                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-md font-extrabold text-[10px] uppercase ${
                          u.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditUser(u)}
                          className="px-3 py-1.5 bg-[#00A651] hover:bg-[#009247] text-white rounded-xl font-bold text-[11px] transition-all flex items-center gap-1"
                          title="Edit Balance / VIP"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Manage</span>
                        </button>

                        <button
                          onClick={() => handleToggleFreezeUser(u)}
                          className={`p-1.5 rounded-xl border text-xs transition-colors ${
                            u.status === 'frozen'
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-rose-50 hover:text-rose-700'
                          }`}
                          title={u.status === 'frozen' ? 'Unfreeze account' : 'Freeze account'}
                        >
                          {u.status === 'frozen' ? (
                            <Unlock className="w-3.5 h-3.5" />
                          ) : (
                            <Lock className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content 2: Deposit Requests */}
      {activeAdminTab === 'deposits' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-gray-900">Pending Deposit Requests</h3>
            <span className="text-xs text-gray-500 font-medium">Click Approve to credit user balance</span>
          </div>

          <div className="space-y-3">
            {depositRequests.map((dep) => (
              <div
                key={dep.id}
                className="p-4 rounded-2xl border border-gray-200/80 bg-gray-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-gray-900">
                      +{dep.amount.toFixed(2)} USDT
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md border border-blue-200">
                      {dep.network}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase ${
                        dep.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : dep.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {dep.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600">
                    User: <span className="font-bold text-gray-900">{dep.username}</span> ({dep.email}) • {dep.createdAt}
                  </p>
                  <p className="text-[11px] text-gray-400 font-mono break-all">
                    TX Hash: {dep.txHash}
                  </p>
                </div>

                {dep.status === 'pending' ? (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onApproveDeposit(dep.id)}
                      className="px-4 py-2 bg-[#00A651] hover:bg-[#009247] text-white text-xs font-bold rounded-xl shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve & Credit</span>
                    </button>
                    <button
                      onClick={() => onRejectDeposit(dep.id)}
                      className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 active:scale-95 transition-all flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </div>
                ) : (
                  <span className="text-xs font-bold text-gray-500">Processed</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 3: Withdrawal Requests */}
      {activeAdminTab === 'withdrawals' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-gray-900">Pending Withdrawal Requests</h3>
            <span className="text-xs text-gray-500 font-medium">Verify USDT address before approving</span>
          </div>

          <div className="space-y-3">
            {withdrawalRequests.map((wth) => (
              <div
                key={wth.id}
                className="p-4 rounded-2xl border border-gray-200/80 bg-gray-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-gray-900">
                      -${wth.amount.toFixed(2)} USDT
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md border border-blue-200">
                      {wth.network}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase ${
                        wth.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : wth.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {wth.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600">
                    User: <span className="font-bold text-gray-900">{wth.username}</span> ({wth.email}) • {wth.createdAt}
                  </p>
                  <p className="text-[11px] text-gray-500 font-mono break-all bg-white p-1.5 rounded-lg border border-gray-200">
                    Wallet: {wth.walletAddress}
                  </p>
                </div>

                {wth.status === 'pending' ? (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onApproveWithdrawal(wth.id)}
                      className="px-4 py-2 bg-[#00A651] hover:bg-[#009247] text-white text-xs font-bold rounded-xl shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve & Send</span>
                    </button>
                    <button
                      onClick={() => onRejectWithdrawal(wth.id)}
                      className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 active:scale-95 transition-all flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject & Refund</span>
                    </button>
                  </div>
                ) : (
                  <span className="text-xs font-bold text-gray-500">Processed</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content 4: Platform Settings */}
      {activeAdminTab === 'settings' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-gray-900">Platform Configuration</h3>
              <p className="text-xs text-gray-500">Global system commission rates and limits</p>
            </div>
            {isSavedToast && (
              <span className="text-xs font-bold text-[#00A651] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Saved!
              </span>
            )}
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-5">
            {/* System Announcement Banner */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Global System Announcement
              </label>
              <div className="relative">
                <Megaphone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <textarea
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  rows={3}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                  placeholder="Enter notice shown to users..."
                />
              </div>
            </div>

            {/* Minimum Withdrawal */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Minimum Withdrawal Amount (USDT)
              </label>
              <input
                type="number"
                value={minWithdrawalVal}
                onChange={(e) => setMinWithdrawalVal(Number(e.target.value))}
                className="w-full max-w-xs px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>

            {/* VIP Commission Rates Table */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                VIP Commission Rates Structure
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {platformSettings.vipRates.map((vip) => (
                  <div key={vip.level} className="p-3 bg-gray-50 rounded-2xl border border-gray-200/80">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-xs text-gray-900">{vip.name}</span>
                      <span className="text-xs font-bold text-[#00A651]">{(vip.rate * 100).toFixed(1)}%</span>
                    </div>
                    <p className="text-[10px] text-gray-500">Min Deposit: {vip.minDeposit} USDT</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#00A651] hover:bg-[#009247] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all active:scale-95"
            >
              Save Platform Settings
            </button>
          </form>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-base">
                  Manage User: {editingUser.username}
                </h3>
                <p className="text-xs text-gray-400">{editingUser.email}</p>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveUserAdjustments} className="space-y-4">
              {/* Current Info */}
              <div className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-500 block text-[11px]">Current Balance</span>
                  <span className="font-extrabold text-sm text-[#00A651]">
                    {editingUser.balance.toFixed(2)} USDT
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[11px]">VIP Tier</span>
                  <span className="font-extrabold text-gray-900">{editingUser.vipName}</span>
                </div>
              </div>

              {/* Adjust Balance (+ / -) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Adjust USDT Balance
                </label>
                <div className="flex items-center gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setAdjustType('add')}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                      adjustType === 'add'
                        ? 'bg-[#00A651] text-white border-[#00A651]'
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}
                  >
                    + Add Balance
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdjustType('subtract')}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                      adjustType === 'subtract'
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }`}
                  >
                    - Deduct Balance
                  </button>
                </div>
                <input
                  type="number"
                  step="0.01"
                  value={adjustAmount}
                  onChange={(e) => setAdjustAmount(e.target.value)}
                  placeholder="Enter amount (e.g. 500)"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Adjust VIP Level */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Change VIP Tier
                </label>
                <select
                  value={adjustVipLevel}
                  onChange={(e) => setAdjustVipLevel(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-emerald-500"
                >
                  <option value={1}>VIP 1 - Bronze (4.0%)</option>
                  <option value={2}>VIP 2 - Silver (4.5%)</option>
                  <option value={3}>VIP 3 - Gold (5.0%)</option>
                  <option value={4}>VIP 4 - Platinum (6.0%)</option>
                  <option value={5}>VIP 5 - Emerald (7.0%)</option>
                  <option value={6}>VIP 6 - Diamond (8.0%)</option>
                </select>
              </div>

              {/* Admin Note */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Reason / Admin Note
                </label>
                <input
                  type="text"
                  value={adjustNote}
                  onChange={(e) => setAdjustNote(e.target.value)}
                  placeholder="e.g. Special promotional bonus"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#00A651] hover:bg-[#009247] text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-base">Add New Platform User</h3>
                <p className="text-xs text-gray-400">Direct admin manual account creation</p>
              </div>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  required
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="e.g. alex_trader"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="e.g. alex@gmail.com"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Starting Balance (USDT)</label>
                <input
                  type="number"
                  value={newUserBalance}
                  onChange={(e) => setNewUserBalance(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">VIP Tier</label>
                <select
                  value={newUserVip}
                  onChange={(e) => setNewUserVip(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-emerald-500"
                >
                  <option value={1}>VIP 1 - Bronze</option>
                  <option value={2}>VIP 2 - Silver</option>
                  <option value={3}>VIP 3 - Gold</option>
                  <option value={4}>VIP 4 - Platinum</option>
                  <option value={5}>VIP 5 - Emerald</option>
                  <option value={6}>VIP 6 - Diamond</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#00A651] hover:bg-[#009247] text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
