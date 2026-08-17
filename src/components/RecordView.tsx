import React, { useState } from 'react';
import { Clock, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { OrderItem } from '../types';

interface RecordViewProps {
  orders: OrderItem[];
  onOpenEarn: () => void;
}

export const RecordView: React.FC<RecordViewProps> = ({ orders, onOpenEarn }) => {
  const [activeTab, setActiveTab] = useState<'incomplete' | 'complete'>('incomplete');

  const incompleteOrders = orders.filter((o) => o.status === 'pending');
  const completeOrders = orders.filter((o) => o.status === 'completed');

  const currentList = activeTab === 'incomplete' ? incompleteOrders : completeOrders;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Emerald Header */}
      <div className="w-full bg-[#00A651] py-4 text-center text-white font-extrabold text-lg shadow-sm">
        Record
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 grid grid-cols-2 text-center text-sm font-bold">
        <button
          id="tab-record-incomplete"
          onClick={() => setActiveTab('incomplete')}
          className={`py-3.5 transition-all relative ${
            activeTab === 'incomplete' ? 'text-[#00A651]' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <span>Incomplete</span>
          {activeTab === 'incomplete' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00A651]"></div>
          )}
        </button>
        <button
          id="tab-record-complete"
          onClick={() => setActiveTab('complete')}
          className={`py-3.5 transition-all relative ${
            activeTab === 'complete' ? 'text-[#00A651]' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <span>Complete</span>
          {activeTab === 'complete' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00A651]"></div>
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 max-w-4xl w-full mx-auto">
        {currentList.length === 0 ? (
          <div className="py-24 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 stroke-[1.8]" />
            </div>
            <p className="text-sm font-medium text-gray-500 mb-6">
              {activeTab === 'incomplete' ? 'No incomplete orders' : 'No complete orders'}
            </p>
            <button
              onClick={onOpenEarn}
              className="px-6 py-2.5 bg-[#00A651] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#009247] transition-colors"
            >
              Start Grabbing Orders
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {currentList.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={order.productImage}
                    alt={order.productName}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover border border-gray-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {order.platform}
                      </span>
                      <span className="text-xs font-mono text-gray-400">{order.id}</span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{order.productName}</h4>
                    <div className="text-[11px] text-gray-500 mt-1">
                      Amount: <span className="font-semibold text-gray-800">${order.orderAmount}.00 USDT</span>
                    </div>
                  </div>
                </div>

                <div className="text-right sm:border-l sm:border-gray-100 sm:pl-6 shrink-0 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
                  <div>
                    <div className="text-[10px] text-gray-400 font-medium">Commission Earned</div>
                    <div className="text-sm font-extrabold text-[#00A651]">
                      +{order.commissionEarned.toFixed(2)} USDT
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 mt-1">
                    Completed
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
