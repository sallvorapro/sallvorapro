import React from 'react';
import { X, Users, Award, TrendingUp, UserPlus } from 'lucide-react';
import { UserProfile } from '../../types';

interface TeamsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onOpenInvite: () => void;
}

export const TeamsModal: React.FC<TeamsModalProps> = ({
  isOpen,
  onClose,
  user,
  onOpenInvite,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">My Team & Commission Rebate</h3>
              <p className="text-xs text-gray-400">Referral Multi-Tier Distribution</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Team Overview Stats */}
        <div className="grid grid-cols-3 gap-3 my-4">
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/60 text-center">
            <div className="text-[11px] font-bold text-amber-800">Total Team</div>
            <div className="text-xl font-extrabold text-amber-900 mt-0.5">14</div>
            <div className="text-[10px] text-amber-700">Members</div>
          </div>
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200/60 text-center">
            <div className="text-[11px] font-bold text-emerald-800">Team Volume</div>
            <div className="text-xl font-extrabold text-emerald-900 mt-0.5">$3,420</div>
            <div className="text-[10px] text-emerald-700">USDT</div>
          </div>
          <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200/60 text-center">
            <div className="text-[11px] font-bold text-blue-800">Rebate Earned</div>
            <div className="text-xl font-extrabold text-blue-900 mt-0.5">+$148.50</div>
            <div className="text-[10px] text-blue-700">USDT</div>
          </div>
        </div>

        {/* Tier Rebate Breakdown */}
        <div className="space-y-2.5">
          <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">
                L1
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900">Level 1 (Direct Referrals)</div>
                <div className="text-[11px] text-gray-500">6 Members • Rate: 16% of commission</div>
              </div>
            </div>
            <div className="text-xs font-bold text-emerald-600">+$94.20 USDT</div>
          </div>

          <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                L2
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900">Level 2 (Secondary Team)</div>
                <div className="text-[11px] text-gray-500">5 Members • Rate: 8% of commission</div>
              </div>
            </div>
            <div className="text-xs font-bold text-emerald-600">+$38.10 USDT</div>
          </div>

          <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">
                L3
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900">Level 3 (Tertiary Team)</div>
                <div className="text-[11px] text-gray-500">3 Members • Rate: 4% of commission</div>
              </div>
            </div>
            <div className="text-xs font-bold text-emerald-600">+$16.20 USDT</div>
          </div>
        </div>

        {/* Invite action */}
        <div className="mt-5">
          <button
            onClick={() => {
              onClose();
              onOpenInvite();
            }}
            className="w-full py-3.5 bg-[#00A651] hover:bg-[#009247] text-white font-bold rounded-2xl text-sm shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite More Friends & Earn</span>
          </button>
        </div>
      </div>
    </div>
  );
};
