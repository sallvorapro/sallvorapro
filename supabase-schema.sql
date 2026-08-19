-- SallvoraPro Supabase Database Schema
-- Copy and paste this into your Supabase SQL Editor to create all tables and policies:

-- 1. Profiles / Users Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  balance NUMERIC DEFAULT 0.00,
  frozen_balance NUMERIC DEFAULT 0.00,
  vip_level INT DEFAULT 1,
  vip_name TEXT DEFAULT 'VIP 1 - Bronze',
  commission_rate NUMERIC DEFAULT 0.04,
  completed_orders_count INT DEFAULT 0,
  target_orders_count INT DEFAULT 24,
  referral_code TEXT,
  is_verified BOOLEAN DEFAULT false,
  avatar_text TEXT DEFAULT 'US',
  is_admin BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  username TEXT,
  platform TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_image TEXT,
  order_amount NUMERIC NOT NULL,
  commission_rate NUMERIC NOT NULL,
  commission_earned NUMERIC NOT NULL,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Deposits Table
CREATE TABLE IF NOT EXISTS public.deposits (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  username TEXT,
  email TEXT,
  amount NUMERIC NOT NULL,
  network TEXT DEFAULT 'USDT (TRC-20)',
  tx_hash TEXT,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Withdrawals Table
CREATE TABLE IF NOT EXISTS public.withdrawals (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  username TEXT,
  email TEXT,
  amount NUMERIC NOT NULL,
  network TEXT DEFAULT 'USDT (TRC-20)',
  wallet_address TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Platform Settings Table
CREATE TABLE IF NOT EXISTS public.platform_settings (
  id TEXT PRIMARY KEY DEFAULT 'global_config',
  min_withdrawal NUMERIC DEFAULT 10,
  max_daily_orders INT DEFAULT 30,
  announcement TEXT,
  maintenance_mode BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) & Public read/write for demo
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deposits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read access on orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read access on deposits" ON public.deposits FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read access on withdrawals" ON public.withdrawals FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read access on settings" ON public.platform_settings FOR ALL USING (true) WITH CHECK (true);
