export type NavigationTab = 'home' | 'earn' | 'records' | 'support' | 'account' | 'admin';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  balance: number;
  frozenBalance: number;
  vipLevel: number;
  vipName: string;
  commissionRate: number; // e.g. 0.04 for 4%
  completedOrdersCount: number;
  targetOrdersCount: number;
  referralCode: string;
  isVerified: boolean;
  avatarText: string;
  unreadNotifications: number;
  isAdmin?: boolean;
  status?: 'active' | 'suspended' | 'frozen';
  joinedDate?: string;
}

export interface OrderItem {
  id: string;
  platform: 'Amazon' | 'eBay' | 'Shopify' | 'AliExpress' | 'Walmart' | 'Temu';
  productName: string;
  productImage: string;
  orderAmount: number;
  commissionRate: number;
  commissionEarned: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  completedAt?: string;
  userId?: string;
  username?: string;
}

export interface PartnerBrand {
  id: string;
  name: string;
  logo: string;
  badge?: string;
  color: string;
}

export interface TransactionRecord {
  id: string;
  type: 'deposit' | 'withdrawal' | 'commission';
  amount: number;
  network?: string;
  address?: string;
  status: 'completed' | 'processing' | 'rejected';
  date: string;
  txHash?: string;
  userId?: string;
  username?: string;
}

export interface SupportMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  time: string;
}

export interface ManagedUser {
  id: string;
  username: string;
  email: string;
  balance: number;
  frozenBalance: number;
  vipLevel: number;
  vipName: string;
  commissionRate: number;
  completedOrdersCount: number;
  isVerified: boolean;
  status: 'active' | 'suspended' | 'frozen';
  joinedDate: string;
  totalDeposited: number;
  totalWithdrawn: number;
}

export interface DepositRequest {
  id: string;
  userId: string;
  username: string;
  email: string;
  amount: number;
  network: string;
  txHash: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  notes?: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  username: string;
  email: string;
  amount: number;
  network: string;
  walletAddress: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  processedAt?: string;
  notes?: string;
}

export interface PlatformSettings {
  minWithdrawal: number;
  maxDailyOrders: number;
  vipRates: { level: number; name: string; rate: number; minDeposit: number }[];
  maintenanceMode: boolean;
  announcement: string;
}
