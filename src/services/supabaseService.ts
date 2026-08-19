import { supabase } from '../lib/supabase';
import {
  UserProfile,
  ManagedUser,
  OrderItem,
  DepositRequest,
  WithdrawalRequest,
  PlatformSettings,
} from '../types';

/**
 * Fetch or initialize a user profile in Supabase
 */
export async function syncUserProfile(profile: UserProfile): Promise<UserProfile> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', profile.email)
      .maybeSingle();

    if (error) {
      console.warn('Supabase profiles query warning:', error.message);
      return profile;
    }

    if (data) {
      // Map Supabase column names to UserProfile
      return {
        ...profile,
        id: data.id || profile.id,
        username: data.username || profile.username,
        email: data.email || profile.email,
        balance: Number(data.balance) ?? profile.balance,
        frozenBalance: Number(data.frozen_balance) ?? profile.frozenBalance,
        vipLevel: Number(data.vip_level) ?? profile.vipLevel,
        vipName: data.vip_name || profile.vipName,
        commissionRate: Number(data.commission_rate) ?? profile.commissionRate,
        completedOrdersCount: Number(data.completed_orders_count) ?? profile.completedOrdersCount,
        isVerified: Boolean(data.is_verified) ?? profile.isVerified,
        isAdmin: Boolean(data.is_admin) ?? profile.isAdmin,
      };
    } else {
      // Insert new profile into Supabase
      await supabase.from('profiles').insert({
        id: profile.id,
        username: profile.username,
        email: profile.email,
        balance: profile.balance,
        frozen_balance: profile.frozenBalance,
        vip_level: profile.vipLevel,
        vip_name: profile.vipName,
        commission_rate: profile.commissionRate,
        completed_orders_count: profile.completedOrdersCount,
        target_orders_count: profile.targetOrdersCount,
        referral_code: profile.referralCode,
        is_verified: profile.isVerified,
        avatar_text: profile.avatarText,
        is_admin: profile.isAdmin || false,
      });
      return profile;
    }
  } catch (err) {
    console.warn('Supabase syncUserProfile fallback:', err);
    return profile;
  }
}

/**
 * Update user balance & VIP in Supabase
 */
export async function saveUserBalance(
  userId: string,
  email: string,
  newBalance: number,
  completedOrdersCount?: number,
  vipLevel?: number,
  vipName?: string,
  commissionRate?: number
) {
  try {
    const updatePayload: Record<string, any> = {
      balance: newBalance,
      updated_at: new Date().toISOString(),
    };
    if (completedOrdersCount !== undefined) {
      updatePayload.completed_orders_count = completedOrdersCount;
    }
    if (vipLevel !== undefined) {
      updatePayload.vip_level = vipLevel;
    }
    if (vipName !== undefined) {
      updatePayload.vip_name = vipName;
    }
    if (commissionRate !== undefined) {
      updatePayload.commission_rate = commissionRate;
    }

    await supabase
      .from('profiles')
      .update(updatePayload)
      .or(`id.eq.${userId},email.eq.${email}`);
  } catch (err) {
    console.warn('Supabase saveUserBalance fallback:', err);
  }
}

/**
 * Fetch all users for Admin
 */
export async function fetchAllManagedUsers(fallbackUsers: ManagedUser[]): Promise<ManagedUser[]> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackUsers;
    }

    return data.map((d: any) => ({
      id: d.id,
      username: d.username,
      email: d.email,
      balance: Number(d.balance) || 0,
      frozenBalance: Number(d.frozen_balance) || 0,
      vipLevel: Number(d.vip_level) || 1,
      vipName: d.vip_name || 'VIP 1 - Bronze',
      commissionRate: Number(d.commission_rate) || 0.04,
      completedOrdersCount: Number(d.completed_orders_count) || 0,
      isVerified: Boolean(d.is_verified),
      status: (d.status as any) || 'active',
      joinedDate: d.created_at ? new Date(d.created_at).toISOString().split('T')[0] : '2026-08-15',
      totalDeposited: Number(d.balance) || 0,
      totalWithdrawn: 0,
    }));
  } catch (err) {
    console.warn('Supabase fetchAllManagedUsers fallback:', err);
    return fallbackUsers;
  }
}

