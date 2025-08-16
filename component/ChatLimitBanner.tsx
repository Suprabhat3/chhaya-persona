import React from 'react';
import { useChatLimit } from '@/hooks/useChatLimit';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { FiX } from 'react-icons/fi';

export function ChatLimitBanner() {
  const { user } = useAuth();
  const { remainingChats, isLimitReached, isLoading } = useChatLimit();
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(true);

  if (user) return null;
  if (!isVisible) return null;
  if (isLimitReached) return null;
  if (isLoading) return null;

  return (
    <div className="border-b bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 p-4">
      <div className="max-w-xl mx-auto relative flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-center md:text-left">
          <p className="text-purple-800 font-semibold text-base leading-snug">
            You only get 5 free chats
          </p>
        </div>
        <div className="flex items-center gap-3 pr-2 md:pr-8">
          <button
            onClick={() => router.push('/login')}
            className="font-semibold text-sm bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white cursor-pointer px-4 py-2 rounded-full transition-all"
          >
            Sign in for unlimited
          </button>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-2 md:top-1/2 md:transform md:-translate-y-1/2 p-1.5 text-gray-500 hover:text-gray-700 rounded-full transition-colors z-10"
          title="Dismiss banner"
        >
          <FiX size={16} />
        </button>
      </div>
    </div>
  );
}