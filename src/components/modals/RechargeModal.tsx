import React, { useState } from 'react';
import { X, Copy, Check, QrCode, AlertCircle, ArrowRight } from 'lucide-react';

interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDepositSuccess: (amount: number) => void;
}

export const RechargeModal: React.FC<RechargeModalProps> = ({
  isOpen,
  onClose,
  onDepositSuccess,
}) => {
  const [network, setNetwork] = useState<'TRC20' | 'ERC20' | 'BEP20'>('TRC20');
  const [amount, setAmount] = useState('100');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const walletAddress =
    network === 'TRC20'
      ? 'TX9aZ8yL37pQmK2hVw5eNrG4tB6vY1dJuE'
      : network === 'ERC20'
      ? '0x71C...4982B3e7d91'
      : '0x99A...1219Ca4e5B';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = () => {
    const num = parseFloat(amount);
    if (isNaN(num) || num < 20) {
      alert('Minimum deposit amount is 20 USDT');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onDepositSuccess(num);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#00A651] flex items-center justify-center font-bold">
              ₮
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">Recharge USDT</h3>
              <p className="text-xs text-gray-400">Instant blockchain automatic credit</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Network Selection */}
        <div className="mt-4">
          <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-2">
            Deposit Network
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['TRC20', 'ERC20', 'BEP20'] as const).map((net) => (
              <button
                key={net}
                type="button"
                onClick={() => setNetwork(net)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                  network === net
                    ? 'bg-emerald-50 border-[#00A651] text-[#00A651]'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                USDT-{net}
              </button>
            ))}
          </div>
        </div>

        {/* Preset Amounts */}
        <div className="mt-4">
          <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-2">
            Amount (USDT)
          </label>
          <div className="grid grid-cols-4 gap-2 mb-2">
            {['50', '100', '300', '500'].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setAmount(val)}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  amount === val
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                +{val}
              </button>
            ))}
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Custom Amount (Min 20 USDT)"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* QR Code & Address Box */}
        <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-200 text-center">
          <div className="w-32 h-32 mx-auto bg-white rounded-xl p-2 border border-gray-200 shadow-sm flex items-center justify-center mb-3">
            <QrCode className="w-28 h-28 text-gray-800" />
          </div>
          <p className="text-[11px] text-gray-500 font-medium mb-1">Send USDT ({network}) to this address:</p>
          <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-gray-200 text-xs font-mono text-gray-700">
            <span className="truncate pr-2">{walletAddress}</span>
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 bg-emerald-50 text-[#00A651] font-bold rounded-lg hover:bg-emerald-100 flex items-center gap-1 shrink-0 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-3 flex items-start gap-2 p-2.5 bg-amber-50 rounded-xl border border-amber-200/70 text-amber-800 text-[11px]">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>Minimum recharge is 20 USDT. Orders reflect in account within 1-3 confirmations.</span>
        </div>

        {/* Action button */}
        <div className="mt-5">
          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="w-full py-3.5 bg-[#00A651] hover:bg-[#009247] text-white font-bold rounded-2xl text-sm shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all"
          >
            {isSubmitting ? (
              <span>Simulating Blockchain Confirmation...</span>
            ) : (
              <>
                <span>Confirm & Simulated Instant Deposit</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