/**
 * Save new Order to Supabase
 */
export async function recordNewOrder(order: OrderItem, userId: string, username: string) {
  try {
    await supabase.from('orders').insert({
      id: order.id,
      user_id: userId,
      username: username,
      platform: order.platform,
      product_name: order.productName,
      product_image: order.productImage,
      order_amount: order.orderAmount,
      commission_rate: order.commissionRate,
      commission_earned: order.commissionEarned,
      status: order.status,
      created_at: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('Supabase recordNewOrder fallback:', err);
  }
}

/**
 * Fetch Orders for user
 */
export async function fetchUserOrdersFromSupabase(userId: string, fallbackOrders: OrderItem[]): Promise<OrderItem[]> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackOrders;
    }

    return data.map((d: any) => ({
      id: d.id,
      platform: d.platform,
      productName: d.product_name,
      productImage: d.product_image,
      orderAmount: Number(d.order_amount),
      commissionRate: Number(d.commission_rate),
      commissionEarned: Number(d.commission_earned),
      status: d.status || 'completed',
      createdAt: d.created_at ? new Date(d.created_at).toLocaleTimeString() : 'Just now',
    }));
  } catch (err) {
    console.warn('Supabase fetchUserOrdersFromSupabase fallback:', err);
    return fallbackOrders;
  }
}

/**
 * Create Deposit Request in Supabase
 */
export async function recordDepositRequest(req: DepositRequest) {
  try {
    await supabase.from('deposits').insert({
      id: req.id,
      user_id: req.userId,
      username: req.username,
      email: req.email,
      amount: req.amount,
      network: req.network,
      tx_hash: req.txHash,
      status: req.status,
      notes: req.notes || '',
      created_at: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('Supabase recordDepositRequest fallback:', err);
  }
}

/**
 * Update Deposit Request Status in Supabase
 */
export async function updateDepositStatusInSupabase(depositId: string, status: 'approved' | 'rejected') {
  try {
    await supabase
      .from('deposits')
      .update({ status })
      .eq('id', depositId);
  } catch (err) {
    console.warn('Supabase updateDepositStatusInSupabase fallback:', err);
  }
}

/**
 * Create Withdrawal Request in Supabase
 */
export async function recordWithdrawalRequest(req: WithdrawalRequest) {
  try {
    await supabase.from('withdrawals').insert({
      id: req.id,
      user_id: req.userId,
      username: req.username,
      email: req.email,
      amount: req.amount,
      network: req.network,
      wallet_address: req.walletAddress,
      status: req.status,
      notes: req.notes || '',
      created_at: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('Supabase recordWithdrawalRequest fallback:', err);
  }
}

/**
 * Update Withdrawal Request Status in Supabase
 */
export async function updateWithdrawalStatusInSupabase(withdrawalId: string, status: 'approved' | 'rejected') {
  try {
    await supabase
      .from('withdrawals')
      .update({ status, processed_at: new Date().toISOString() })
      .eq('id', withdrawalId);
  } catch (err) {
    console.warn('Supabase updateWithdrawalStatusInSupabase fallback:', err);
  }
}

/**
 * Save Platform Settings in Supabase
 */
export async function savePlatformSettingsInSupabase(settings: PlatformSettings) {
  try {
    await supabase.from('platform_settings').upsert({
      id: 'global_config',
      min_withdrawal: settings.minWithdrawal,
      max_daily_orders: settings.maxDailyOrders,
      announcement: settings.announcement,
      maintenance_mode: settings.maintenanceMode,
      updated_at: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('Supabase savePlatformSettingsInSupabase fallback:', err);
  }
}
