"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/component/ProtectedRoute";
import { supabase } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Components } from "react-markdown";
import {
  FiCopy,
  FiCheck,
  FiTrash2,
  FiX,
  FiMessageSquare,
  FiClock,
  FiUser,
} from "react-icons/fi";
import Navbar from "@/component/navbar";

interface ChatSession {
  id: string;
  title: string;
  persona: string;
  last_message: string;
  created_at: string;
  updated_at: string;
  message_count: number;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

const CodeBlockWithCopy: React.FC<{
  code: string;
  language: string;
  className?: string;
}> = ({ code, language, className }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      className="relative group w-full my-2 max-w-full overflow-x-auto bg-gray-900 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 z-20 p-2 bg-cyan-400 hover:bg-cyan-300 text-black font-bold border-2 border-black transition-all flex items-center gap-1 text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
        title="Copy code"
      >
        {copied ? (
          <FiCheck size={14} strokeWidth={3} />
        ) : (
          <FiCopy size={14} strokeWidth={3} />
        )}
        <span className="hidden xs:inline text-xs uppercase">
          {copied ? "Copied!" : "Copy"}
        </span>
      </button>
      <div
        className="w-full overflow-x-auto"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          PreTag="div"
          className="!bg-transparent !p-2 !m-0 text-xs md:!p-3"
          customStyle={{
            margin: 0,
            padding: "0.5rem",
            background: "transparent",
            fontSize: "0.75rem",
            lineHeight: "1.3",
            fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace",
            minWidth: "100%",
            width: "auto",
            overflowX: "auto",
            whiteSpace: "pre",
            wordBreak: "break-word",
          }}
          codeTagProps={{
            style: {
              fontSize: "0.75rem",
              lineHeight: "1.3",
              fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace",
              whiteSpace: "pre",
              display: "block",
              wordBreak: "break-word",
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const MarkdownRenderer = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const components: Components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      const codeString = String(children).replace(/\n$/, "");

      return !inline && match ? (
        <div className="w-full max-w-full my-3">
          <CodeBlockWithCopy code={codeString} language={match[1]} />
        </div>
      ) : (
        <code
          className={`px-1.5 py-0.5 text-xs md:text-sm font-mono break-all border-2 border-black font-bold ${
            role === "user"
              ? "bg-yellow-200 text-black"
              : "bg-pink-200 text-black"
          }`}
          {...props}
        >
          {children}
        </code>
      );
    },
    h1: ({ children }) => (
      <h1
        className={`text-lg md:text-xl font-black mt-4 mb-3 break-words uppercase ${
          role === "user" ? "text-black" : "text-black"
        }`}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className={`text-base md:text-lg font-black mt-4 mb-2 break-words uppercase ${
          role === "user" ? "text-black" : "text-black"
        }`}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className={`text-sm md:text-base font-black mt-3 mb-2 break-words uppercase ${
          role === "user" ? "text-black" : "text-black"
        }`}
      >
        {children}
      </h3>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-1 my-2 pl-2 break-words font-bold">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-1 my-2 pl-2 break-words font-bold">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="break-words text-sm md:text-base font-medium text-black">
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className={`border-l-4 pl-4 font-bold italic my-3 py-2 break-words ${
          role === "user"
            ? "border-black bg-yellow-100"
            : "border-black bg-pink-100"
        }`}
      >
        {children}
      </blockquote>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-4 decoration-cyan-400 hover:bg-cyan-400 text-black transition-all font-black break-all"
      >
        {children}
      </a>
    ),
    p: ({ children }) => (
      <p className="leading-relaxed my-2 break-words text-sm md:text-base font-medium text-black">
        {children}
      </p>
    ),
  };

  return (
    <div className="prose prose-sm max-w-none overflow-hidden">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
};

const HistoryPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewingConversationId, setViewingConversationId] = useState<
    string | null
  >(null);
  const [viewMessages, setViewMessages] = useState<Message[]>([]);
  const [viewLoading, setViewLoading] = useState(false);

  const openView = async (id: string) => {
    setViewingConversationId(id);
    setViewLoading(true);
    const { data } = await supabase
      .from("messages")
      .select("id, role, content, created_at")
      .eq("conversation_id", id)
      .order("created_at", { ascending: true });
    setViewMessages((data as Message[]) || []);
    setViewLoading(false);
  };

  const closeView = () => {
    setViewingConversationId(null);
    setViewMessages([]);
  };

  useEffect(() => {
    if (!user) return;
    const fetchChatHistory = async () => {
      setLoading(true);
      const { data: convData, error: convError } = await supabase
        .from("conversations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (convError) {
        console.error(convError);
        setLoading(false);
        return;
      }

      const enriched = await Promise.all(
        (convData || []).map(async (c) => {
          const { count } = await supabase
            .from("messages")
            .select("*", { head: true, count: "exact" })
            .eq("conversation_id", c.id);

          const { data: msgData } = await supabase
            .from("messages")
            .select("content")
            .eq("conversation_id", c.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();

          return {
            id: c.id,
            title: c.title,
            persona: c.persona_key,
            last_message: msgData?.content || "",
            created_at: c.created_at,
            updated_at: c.created_at,
            message_count: count || 0,
          } as ChatSession;
        })
      );
      setChatSessions(enriched);
      setLoading(false);
    };
    fetchChatHistory();
  }, [user]);

  const filteredSessions = chatSessions.filter((s) => {
    const ok = (s.title + s.persona + s.last_message)
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (selectedFilter === "recent") {
      const week = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return ok && new Date(s.updated_at) > week;
    }
    return ok;
  });

  const formatDate = (d: string) => {
    const date = new Date(d);
    const days = Math.floor((Date.now() - date.getTime()) / 864e5);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days <= 7) return `${days} days ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDeleteChat = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Delete this conversation?")) return;
    await supabase.from("conversations").delete().eq("id", id);
    setChatSessions((prev) => prev.filter((c) => c.id !== id));
    if (viewingConversationId === id) closeView();
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-yellow-50">
        <Navbar />

        <main className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 pt-24 md:pt-28">
          {/* Page Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter mb-4">
              Chat History
            </h1>
            <div className="inline-block bg-white border-4 border-black px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-black font-bold uppercase text-sm">
                Your AI Conversations
              </p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6 mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="SEARCH CONVERSATIONS..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border-4 border-black font-bold placeholder-black/50 focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all text-sm text-black"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedFilter("all")}
                  className={`px-4 md:px-6 py-3 font-black text-xs md:text-sm border-4 border-black transition-all ${
                    selectedFilter === "all"
                      ? "bg-pink-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white text-black hover:bg-yellow-100"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedFilter("recent")}
                  className={`px-4 md:px-6 py-3 font-black text-xs md:text-sm border-4 border-black transition-all ${
                    selectedFilter === "recent"
                      ? "bg-cyan-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white text-black hover:bg-yellow-100"
                  }`}
                >
                  Recent
                </button>
              </div>
            </div>
          </div>

          {/* Chat Sessions */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white border-4 border-black p-4 md:p-6 animate-pulse"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-200 border-2 border-black" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 w-1/3" />
                      <div className="h-3 bg-gray-200 w-1/4" />
                      <div className="h-3 bg-gray-200 w-2/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredSessions.length > 0 ? (
            <div className="space-y-4">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => openView(session.id)}
                  className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6 transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-pink-400 border-4 border-black flex items-center justify-center text-black font-black flex-shrink-0">
                      <FiUser size={24} strokeWidth={3} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-black text-black text-sm md:text-base truncate uppercase">
                            {session.title}
                          </h3>
                          <p className="text-xs md:text-sm text-black/70 font-bold">
                            WITH {session.persona.toUpperCase()}
                          </p>
                        </div>
                        <div className="text-right text-xs md:text-sm text-black/70 font-bold flex-shrink-0 ml-4">
                          <p>{formatDate(session.updated_at)}</p>
                          <p>{session.message_count} MSGS</p>
                        </div>
                      </div>

                      <div className="text-black/70 text-xs md:text-sm line-clamp-2 mb-3 font-medium overflow-hidden">
                        <MarkdownRenderer
                          content={session.last_message}
                          role="assistant"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-black/70 font-bold">
                          <FiClock size={14} strokeWidth={3} />
                          <span className="uppercase">
                            {formatDate(session.updated_at)}
                          </span>
                        </div>

                        <button
                          onClick={(e) => handleDeleteChat(session.id, e)}
                          className="opacity-0 group-hover:opacity-100 p-2 text-black hover:text-red-600 transition-all bg-white border-2 border-black hover:bg-red-100"
                        >
                          <FiTrash2 size={16} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-16 px-4">
              <div className="w-24 h-24 bg-pink-300 border-4 border-black mx-auto mb-6 flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <FiMessageSquare
                  className="w-12 h-12 text-black"
                  strokeWidth={3}
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-black mb-4 uppercase">
                {searchTerm ? "No conversations found" : "No chat history yet"}
              </h3>
              <p className="text-black/70 font-bold mb-6 max-w-md mx-auto text-sm md:text-base uppercase">
                {searchTerm
                  ? "Try different search terms"
                  : "Start your first conversation"}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => router.push("/persona")}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black border-4 border-black px-8 py-4 font-black uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all"
                >
                  Start Chatting
                </button>
              )}
            </div>
          )}
        </main>

        {/* Full-Chat Drawer */}
        {viewingConversationId && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-end"
            onClick={closeView}
          >
            <div
              className="w-full h-[85vh] md:h-[80vh] bg-yellow-50 border-t-4 border-black flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b-4 border-black bg-white flex-shrink-0">
                <h2 className="text-lg md:text-xl font-black text-black uppercase">
                  Conversation
                </h2>
                <button
                  onClick={closeView}
                  className="p-2 text-black bg-white border-4 border-black hover:bg-red-100 transition-colors"
                >
                  <FiX size={24} strokeWidth={3} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4 space-y-4 min-h-0">
                {viewLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="w-12 h-12 border-4 border-black border-t-transparent animate-spin" />
                  </div>
                ) : (
                  viewMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-[90%] md:max-w-[85%] ${
                        msg.role === "user"
                          ? "ml-auto bg-green-400 text-black"
                          : "bg-white text-black"
                      }`}
                    >
                      <div className="overflow-hidden w-full">
                        <MarkdownRenderer
                          content={msg.content}
                          role={msg.role}
                        />
                      </div>
                      <p className="text-xs mt-2 font-bold text-black/70 uppercase">
                        {new Date(msg.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8">
          <button
            onClick={() => router.push("/persona")}
            className="w-16 h-16 bg-pink-400 hover:bg-pink-300 border-4 border-black text-black flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all"
          >
            <span className="text-3xl font-black">+</span>
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default HistoryPage;
