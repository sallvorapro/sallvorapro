import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, ShoppingCart, ArrowRight, RefreshCw, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sampleProducts } from '../../mockData';
import { OrderItem, UserProfile } from '../../types';

interface GrabOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  platform?: 'Amazon' | 'eBay' | 'Shopify' | 'AliExpress';
  onOrderCompleted: (order: OrderItem) => void;
  onOpenDeposit: () => void;
}

export const GrabOrderModal: React.FC<GrabOrderModalProps> = ({
  isOpen,
  onClose,
  user,
  platform = 'Amazon',
  onOrderCompleted,
  onOpenDeposit,
}) => {
  const [step, setStep] = useState<'searching' | 'matched' | 'submitting' | 'success'>('searching');
  const [currentProduct, setCurrentProduct] = useState<(typeof sampleProducts)[0] | null>(null);
  const [orderAmount, setOrderAmount] = useState(0);
  const [commissionEarned, setCommissionEarned] = useState(0);

  useEffect(() => {
    if (isOpen) {
      startMatching();
    } else {
      setStep('searching');
      setCurrentProduct(null);
    }
  }, [isOpen]);

  const startMatching = () => {
    setStep('searching');
    const matchedProducts = sampleProducts.filter((p) => p.platform === platform || platform === 'Amazon');
    const prod = matchedProducts[Math.floor(Math.random() * matchedProducts.length)] || sampleProducts[0];
    const amount = Math.floor(Math.random() * (prod.maxPrice - prod.minPrice) + prod.minPrice);
    const comm = parseFloat((amount * user.commissionRate).toFixed(2));

    setCurrentProduct(prod);
    setOrderAmount(amount);
    setCommissionEarned(comm);

    const timer = setTimeout(() => {
      setStep('matched');
    }, 1800);

    return () => clearTimeout(timer);
  };

  if (!isOpen) return null;

  const handleSubmitOrder = () => {
    setStep('submitting');
    setTimeout(() => {
      setStep('success');
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore
      }

      if (currentProduct) {
        const newOrder: OrderItem = {
          id: `ORD-${Date.now().toString().slice(-6)}`,
          platform: currentProduct.platform,
          productName: currentProduct.name,
          productImage: currentProduct.image,
          orderAmount,
          commissionRate: user.commissionRate,
          commissionEarned,
          status: 'completed',
          createdAt: new Date().toISOString(),
          completedAt: new Date().toISOString(),
        };
        onOrderCompleted(newOrder);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">Grab Order - {platform}</h3>
              <p className="text-xs text-gray-400">Commission Rate: {(user.commissionRate * 100).toFixed(0)}%</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Searching Step */}
        {step === 'searching' && (
          <div className="py-12 text-center flex flex-col items-center justify-center">
            <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-100 animate-ping opacity-60"></div>
              <div className="absolute inset-2 rounded-full border-4 border-[#00A651] border-t-transparent animate-spin"></div>
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-[#00A651]">
                <Sparkles className="w-7 h-7 animate-pulse" />
              </div>
            </div>
            <h4 className="text-base font-bold text-gray-800 mb-1">Connecting to {platform} Network...</h4>
            <p className="text-xs text-gray-400 max-w-xs">
              Matching high-commission verified customer dispatch requests...
            </p>
          </div>
        )}

        {/* Matched Step */}
        {(step === 'matched' || step === 'submitting') && currentProduct && (
          <div className="py-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl mb-4">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Matched 1 Order from {currentProduct.platform} Global Store</span>
            </div>

            {/* Product Card */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex gap-4 items-center">
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-xl object-cover border border-gray-200 shrink-0 shadow-xs"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800 inline-block mb-1">
                  {currentProduct.platform} Verified
                </span>
                <h5 className="text-xs font-bold text-gray-800 line-clamp-2 leading-snug mb-1">
                  {currentProduct.name}
                </h5>
                <div className="text-xs text-gray-500 font-medium">Order Value: ${orderAmount}.00</div>
              </div>
            </div>

            {/* Commission calculation card */}
            <div className="mt-4 p-4 bg-emerald-50/70 border border-emerald-200/60 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Order Total:</span>
                <span className="font-bold text-gray-800">{orderAmount}.00 USDT</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Commission Rate:</span>
                <span className="font-bold text-gray-800">{(user.commissionRate * 100).toFixed(0)}%</span>
              </div>
              <div className="pt-2 border-t border-emerald-200 flex justify-between items-center">
                <span className="font-bold text-emerald-900 text-sm">Your Commission:</span>
                <span className="font-extrabold text-[#00A651] text-base">+{commissionEarned.toFixed(2)} USDT</span>
              </div>
            </div>

            {/* Submit button */}
            <div className="mt-5 space-y-2">
              <button
                onClick={handleSubmitOrder}
                disabled={step === 'submitting'}
                className="w-full py-4 bg-[#00A651] hover:bg-[#009247] text-white font-bold rounded-2xl text-sm shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all duration-150 transform hover:-translate-y-0.5 disabled:opacity-70"
              >
                {step === 'submitting' ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Submitting & Crediting Commission...
                  </span>
                ) : (
                  <>
                    <span>Submit & Claim Commission</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <button
                onClick={startMatching}
                disabled={step === 'submitting'}
                className="w-full py-2.5 text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors"
              >
                Skip & Grab Another Order
              </button>
            </div>
          </div>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <div className="py-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#00A651] flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-extrabold text-gray-900 mb-1">Commission Earned!</h4>
            <p className="text-xs text-gray-500 mb-4">The order dispatch was processed successfully.</p>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 inline-block px-8 mb-6">
              <div className="text-xs text-emerald-800 font-semibold mb-0.5">Credited to Balance</div>
              <div className="text-3xl font-extrabold text-[#00A651]">+{commissionEarned.toFixed(2)} USDT</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={startMatching}
                className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
              >
                Grab Next Order
              </button>
              <button
                onClick={onClose}
                className="py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-all"
              >
                View Records
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
