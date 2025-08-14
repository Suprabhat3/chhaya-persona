// app/history/page.tsx  (or your path)
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/component/ProtectedRoute';
import { supabase } from '@/lib/supabase';

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
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

const HistoryPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  /* -------- View full chat drawer -------- */
  const [viewingConversationId, setViewingConversationId] = useState<string | null>(null);
  const [viewMessages, setViewMessages] = useState<Message[]>([]);
  const [viewLoading, setViewLoading] = useState(false);

  const openView = async (id: string) => {
    setViewingConversationId(id);
    setViewLoading(true);
    const { data } = await supabase
      .from('messages')
      .select('id, role, content, created_at')
      .eq('conversation_id', id)
      .order('created_at', { ascending: true });
    setViewMessages((data as Message[]) || []);
    setViewLoading(false);
  };
  const closeView = () => {
    setViewingConversationId(null);
    setViewMessages([]);
  };

  /* -------- Fetch real conversations -------- */
  useEffect(() => {
    if (!user) return;
    const fetchChatHistory = async () => {
      setLoading(true);
      const { data: convData, error: convError } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (convError) {
        console.error(convError);
        setLoading(false);
        return;
      }

      const enriched = await Promise.all(
        (convData || []).map(async (c) => {
          const { count } = await supabase
            .from('messages')
            .select('*', { head: true, count: 'exact' })
            .eq('conversation_id', c.id);

          const { data: msgData } = await supabase
            .from('messages')
            .select('content')
            .eq('conversation_id', c.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          return {
            id: c.id,
            title: c.title,
            persona: c.persona_key,
            last_message: msgData?.content || '',
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

  /* -------- Filtering -------- */
  const filteredSessions = chatSessions.filter((s) => {
    const ok = (s.title + s.persona + s.last_message).toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedFilter === 'recent') {
      const week = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return ok && new Date(s.updated_at) > week;
    }
    return ok;
  });

  const formatDate = (d: string) => {
    const date = new Date(d);
    const days = Math.floor((Date.now() - date.getTime()) / 864e5);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days <= 7) return `${days} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getPersonaColor = (name: string) =>
    ['from-purple-500 to-pink-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-orange-500 to-red-500', 'from-indigo-500 to-purple-500'][
      name.length % 5
    ];

  const handleDeleteChat = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Delete this conversation?')) return;
    await supabase.from('conversations').delete().eq('id', id);
    setChatSessions((prev) => prev.filter((c) => c.id !== id));
    if (viewingConversationId === id) closeView();
  };

  /* -------- Render -------- */
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <img src="/favicon.ico" alt="Logo" className="rounded" />
              </div>
              <span className="text-xl font-bold text-gray-900">Chhaya Persona</span>
            </Link>
            <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900 transition-colors">
              ← Back
            </button>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Chat History</h1>
            <p className="text-gray-600">Your conversations with AI powered Persona</p>
          </div>

          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-8 border border-white/30">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-gray-900 w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-white"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`px-6 py-3 rounded-full font-medium transition-colors ${
                    selectedFilter === 'all' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedFilter('recent')}
                  className={`px-6 py-3 rounded-full font-medium transition-colors ${
                    selectedFilter === 'recent' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Recent
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/90 rounded-2xl p-6 border border-white/30 animate-pulse">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                      <div className="h-3 bg-gray-200 rounded w-1/4" />
                      <div className="h-3 bg-gray-200 rounded w-2/3" />
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
                  className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-white/30 hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${getPersonaColor(
                        session.persona
                      )} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}
                    >
                      {session.persona
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .substring(0, 2)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">{session.title}</h3>
                          <p className="text-sm text-purple-600 font-medium">with {session.persona}</p>
                        </div>
                        <div className="text-right text-sm text-gray-500 flex-shrink-0 ml-4">
                          <p>{formatDate(session.updated_at)}</p>
                          <p>{session.message_count} messages</p>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">{session.last_message}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Last active {formatDate(session.updated_at)}</span>
                        </div>

                        <button
                          onClick={(e) => handleDeleteChat(session.id, e)}
                          className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all rounded-full hover:bg-red-50"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? 'No conversations found' : 'No chat history yet'}
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm
                  ? 'Try adjusting your search terms or filters.'
                  : 'Start your first conversation with a historical figure to see your chat history here.'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => router.push('/chat')}
                  className="group relative transform transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <div className="absolute inset-0 bg-black/20 rounded-full transform translate-y-1 group-hover:translate-y-0.5 transition-transform duration-150"></div>
                  <div className="relative bg-gradient-to-b from-pink-400 to-pink-500 hover:from-pink-300 hover:to-pink-400 text-white px-8 py-4 rounded-full font-medium text-lg border border-pink-300/50 shadow-sm">
                    Start Your First Chat
                  </div>
                </button>
              )}
            </div>
          )}
        </main>

        {/* Full-Chat Drawer */}
        {viewingConversationId && (
          <div
            className="fixed inset-0 bg-black/50 z-40 flex items-end animate-fade-in"
            onClick={closeView}
          >
            <div
              className="w-full h-[80vh] bg-white rounded-t-3xl shadow-2xl flex flex-col animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h2 className="text-xl font-bold text-gray-900">Conversation</h2>
                <button onClick={closeView} className="p-2 text-gray-500 hover:text-black rounded-full">
                  ✕
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {!viewLoading &&
                  viewMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3 rounded-2xl max-w-[80%] text-sm ${
                        msg.role === 'user'
                          ? 'ml-auto bg-gradient-to-r from-pink-300 to-purple-400 text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      {/*  CSS-rich content wrapper  */}
                      <div
                        className="prose prose-sm max-w-none prose-p:text-sm prose-headings:font-bold prose-strong:text-purple-600 prose-code:bg-gray-200 prose-code:px-1 prose-code:py-0.5 prose-code:rounded text-black"
                        dangerouslySetInnerHTML={{ __html: msg.content }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8">
          <button
            onClick={() => router.push('/chat')}
            className="group relative transform transition-all duration-150 hover:-translate-y-1 active:translate-y-0"
          >
            <div className="absolute inset-0 bg-black/20 rounded-full transform translate-y-1 group-hover:translate-y-0.5 transition-transform duration-150"></div>
            <div className="relative w-16 h-16 bg-gradient-to-b from-purple-400 to-purple-500 hover:from-purple-300 hover:to-purple-400 text-white rounded-full flex items-center justify-center border border-purple-300/50 shadow-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </button>
        </div>

        <style jsx global>{`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slide-up {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.2s ease-out; }
          .animate-slide-up { animation: slide-up 0.3s ease-out; }
        `}</style>
      </div>
    </ProtectedRoute>
  );
};

export default HistoryPage;