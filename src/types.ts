export type NavigationTab = 'home' | 'earn' | 'records' | 'support' | 'account';

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
}

export interface SupportMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  time: string;
}
