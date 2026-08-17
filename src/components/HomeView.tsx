import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Users,
  ShieldCheck,
  Zap,
  Wallet,
  Download,
  ShoppingCart,
  FileText,
  UserPlus,
  Trophy,
  CheckCircle2,
  Globe,
  Coins,
  Store,
  Rocket,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { liveCommissionFeed } from '../mockData';
import { NavigationTab, UserProfile } from '../types';

interface HomeViewProps {
  user: UserProfile;
  onNavigate: (tab: NavigationTab) => void;
  onOpenRecharge: () => void;
  onOpenWithdrawal: () => void;
  onOpenGrabOrder: (platform?: any) => void;
  onOpenTeams: () => void;
  onOpenInvite: () => void;
  onOpenLeaderboard: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  user,
  onNavigate,
  onOpenRecharge,
  onOpenWithdrawal,
  onOpenGrabOrder,
  onOpenTeams,
  onOpenInvite,
  onOpenLeaderboard,
}) => {
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % liveCommissionFeed.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const currentTicker = liveCommissionFeed[tickerIndex];

  const quickActions = [
    {
      id: 'recharge',
      label: 'Recharge',
      icon: Wallet,
      color: 'bg-[#00C49F]',
      onClick: onOpenRecharge,
    },
    {
      id: 'withdrawal',
      label: 'Withdrawal',
      icon: Download,
      color: 'bg-[#0099FF]',
      onClick: onOpenWithdrawal,
    },
    {
      id: 'grab-order',
      label: 'Grab Order',
      icon: ShoppingCart,
      color: 'bg-[#FF6B00]',
      onClick: () => onOpenGrabOrder('Amazon'),
    },
    {
      id: 'records',
      label: 'Records',
      icon: FileText,
      color: 'bg-[#8B5CF6]',
      onClick: () => onNavigate('records'),
    },
    {
      id: 'teams',
      label: 'Teams',
      icon: Users,
      color: 'bg-[#F59E0B]',
      onClick: onOpenTeams,
    },
    {
      id: 'invitation',
      label: 'Invitation',
      icon: UserPlus,
      color: 'bg-[#EC4899]',
      onClick: onOpenInvite,
    },
    {
      id: 'leaderboard',
      label: 'Leaderboard',
      icon: Trophy,
      color: 'bg-[#EAB308]',
      onClick: onOpenLeaderboard,
    },
  ];

  const partners = [
    {
      name: 'Amazon',
      tag: 'Global',
      logoText: 'amazon',
      color: 'hover:border-amber-400',
      tagBg: 'bg-amber-100 text-amber-900',
    },
    {
      name: 'eBay',
      tag: 'Global',
      logoText: 'ebay',
      color: 'hover:border-blue-400',
      tagBg: 'bg-blue-100 text-blue-900',
    },
    {
      name: 'Shopify',
      tag: 'Direct',
      logoText: 'shopify',
      color: 'hover:border-emerald-400',
      tagBg: 'bg-emerald-100 text-emerald-900',
    },
    {
      name: 'AliExpress',
      tag: 'Wholesale',
      logoText: 'AliExpress',
      color: 'hover:border-red-400',
      tagBg: 'bg-red-100 text-red-900',
    },
    {
      name: 'Walmart',
      tag: 'Retail',
      logoText: 'Walmart',
      color: 'hover:border-sky-400',
      tagBg: 'bg-sky-100 text-sky-900',
    },
    {
      name: 'Temu',
      tag: 'Super Value',
      logoText: 'temu',
      color: 'hover:border-orange-400',
      tagBg: 'bg-orange-100 text-orange-900',
    },
  ];

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-7 pb-16">
      {/* Top Emerald Banner */}
      <div className="w-full bg-[#00A651] rounded-3xl p-8 md:p-10 text-white shadow-lg shadow-emerald-700/15 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-100 block mb-2 opacity-95">
            E-COMMERCE COMMISSION PLATFORM
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-3">
            Earn commissions from top e-commerce brands
          </h2>
          <p className="text-emerald-50 text-sm md:text-base leading-relaxed mb-6 font-medium max-w-xl">
            Partner with Amazon, eBay, and more. Grab product orders, handle sales, and earn commission on every transaction.
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/15 backdrop-blur-xs text-xs font-semibold text-white border border-white/20">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            <span>Live Orders Available</span>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00A651] flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-extrabold text-gray-900">$2.5M+</div>
            <div className="text-xs text-gray-500 font-medium">Daily Volume</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00A651] flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-extrabold text-gray-900">50K+</div>
            <div className="text-xs text-gray-500 font-medium">Active Users</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00A651] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-extrabold text-gray-900">99.9%</div>
            <div className="text-xs text-gray-500 font-medium">Security Rate</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00A651] flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-extrabold text-gray-900">&lt;1s</div>
            <div className="text-xs text-gray-500 font-medium">Avg. Speed</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                id={`btn-quick-action-${action.id}`}
                onClick={action.onClick}
                className="flex flex-col items-center justify-center gap-2 group cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${action.color} text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-all duration-150`}
                >
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-gray-900 text-center">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* OUR E-COMMERCE PARTNERS */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-extrabold text-gray-600 uppercase tracking-wider">
            OUR E-COMMERCE PARTNERS
          </h3>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            Global Network
          </span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {partners.map((partner) => (
            <div
              key={partner.name}
              onClick={() => onOpenGrabOrder(partner.name)}
              className={`p-4 bg-white rounded-2xl border border-gray-200/80 shadow-2xs flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:shadow-sm ${partner.color}`}
            >
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center font-extrabold text-gray-800 text-xs border border-gray-100">
                {partner.logoText.slice(0, 3).toUpperCase()}
              </div>
              <span className="text-xs font-bold text-gray-800">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Commission Ticker */}
      <div className="p-4 bg-white rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#00A651] flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-gray-900">{currentTicker.user}</span>
            <span className="text-gray-500 font-medium">Commission earned</span>
          </div>
        </div>
        <div className="text-sm font-extrabold text-[#00A651] flex items-center gap-1">
          <span>+{currentTicker.amount.toFixed(2)} USDT</span>
        </div>
      </div>

      {/* How It Works */}
      <div>
        <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-4">
          How It Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-gray-200/80 shadow-xs relative">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00A651] flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                01
              </span>
            </div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">Deposit Funds</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Fund your account with USDT to start earning through our platform.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-gray-200/80 shadow-xs relative">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00A651] flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                02
              </span>
            </div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">Grab Orders</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Receive product orders from top e-commerce partners and handle the sale.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-gray-200/80 shadow-xs relative">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00A651] flex items-center justify-center">
                <Coins className="w-5 h-5" />
              </div>
              <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                03
              </span>
            </div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">Earn Commission</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Earn commission on every order you handle. Higher VIP levels mean higher rates.
            </p>
          </div>
        </div>
      </div>

      {/* Learn More */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">
            Learn More
          </h3>
          <button
            onClick={() => onNavigate('support')}
            className="text-xs font-bold text-[#00A651] hover:underline"
          >
            View all
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00A651] flex items-center justify-center mb-3">
                <Globe className="w-4 h-4" />
              </div>
              <h5 className="text-xs font-bold text-gray-900 mb-1">About Our Platform</h5>
              <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                We partner with the world's top e-commerce companies, connecting shoppers with...
              </p>
            </div>
            <button
              onClick={() => onNavigate('support')}
              className="text-xs font-bold text-[#00A651] hover:underline mt-3 flex items-center gap-1"
            >
              <span>Read more</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00A651] flex items-center justify-center mb-3">
                <Coins className="w-4 h-4" />
              </div>
              <h5 className="text-xs font-bold text-gray-900 mb-1">How Commissions Work</h5>
              <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                Grab orders, handle the sale, and earn a percentage commission. The higher...
              </p>
            </div>
            <button
              onClick={() => onNavigate('earn')}
              className="text-xs font-bold text-[#00A651] hover:underline mt-3 flex items-center gap-1"
            >
              <span>Read more</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00A651] flex items-center justify-center mb-3">
                <Store className="w-4 h-4" />
              </div>
              <h5 className="text-xs font-bold text-gray-900 mb-1">Partner Ecosystem</h5>
              <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                We work with Amazon, eBay, Shopify and more. Our partnerships ensure a...
              </p>
            </div>
            <button
              onClick={() => onNavigate('earn')}
              className="text-xs font-bold text-[#00A651] hover:underline mt-3 flex items-center gap-1"
            >
              <span>Read more</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00A651] flex items-center justify-center mb-3">
                <Rocket className="w-4 h-4" />
              </div>
              <h5 className="text-xs font-bold text-gray-900 mb-1">Getting Started</h5>
              <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                Deposit funds, choose your VIP level, and start grabbing orders. It's that...
              </p>
            </div>
            <button
              onClick={() => onNavigate('support')}
              className="text-xs font-bold text-[#00A651] hover:underline mt-3 flex items-center gap-1"
            >
              <span>Read more</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
