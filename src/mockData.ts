import { UserProfile, OrderItem } from './types';

export const initialUser: UserProfile = {
  id: 'usr_8829104',
  username: 'test1',
  email: 'admin@lifvox.com',
  balance: 0.00,
  frozenBalance: 0.00,
  vipLevel: 1,
  vipName: 'VIP 1 - Bronze',
  commissionRate: 0.04, // 4%
  completedOrdersCount: 0,
  targetOrdersCount: 24,
  referralCode: 'INVPYPJK8BY',
  isVerified: false,
  avatarText: 'TE',
  unreadNotifications: 1,
};

export const sampleProducts = [
  {
    name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
    platform: 'Amazon' as const,
    minPrice: 85,
    maxPrice: 380,
  },
  {
    name: 'Apple Watch Series 9 GPS 45mm Smartwatch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
    platform: 'Amazon' as const,
    minPrice: 120,
    maxPrice: 420,
  },
  {
    name: 'Dyson V15 Detect Cordless Vacuum Cleaner',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&auto=format&fit=crop&q=80',
    platform: 'eBay' as const,
    minPrice: 90,
    maxPrice: 350,
  },
  {
    name: 'DJI Mini 3 Lightweight Camera Drone 4K HDR',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=500&auto=format&fit=crop&q=80',
    platform: 'eBay' as const,
    minPrice: 150,
    maxPrice: 480,
  },
  {
    name: 'Samsung Galaxy Tab S9 Ultra OLED Display 256GB',
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&auto=format&fit=crop&q=80',
    platform: 'Shopify' as const,
    minPrice: 200,
    maxPrice: 650,
  },
  {
    name: 'Nike Air Zoom Pegasus 40 Running Shoes Edition',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80',
    platform: 'AliExpress' as const,
    minPrice: 45,
    maxPrice: 160,
  },
];

export const liveCommissionFeed = [
  { user: 'T***********6', amount: 432.10, time: 'Just now' },
  { user: 'K***********9', amount: 185.50, time: '1 min ago' },
  { user: 'M***********2', amount: 620.00, time: '2 mins ago' },
  { user: 'A***********8', amount: 94.20, time: '3 mins ago' },
  { user: 'R***********1', amount: 312.80, time: '4 mins ago' },
  { user: 'D***********4', amount: 550.00, time: '5 mins ago' },
];

export const faqsList = [
  {
    q: 'How do I start earning commissions on Lifvox / SellvoraPro?',
    a: 'Simply fund your balance with USDT (TRC-20 or ERC-20), choose an e-commerce partner platform (Amazon, eBay, etc.), click "Grab Order", confirm the product order dispatch, and your commission will be credited directly to your balance.',
  },
  {
    q: 'What are the VIP tiers and commission rates?',
    a: 'VIP 1 Bronze grants 4.0% per order (20 - 498 USDT range). VIP 2 Silver grants 4.5% per order (500 - 1999 USDT). VIP 3 Gold grants 5.0% per order (2000 - 4999 USDT). As your volume grows, your daily earnings increase!',
  },
  {
    q: 'How fast are withdrawal requests processed?',
    a: 'Withdrawals are processed around the clock via automated blockchain settlement. Typical delivery times are under 10 minutes to your verified USDT wallet address.',
  },
  {
    q: 'Can I invite friends and earn referral bonuses?',
    a: 'Yes! Share your personal invitation code. You will earn multi-tier commissions on orders placed by your direct and extended team members.',
  },
  {
    q: 'Is there a minimum deposit and withdrawal limit?',
    a: 'The minimum initial account activation is 20 USDT, and the minimum withdrawal threshold is 10 USDT with low standard network gas fees.',
  },
];
