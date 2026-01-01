import React from "react";
import { useChatLimit } from "@/hooks/useChatLimit";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";

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
    <div className="border-b-4 border-black bg-yellow-200 p-4">
      <div className="max-w-xl mx-auto relative flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-center md:text-left">
          <p className="text-black font-black text-base leading-snug uppercase tracking-wide">
            You only get 5 free chats
          </p>
        </div>
        <div className="flex items-center gap-3 pr-2 md:pr-8 mr-4">
          <button
            onClick={() => router.push("/login")}
            className="font-bold text-sm bg-purple-500 text-white border-2 border-black cursor-pointer px-4 py-2 hover:bg-purple-600 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none transition-all"
          >
            Sign in for unlimited
          </button>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-2 md:top-1/2 md:transform md:-translate-y-1/2 p-1.5 text-black hover:bg-black hover:text-white border-2 border-transparent hover:border-black transition-all z-10"
          title="Dismiss banner"
        >
          <FiX size={20} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
