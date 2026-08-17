import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Upload, AlertCircle } from 'lucide-react';
import { UserProfile } from '../../types';

interface KYCModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onVerifySuccess: () => void;
}

export const KYCModal: React.FC<KYCModalProps> = ({
  isOpen,
  onClose,
  user,
  onVerifySuccess,
}) => {
  const [realName, setRealName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [idType, setIdType] = useState('Passport / ID Card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!realName || !idNumber) {
      alert('Please fill out all required verification fields');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setDone(true);
      onVerifySuccess();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">Identity Verification</h3>
              <p className="text-xs text-gray-400">KYC Compliance & Security</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {done || user.isVerified ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#00A651] flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-1">Identity Verified!</h4>
            <p className="text-xs text-gray-500 max-w-xs mx-auto mb-6">
              Your account has full access to high-tier order dispatch and unlimited daily withdrawals.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 bg-[#00A651] text-white font-bold text-xs rounded-xl shadow-xs"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1">
                Full Legal Name
              </label>
              <input
                type="text"
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1">
                Document Type
              </label>
              <select
                value={idType}
                onChange={(e) => setIdType(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:border-emerald-500"
              >
                <option>Passport / ID Card</option>
                <option>Driver's License</option>
                <option>National Identity Card</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-1">
                ID / Document Number
              </label>
              <input
                type="text"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeholder="Enter document identification number"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono text-gray-900 focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div className="p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl text-center cursor-pointer hover:bg-gray-100 transition-colors">
              <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1.5" />
              <p className="text-xs font-bold text-gray-700">Upload Photo of ID</p>
              <p className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, or PDF up to 10MB</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#00A651] hover:bg-[#009247] text-white font-bold rounded-2xl text-sm shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center"
            >
              {isSubmitting ? 'Submitting for Auto-Verification...' : 'Submit Verification'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
