import React from 'react';
import { Home, ShoppingBag, FileText, Headphones, User } from 'lucide-react';
import { NavigationTab } from '../types';

interface BottomNavBarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const navItems = [
    { id: 'home' as NavigationTab, label: 'Home', icon: Home },
    { id: 'earn' as NavigationTab, label: 'Earn', icon: ShoppingBag },
    { id: 'records' as NavigationTab, label: 'Records', icon: FileText },
    { id: 'support' as NavigationTab, label: 'Support', icon: Headphones },
    { id: 'account' as NavigationTab, label: 'Account', icon: User },
  ];

  return (
    <div
      id="bottom-nav-bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] select-none"
    >
      <div className="max-w-md md:max-w-lg mx-auto flex items-center justify-around px-2 py-1.5 sm:py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              id={`nav-btn-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-2xl transition-all duration-200 relative ${
                isActive
                  ? 'text-[#00A651] font-extrabold scale-105'
                  : 'text-gray-400 hover:text-gray-600 font-medium'
              }`}
            >
              {/* Active Pill Glow Indicator */}
              {isActive && (
                <span className="absolute -top-1 w-6 h-1 bg-[#00A651] rounded-full shadow-sm shadow-emerald-500/50 animate-in fade-in zoom-in-50 duration-200" />
              )}

              <div
                className={`p-1 rounded-xl transition-colors ${
                  isActive ? 'bg-emerald-50 text-[#00A651]' : 'text-gray-400'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'
                  }`}
                />
              </div>
              <span className="text-[11px] leading-tight tracking-tight mt-0.5 whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
