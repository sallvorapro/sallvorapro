import React, { useState } from 'react';
import { X, Copy, Check, QrCode, Share2, Sparkles } from 'lucide-react';
import { UserProfile } from '../../types';

interface InvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

export const InvitationModal: React.FC<InvitationModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const inviteLink = `https://sellvorapro.com/register?ref=${user.referralCode}`;

  const copyCode = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">Invite Friends</h3>
              <p className="text-xs text-gray-400">Earn up to 28% multi-tier team rebates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* QR Code Banner */}
        <div className="my-4 p-5 bg-gradient-to-b from-emerald-500 to-[#00A651] rounded-3xl text-white text-center shadow-lg shadow-emerald-700/20">
          <div className="w-36 h-36 mx-auto bg-white rounded-2xl p-2.5 shadow-md flex items-center justify-center mb-3">
            <QrCode className="w-32 h-32 text-gray-900" />
          </div>
          <div className="text-xs uppercase tracking-widest font-extrabold text-emerald-100">
            Exclusive Invitation QR
          </div>
          <div className="text-sm font-bold mt-0.5">Scan to join SellvoraPro</div>
        </div>

        {/* Referral Code Box */}
        <div className="space-y-3">
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1">
              Your Invitation Code
            </label>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-200">
              <span className="font-mono font-extrabold text-base text-gray-900 tracking-wider">
                {user.referralCode}
              </span>
              <button
                onClick={copyCode}
                className="px-3 py-1.5 bg-emerald-50 text-[#00A651] font-bold text-xs rounded-xl hover:bg-emerald-100 flex items-center gap-1 transition-colors"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1">
              Referral Link
            </label>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-200">
              <span className="truncate text-xs font-mono text-gray-600 mr-2">{inviteLink}</span>
              <button
                onClick={copyLink}
                className="px-3 py-1.5 bg-[#00A651] text-white font-bold text-xs rounded-xl hover:bg-[#009247] flex items-center gap-1 shrink-0 shadow-xs transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
