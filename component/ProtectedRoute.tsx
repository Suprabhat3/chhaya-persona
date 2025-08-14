import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useChatLimit } from '@/hooks/useChatLimit';
import { useRouter } from 'next/navigation';
import { FiLock, FiMessageCircle, FiUser } from 'react-icons/fi';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const { isLimitReached, remainingChats, chatLimit } = useChatLimit();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not logged in and has reached chat limit
  if (!user && isLimitReached) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50 p-4">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100 p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiLock className="text-white text-2xl" />
          </div>
          
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-4">
            Chat Limit Reached
          </h2>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            You've used all {chatLimit} free chats! Sign up to continue enjoying unlimited conversations with AI personas.
          </p>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-6 border border-purple-100">
            <div className="flex items-center justify-center gap-2 text-purple-700 mb-2">
              <FiMessageCircle />
              <span className="font-semibold">Free Chats Used</span>
            </div>
            <div className="text-2xl font-bold text-purple-800">{chatLimit}/{chatLimit}</div>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => router.push('/login')}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <FiUser />
              Sign In to Continue
            </button>
            
            <button
              onClick={() => router.push('/signup')}
              className="w-full bg-white hover:bg-gray-50 text-purple-600 py-3 px-6 rounded-xl font-semibold transition-all duration-200 border-2 border-purple-200 hover:border-purple-300"
            >
              Create Free Account
            </button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-purple-100">
            <h3 className="font-semibold text-gray-800 mb-3">Why sign up?</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Unlimited AI conversations</li>
              <li>• Save your chat history</li>
              <li>• Access all AI personas</li>
              <li>• Sync across devices</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
