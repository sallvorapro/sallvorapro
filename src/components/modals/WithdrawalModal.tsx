import React, { useState } from 'react';
import { X, Download, AlertCircle } from 'lucide-react';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  userBalance: number;
  onWithdrawSuccess: (amount: number) => void;
}

export const WithdrawalModal: React.FC<WithdrawalModalProps> = ({
  isOpen,
  onClose,
  userBalance,
  onWithdrawSuccess,
}) => {
  const [network, setNetwork] = useState<'TRC20' | 'ERC20'>('TRC20');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [fundPassword, setFundPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const num = parseFloat(amount);

    if (!address || address.length < 15) {
      setError('Please provide a valid USDT withdrawal wallet address');
      return;
    }
    if (isNaN(num) || num <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    if (num > userBalance) {
      setError('Insufficient balance for withdrawal');
      return;
    }
    if (num < 10) {
      setError('Minimum withdrawal limit is 10 USDT');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onWithdrawSuccess(num);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">Withdraw USDT</h3>
              <p className="text-xs text-gray-400">Available: {userBalance.toFixed(2)} USDT</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="mt-3 p-3 bg-rose-50 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200">
            {error}
          </div>
        )}

        <form onSubmit={handleWithdraw} className="space-y-4 mt-4">
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-2">
              Network
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['TRC20', 'ERC20'] as const).map((net) => (
                <button
                  key={net}
                  type="button"
                  onClick={() => setNetwork(net)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    network === net
                      ? 'bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}
                >
                  USDT-{net}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1">
              Destination Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your USDT wallet address"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono text-gray-900 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block">
                Amount (USDT)
              </label>
              <button
                type="button"
                onClick={() => setAmount(userBalance.toString())}
                className="text-xs text-blue-600 font-bold hover:underline"
              >
                All
              </button>
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1">
              Fund Password / PIN
            </label>
            <input
              type="password"
              value={fundPassword}
              onChange={(e) => setFundPassword(e.target.value)}
              placeholder="Enter 6-digit PIN"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-[11px] text-gray-500 space-y-1">
            <div className="flex justify-between">
              <span>Handling Fee:</span>
              <span className="font-semibold text-gray-700">0.00 USDT (0%)</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Arrival:</span>
              <span className="font-semibold text-gray-700">5 - 15 minutes</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? 'Submitting Withdrawal Request...' : 'Confirm Withdrawal'}
          </button>
        </form>
      </div>
    </div>
  );
};
