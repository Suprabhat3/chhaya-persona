import { ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useChatLimit } from "@/hooks/useChatLimit";
import { useRouter } from "next/navigation";
import { FiLock, FiMessageCircle, FiUser } from "react-icons/fi";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const { isLimitReached, remainingChats, chatLimit } = useChatLimit();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-purple-600 rounded-none animate-spin mx-auto mb-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
          <p className="text-black font-black uppercase text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not logged in and has reached chat limit
  if (!user && isLimitReached) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50 p-4">
        <div className="max-w-md w-full bg-white border-4 border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="w-16 h-16 bg-purple-500 border-4 border-black flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <FiLock className="text-white text-3xl" strokeWidth={3} />
          </div>

          <h2 className="text-3xl font-black text-black mb-4 uppercase">
            Chat Limit Reached
          </h2>

          <p className="text-black font-medium mb-6 leading-relaxed">
            You've used all {chatLimit} free chats! Sign up to continue enjoying
            unlimited conversations with AI personas.
          </p>

          <div className="bg-yellow-200 border-4 border-black p-4 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-center gap-2 text-black mb-2">
              <FiMessageCircle strokeWidth={3} />
              <span className="font-black uppercase">Free Chats Used</span>
            </div>
            <div className="text-3xl font-black text-black">
              {chatLimit}/{chatLimit}
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => router.push("/login")}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 font-black border-2 border-black transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none flex items-center justify-center gap-2 uppercase"
            >
              <FiUser strokeWidth={3} />
              Sign In to Continue
            </button>

            <button
              onClick={() => router.push("/signup")}
              className="w-full bg-white hover:bg-gray-50 text-black py-3 px-6 font-black border-2 border-black transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none uppercase"
            >
              Create Free Account
            </button>
          </div>

          <div className="mt-8 pt-6 border-t-4 border-black">
            <h3 className="font-black text-black mb-3 uppercase">
              Why sign up?
            </h3>
            <ul className="text-sm text-black font-bold space-y-2 text-left pl-8 list-disc marker:text-purple-500">
              <li>Unlimited AI conversations</li>
              <li>Save your chat history</li>
              <li>Access all AI personas</li>
              <li>Sync across devices</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
