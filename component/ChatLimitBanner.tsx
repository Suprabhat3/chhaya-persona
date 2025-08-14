import React from 'react';
import { useChatLimit } from '@/hooks/useChatLimit';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { FiClock, FiUser, FiX } from 'react-icons/fi';

export function ChatLimitBanner() {
  const { user } = useAuth();
  const { remainingChats, chatLimit, isLimitReached, chatCount } = useChatLimit();
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(true);

  // Don't show banner if user is logged in
  if (user) return null;

  // Don't show banner if dismissed
  if (!isVisible) return null;

  // Don't show banner if limit is reached (handled by main component)
  if (isLimitReached) return null;

  const progressPercentage = (chatCount / chatLimit) * 100;
  const isNearLimit = remainingChats <= 2;

  return (
    <div className={`border-b transition-all duration-300 ${
      isNearLimit 
        ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200' 
        : 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200'
    } p-3`}>
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-amber-800">
            <FiClock className={isNearLimit ? "text-red-600" : "text-amber-600"} />
            <span className="text-sm font-medium">
              {remainingChats} free {remainingChats === 1 ? 'chat' : 'chats'} remaining
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            <div className="w-16 h-2 bg-white/50 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  isNearLimit ? 'bg-red-500' : 'bg-amber-500'
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-xs text-gray-600">
              {chatCount}/{chatLimit}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
            <button
              onClick={() => router.push('/login')}
              className={`flex items-center gap-2 text-white rounded-full font-medium transition-all duration-200 shadow-sm hover:shadow-md sm:text-sm sm:px-4 sm:py-2 text-xs px-3 py-1.5 ${
                isNearLimit
                  ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
              }`}
            >
              <FiUser className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isNearLimit ? 'Sign In Now!' : 'Sign In for Unlimited'}
              </span>
              <span className="sm:hidden">Sign In</span>
            </button>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FiX size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}