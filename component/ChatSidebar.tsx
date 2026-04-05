"use client";
import React from "react";
import {
  FiPlus,
  FiTrash2,
  FiMessageSquare,
  FiUser,
  FiArrowLeft,
  FiX,
} from "react-icons/fi";
import { useRouter } from "next/navigation";

interface PersonaData {
  key: string;
  name: string;
  role: string;
  personality: string;
  image: string;
  communicationStyle: string;
  tone: string;
  expertise: string;
  additionalContext: string;
}

interface Conversation {
  id: string;
  title: string;
  persona_key: string;
  created_at: string;
}

interface ChatSidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  selectedPersona: PersonaData | null;
  conversations: Conversation[];
  activeConversationId: string | null;
  user: any;
  onNewChat: () => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onBackToPersonas: () => void;
  onSignOut: () => void;
  onClose: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  isOpen,
  isMobile,
  selectedPersona,
  conversations,
  activeConversationId,
  user,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
  onBackToPersonas,
  onSignOut,
  onClose,
}) => {
  const router = useRouter();

  const sidebarContent = (
    <div className="flex-1 flex flex-col min-h-0 h-full">
      <div className="p-4 md:p-6 flex-shrink-0 border-b-4 border-black bg-yellow-100">
        <div
          className="flex items-center gap-3 mb-6  cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="w-10 h-10 bg-black border-2 border-black flex items-center justify-center rounded-md">
            <img src="/favicon.ico" alt="Logo" className="w-6 h-6" />
          </div>
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-black">
            Chhaya Persona
          </h1>
        </div>

        {selectedPersona && (
          <div className="bg-white border-4 border-black p-4 mb-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={selectedPersona.image}
                alt={selectedPersona.name}
                className="w-12 h-12 object-cover border-4 border-black"
              />
              <div>
                <h3 className="font-black text-black text-sm uppercase leading-tight">
                  {selectedPersona.name}
                </h3>
                <p className="text-xs text-black/70 font-bold mt-0.5">
                  {selectedPersona.role}
                </p>
              </div>
            </div>
            <button
              onClick={onBackToPersonas}
              className="flex items-center gap-1 text-xs text-black font-bold hover:underline transition-all cursor-pointer"
            >
              <FiArrowLeft size={12} strokeWidth={3} />
              <span>CHANGE PERSONA</span>
            </button>
          </div>
        )}

        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 bg-pink-400 border-4 border-black text-black font-black uppercase py-3 px-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all cursor-pointer"
        >
          <FiPlus className="text-lg" strokeWidth={3} /> New Chat
        </button>
      </div>

      {user && (
        <>
          <div className="flex-1 min-h-0 p-4 md:p-6 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <FiMessageSquare className="text-black" strokeWidth={3} />
                <p className="text-black font-black text-sm">
                  Past {selectedPersona?.name} Chats
                </p>
              </div>
            </div>
            <div className="overflow-y-auto flex-1 min-h-0 space-y-2">
              {conversations
                .filter(
                  (c) =>
                    selectedPersona && c.persona_key === selectedPersona.key
                )
                .map((c) => (
                  <div
                    key={c.id}
                    className={`flex items-center justify-between p-3 border-2 border-black cursor-pointer transition-all ${
                      activeConversationId === c.id
                        ? "bg-cyan-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-white hover:bg-yellow-100 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    }`}
                    onClick={() => onSelectConversation(c.id)}
                  >
                    <span className="truncate flex-1 font-bold text-black text-sm">
                      {c.title}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteConversation(c.id);
                      }}
                      className="text-black hover:text-red-600 p-1 transition-colors cursor-pointer"
                    >
                      <FiTrash2 size={16} strokeWidth={3} />
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <div className="p-4 md:p-6 border-t-4 border-black bg-green-300 flex-shrink-0">
            <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-black border-2 border-black flex items-center justify-center rounded-md">
                  <FiUser className="text-white text-sm" strokeWidth={3} />
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-black text-sm uppercase">
                    {user.user_metadata?.full_name ||
                      user.email?.split("@")[0] ||
                      "User"}
                  </h3>
                  <p className="text-xs text-black/70 font-bold text-green-600">
                    PREMIUM
                  </p>
                </div>
              </div>
              <button
                onClick={onSignOut}
                className="w-full bg-black text-white py-2 px-3 font-black uppercase text-xs border-2 border-black hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}

      {!user && (
        <div className="p-4 md:p-6 border-t-4 border-black bg-yellow-200 flex-shrink-0">
          <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-black text-black text-sm mb-2 uppercase">
              Sign in Required
            </h3>
            <p className="text-xs text-black/80 font-bold mb-3">
              Save chats, unlimited messages & more
            </p>
            <button
              onClick={() => router.push("/login")}
              className="w-full bg-black text-white hover:bg-gray-800 py-2 px-3 text-xs font-black uppercase transition-colors border-2 border-black cursor-pointer"
            >
              Sign In Now
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <>
        <div
          className={`md:hidden fixed inset-y-0 left-0 z-40 w-[90vw] max-w-sm transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out bg-yellow-50 border-r-4 border-black flex flex-col h-full overflow-hidden`}
        >
          <div className="p-4 flex items-center justify-between border-b-4 border-black bg-white flex-shrink-0">
            <h2 className="font-black text-black uppercase">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
              aria-label="Close sidebar"
            >
              <FiX size={20} strokeWidth={3} />
            </button>
          </div>
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
            {sidebarContent}
          </div>
        </div>
        {isOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/60 z-30"
            onClick={onClose}
          />
        )}
      </>
    );
  }

  return (
    <aside
      className={`hidden md:flex flex-col z-30 overflow-hidden
        ${isOpen ? "w-80" : "w-0"} transition-[width] duration-300 ease-in-out
        bg-yellow-50 border-r-4 border-black`}
    >
      {sidebarContent}
    </aside>
  );
};
