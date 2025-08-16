"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { FiPlus, FiSend, FiTrash2, FiMessageSquare, FiUser, FiCopy, FiCheck, FiArrowLeft, FiClock, FiMenu, FiX, FiChevronLeft, FiChevronRight, FiCode, FiChevronDown } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Components } from "react-markdown";
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useChatLimit } from '@/hooks/useChatLimit';
import { ChatLimitBanner } from '@/component/ChatLimitBanner';

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

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

type ModelType = 'gemini' | 'gpt' | 'groq';

interface ModelOption {
  value: ModelType;
  label: string;
  description: string;
}

const modelOptions: ModelOption[] = [
  { value: 'gemini', label: 'Gemini', description: 'Google\'s advanced AI model' },
  { value: 'gpt', label: 'GPT', description: 'OpenAI\'s powerful language model' },
  { value: 'groq', label: 'Groq', description: 'Ultra-fast inference AI model' }
];

const CodeBlockWithCopy: React.FC<{ code: string; language: string; className?: string }> = ({ code, language, className }) => {
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
    <div className="relative group w-full my-2 max-w-full overflow-x-auto rounded-lg bg-gray-900" style={{ WebkitOverflowScrolling: 'touch' }}>
      <button 
        onClick={copyToClipboard} 
        className="absolute top-2 right-2 z-20 p-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-md transition-all duration-200 flex items-center gap-1 text-xs"
        title="Copy code"
      >
        {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
        <span className="hidden xs:inline text-xs">
          {copied ? "Copied!" : "Copy"}
        </span>
      </button>
      <div className="w-full overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
        <SyntaxHighlighter 
          style={vscDarkPlus} 
          language={language} 
          PreTag="div" 
          className="!bg-transparent !p-2 !m-0 text-xs md:!p-3"
          customStyle={{
            margin: 0,
            padding: '0.5rem',
            background: 'transparent',
            fontSize: '0.75rem',
            lineHeight: '1.3',
            fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace',
            minWidth: '100%',
            width: 'auto',
            overflowX: 'auto',
            whiteSpace: 'pre',
            wordBreak: 'break-word',
          }}
          codeTagProps={{
            style: {
              fontSize: '0.75rem',
              lineHeight: '1.3',
              fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace',
              whiteSpace: 'pre',
              display: 'block',
              wordBreak: 'break-word',
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const MarkdownMessage: React.FC<{ content: string; isUser: boolean }> = ({ content, isUser }) => {
  if (isUser) return <div className="whitespace-pre-wrap break-words">{content}</div>;
  
  const components: Components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      const codeString = String(children).replace(/\n$/, "");
      return !inline && match ? (
        <div className="w-full max-w-full overflow-hidden">
          <CodeBlockWithCopy code={codeString} language={match[1]} />
        </div>
      ) : (
        <code
          className="bg-gray-200 px-1 py-0.5 rounded font-mono text-xs break-all whitespace-pre-wrap"
          {...props}
        >
          {children}
        </code>
      );
    },
    h1: ({ children }) => <h1 className="text-xl font-bold text-gray-800 mt-4 mb-2 break-words">{children}</h1>,
    h2: ({ children }) => <h2 className="text-lg font-semibold text-gray-800 mt-4 mb-2 break-words">{children}</h2>,
    h3: ({ children }) => <h3 className="text-base font-semibold text-gray-800 mt-3 mb-2 break-words">{children}</h3>,
    ul: ({ children }) => <ul className="list-disc list-inside space-y-1 my-2 break-words">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 my-2 break-words">{children}</ol>,
    li: ({ children }) => <li className="text-gray-700 break-words">{children}</li>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-purple-300 pl-4 italic text-gray-600 my-2 break-words">{children}</blockquote>,
    a: ({ children, href }) => (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-purple-600 underline hover:text-purple-800 hover:bg-purple-50 transition-all duration-200 px-1 py-0.5 rounded-md font-medium"
      >
        {children}
      </a>
    ),
  };
  
  return (
    <div className="prose prose-sm max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-800 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm overflow-hidden">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
};

/* ---------- MessageCopyButton ---------- */
const MessageCopyButton: React.FC<{ text: string; isAssistant: boolean }> = ({ text, isAssistant }) => {
  const [copied, setCopied] = useState(false);
  
  // Don't show copy button for user messages
  if (!isAssistant) return null;
  
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };
  
  return (
    <button
      onClick={copy}
      className="text-gray-400 hover:text-purple-600 transition-colors p-1.5 rounded-md hover:bg-purple-50 flex items-center gap-1"
      aria-label="Copy message"
      title="Copy response"
    >
      {copied ? (
        <>
          <FiCheck size={14} className="text-green-600" />
          <span className="text-xs text-green-600">Copied!</span>
        </>
      ) : (
        <>
          <FiCopy size={14} />
          <span className="text-xs">Copy</span>
        </>
      )}
    </button>
  );
};

/* ---------- ModelSelector ---------- */
const ModelSelector: React.FC<{ selectedModel: ModelType; onModelChange: (model: ModelType) => void }> = ({ 
  selectedModel, 
  onModelChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedOption = modelOptions.find(option => option.value === selectedModel)!;
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-lg hover:bg-white transition-colors text-sm"
      >
        <span className="font-medium text-gray-700">{selectedOption.label}</span>
        <FiChevronDown size={16} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-1 w-64 bg-white rounded-lg border border-purple-200 shadow-lg z-20 overflow-hidden">
            {modelOptions.map(option => (
              <button
                key={option.value}
                onClick={() => {
                  onModelChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 hover:bg-purple-50 transition-colors ${
                  selectedModel === option.value ? 'bg-purple-100 border-l-4 border-purple-500' : ''
                }`}
              >
                <div className="font-medium text-gray-800">{option.label}</div>
                <div className="text-xs text-gray-600 mt-0.5">{option.description}</div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/* ---------- Main ChatApp ---------- */
const ChatApp: React.FC = () => {
  const router = useRouter();
  const { user, session, signOut } = useAuth();
  const { remainingChats, isLimitReached, incrementChatCount, resetChatCount } = useChatLimit();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<PersonaData | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelType>('gemini');
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  /* ---- Auth & initial load ---- */
  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  };

  const loadConversations = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (!error && data) setConversations(data);
  }, []);

  const loadMessages = useCallback(async (conversationId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    if (!error && data) {
      setMessages(data.map((m: any) => ({ id: m.id, role: m.role as "user" | "assistant", content: m.content })));
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('selectedPersona');
    if (stored) {
      try { setSelectedPersona(JSON.parse(stored)); } catch { /* ignore */ }
    }
    
    // Load selected model from localStorage
    const storedModel = localStorage.getItem('selectedModel') as ModelType;
    if (storedModel && modelOptions.some(option => option.value === storedModel)) {
      setSelectedModel(storedModel);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (!user) return;
      await loadConversations(user.id);
      if (conversations.length > 0) {
        setActiveConversationId(conversations[0].id);
        await loadMessages(conversations[0].id);
      }
    })();
  }, [user, loadConversations, loadMessages]);

  useEffect(() => {
    if (user) {
      resetChatCount();
    } else {
      setConversations([]);
      setMessages([]);
      setActiveConversationId(null);
    }
  }, [user, resetChatCount]);

  useEffect(() => { 
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); 
  }, [messages]);

  /* Responsive handling */
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileSidebarOpen(false);
        // For non-users on desktop, keep sidebar closed by default
        if (!user) {
          setSidebarOpen(false);
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [user]);

  /* ---- Model change handler ---- */
  const handleModelChange = (model: ModelType) => {
    setSelectedModel(model);
    localStorage.setItem('selectedModel', model);
  };

  /* ---- Save helpers ---- */
  const upsertConversation = async (title: string, personaKey: string) => {
    if (!user) return null;
    const { data, error } = await supabase
      .from('conversations')
      .insert({ user_id: user.id, title, persona_key: personaKey })
      .select()
      .single();
    if (error) { console.error(error); return null; }
    return data.id;
  };

  const saveMessage = async (conversationId: string, role: "user" | "assistant", content: string) => {
    if (user) {
      await supabase.from('messages').insert({ conversation_id: conversationId, role, content });
    }
  };

  /* ---- Send message ---- */
const handleSendMessage = async (e: React.FormEvent | React.MouseEvent) => {
  e.preventDefault();
  if (!inputValue.trim() || isLoading || !selectedPersona) return;

  // Check limit BEFORE processing
  if (!user && isLimitReached) {
    router.push('/login');
    return;
  }
    if (!user) {
    incrementChatCount();
  }

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: inputValue };
    setMessages(prev => [...prev, userMsg]);

  let convId = activeConversationId;
  if (!convId && user) {
    convId = await upsertConversation(inputValue.slice(0, 50), selectedPersona.key);
    if (!convId) return;
    setActiveConversationId(convId);
    setConversations(prev => [{ id: convId, title: inputValue.slice(0, 50), persona_key: selectedPersona.key, created_at: new Date().toISOString() }, ...prev]);
  }
  
  if (convId) {
    await saveMessage(convId, "user", inputValue);
  }

  const assistantMsg: Message = { id: crypto.randomUUID(), role: "assistant", content: "" };
  setMessages(prev => [...prev, assistantMsg]);
  
  // Clear input immediately for better UX
  setInputValue("");
  setIsLoading(true);

  try {
    // Dynamic API endpoint based on selected model
    const apiEndpoint = `/api/${selectedModel}`;
    
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
        personaInfo: selectedPersona,
      }),
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let acc = "";
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      acc += decoder.decode(value, { stream: true });
      setMessages(prev => prev.map(m => m.id === assistantMsg.id ? { ...m, content: acc } : m));
    }
    
    if (convId) {
      await saveMessage(convId, "assistant", acc);
    }
  } catch (err) {
    console.error(err);
    setMessages(prev => prev.map(m => m.id === assistantMsg.id ? { ...m, content: "Sorry, something went wrong." } : m));
  } finally {
    setIsLoading(false);
  }
};

  /* ---- UI helpers ---- */
  const handleNewChat = async () => {
    setMessages([]);
    setActiveConversationId(null);
    if (isMobile) setMobileSidebarOpen(false);
  };

  const handleSelectConversation = async (id: string) => {
    setActiveConversationId(id);
    await loadMessages(id);
    if (isMobile) setMobileSidebarOpen(false);
  };

  const handleDeleteConversation = async (id: string) => {
    await supabase.from('conversations').delete().eq('id', id);
    setConversations(prev => prev.filter(c => c.id !== id));
    if (activeConversationId === id) handleNewChat();
  };

  const handleBackToPersonas = () => {
    localStorage.removeItem('selectedPersona');
    router.push('/persona');
  };

  const handleSignOut = async () => {
    await signOut();
    setMessages([]);
    setConversations([]);
    setActiveConversationId(null);
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen(prev => !prev);
    } else {
      setSidebarOpen(prev => !prev);
    }
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  /* -------------  RENDER  ------------- */
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <ChatLimitBanner />

      <div className="p-4 bg-white/80 backdrop-blur-sm border-b border-purple-100 flex items-center justify-between sticky top-0 z-50">
        {/* Only show sidebar toggle for logged-in users or on desktop */}
        {(user || !isMobile) && (
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg bg-purple-100 text-purple-700"
            aria-label="Toggle sidebar"
          >
            {isMobile ? (mobileSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />) : (sidebarOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />)}
          </button>
        )}
        {/* For non-logged-in mobile users, show a spacer or back button */}
        {!user && isMobile && (
          <button
            onClick={handleBackToPersonas}
            className="p-2 rounded-lg bg-purple-100 text-purple-700"
            aria-label="Back to personas"
          >
            <FiArrowLeft size={20} />
          </button>
        )}
        
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent truncate">
            {selectedPersona ? selectedPersona.name : 'Chhaya Persona'}
          </h1>
        </div>
        
        {/* Model selector and user actions */}
        <div className="flex items-center gap-2">
          <ModelSelector selectedModel={selectedModel} onModelChange={handleModelChange} />
          {!user && isMobile ? (
            <button
              onClick={() => router.push('/login')}
              className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium"
            >
              Sign In
            </button>
          ) : (
            <div className="w-2" />
          )}
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden md:flex flex-col z-30 overflow-hidden
            ${sidebarOpen ? 'w-72' : 'w-0'} transition-[width] duration-300 ease-in-out
            bg-white/80 backdrop-blur-sm border-r border-purple-100 shadow-lg`}
        >
          <div className="flex-1 flex flex-col min-h-0">
            <div className="p-6 flex-shrink-0">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <img src="favicon.ico" alt="Logo" className="rounded" />
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
                    Chhaya Persona
                  </h1>
                </div>
                {selectedPersona && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center gap-3 mb-2">
                      <img src={selectedPersona.image} alt={selectedPersona.name} className="w-10 h-10 rounded-full object-cover border-2 border-purple-200" />
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">{selectedPersona.name}</h3>
                        <p className="text-xs text-purple-600">{selectedPersona.role}</p>
                      </div>
                    </div>
                    <button onClick={handleBackToPersonas} className="flex items-center gap-1 text-xs text-gray-600 hover:text-purple-600 transition-colors">
                      <FiArrowLeft size={12} />
                      <span>Change Persona</span>
                    </button>
                  </div>
                )}
              </div>

              <button onClick={handleNewChat} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-4 rounded-xl mb-6 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
                <FiPlus className="text-lg" /> New chat
              </button>
            </div>

            {user && (
              <>
                <div className="flex-1 min-h-0 px-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <FiMessageSquare className="text-purple-600" />
                      <p className="text-gray-700 font-semibold">Conversations</p>
                    </div>
                  </div>
                  <div className="overflow-y-auto flex-1 min-h-0">
                    <ul className="space-y-2 pb-6">
                      {conversations.map(c => (
                        <li
                          key={c.id}
                          className={`flex items-center justify-between text-gray-600 hover:bg-purple-50 p-3 rounded-lg cursor-pointer border border-transparent hover:border-purple-200 transition-colors ${activeConversationId === c.id ? 'bg-purple-50 border-purple-200' : ''}`}
                          onClick={() => handleSelectConversation(c.id)}
                        >
                          <span className="truncate flex-1">{c.title}</span>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteConversation(c.id); }}
                            className="text-gray-400 hover:text-red-500 p-1 rounded transition-colors"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 border-t border-purple-100 flex-shrink-0">
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                        <FiUser className="text-white text-sm" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-sm">
                          {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                        </h3>
                        <p className="text-xs text-green-600">Premium Member</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">Unlimited chats & history</p>
                    <button
                      onClick={handleSignOut}
                      className="w-full bg-white hover:bg-gray-50 text-gray-700 py-2 px-3 rounded-lg text-xs font-medium transition-colors border border-gray-200"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Sign in prompt for non-logged-in users */}
            {!user && (
              <div className="p-6 border-t border-purple-100 flex-shrink-0">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">Sign in for more</h3>
                  <p className="text-xs text-gray-600 mb-3">Save conversations, unlimited chats, and more features</p>
                  <button
                    onClick={() => router.push('/login')}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Mobile Sidebar - Only show for logged-in users */}
        {user && (
          <div className={`md:hidden fixed inset-y-0 left-0 z-40 w-72 transform ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-white/95 backdrop-blur-sm border-r border-purple-100 shadow-lg`}>
            <div className="p-4 flex items-center justify-between border-b border-purple-100">
              <h2 className="font-bold text-purple-700">Chhaya Persona</h2>
              <button onClick={() => setMobileSidebarOpen(false)} className="p-2 rounded-lg bg-purple-100 text-purple-700" aria-label="Close sidebar">
                <FiX size={20} />
              </button>
            </div>

            <div className="flex-1 flex flex-col min-h-0">
              <div className="p-4">
                {selectedPersona && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100 mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <img src={selectedPersona.image} alt={selectedPersona.name} className="w-10 h-10 rounded-full object-cover border-2 border-purple-200" />
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm leading-tight">{selectedPersona.name}</h3>
                        <p className="text-xs text-purple-600 mt-0.5">{selectedPersona.role}</p>
                      </div>
                    </div>
                    <button onClick={handleBackToPersonas} className="flex items-center gap-1 text-xs text-gray-700 hover:text-purple-600 transition-colors">
                      <FiArrowLeft size={12} />
                      <span>Change Persona</span>
                    </button>
                  </div>
                )}

                <button onClick={handleNewChat} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-3 rounded-xl mb-4">
                  <FiPlus /> New chat
                </button>

                <p className="text-gray-800 font-semibold mb-2">Conversations</p>
                <div className="space-y-2 max-h-[45vh] overflow-y-auto mb-4">
                  {conversations.map(c => (
                    <div
                      key={c.id}
                      className={`flex items-center justify-between p-3 rounded-lg hover:bg-purple-50 ${activeConversationId === c.id ? 'bg-purple-50' : ''}`}
                      onClick={() => handleSelectConversation(c.id)}
                    >
                      <span className="truncate flex-1 text-gray-800 leading-tight">{c.title}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteConversation(c.id); }}
                        className="text-gray-500 hover:text-red-500 p-1 rounded"
                        aria-label="Delete conversation"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-3 border border-green-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      <FiUser className="text-white text-sm" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm leading-tight">{user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}</h3>
                      <p className="text-xs text-green-600">Premium Member</p>
                    </div>
                  </div>
                  <button onClick={handleSignOut} className="w-full bg-white py-2 px-3 rounded-lg text-xs font-medium border border-gray-200 mt-2 text-gray-700">
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {mobileSidebarOpen && <div className="md:hidden fixed inset-0 bg-black/40 z-30" onClick={closeMobileSidebar} />}

        {/* Main Chat Area */}
<div className="flex-1 flex flex-col min-h-0">
  <div className="flex-1 overflow-y-auto">
    <div className="p-2 md:p-6 w-full min-w-0">
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 w-full min-w-0">
        {messages.length === 0 && (
          <div className="text-center mt-10 md:mt-20">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-4">
              {selectedPersona ? `Chat with ${selectedPersona.name}` : 'Welcome to Chhaya Persona'}
            </h2>
            {selectedPersona && (
              <div className="max-w-2xl mx-auto">
                <p className="text-gray-600 text-base md:text-lg mb-6">You're now chatting with {selectedPersona.name}, {selectedPersona.role}</p>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100 p-4 md:p-6 mb-8">
                  <p className="text-gray-700 leading-relaxed">{selectedPersona.personality}</p>
                </div>
              </div>
            )}
            <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-semibold text-purple-700 mb-2">💡 Ask me anything</h3>
                <p className="text-sm text-gray-600">I can help with coding, writing, analysis, and more</p>
              </div>
              <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-semibold text-purple-700 mb-2">🚀 Get started</h3>
                <p className="text-sm text-gray-600">Try asking about a project or problem you're working on</p>
              </div>
            </div>
          </div>
        )}
{messages.map(msg => (
  <div key={msg.id} className={`flex gap-2 md:gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
    {msg.role === "assistant" && (
      <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
        {selectedPersona?.image ? (
          <img 
            src={selectedPersona.image} 
            alt={selectedPersona.name} 
            className="w-6 h-6 rounded-lg object-cover" 
          />
        ) : (
          <img src="favicon.ico" alt="Logo" className="w-4 h-4" />
        )}
      </div>
    )}
    <div className={`max-w-[90vw] md:max-w-[85%] rounded-xl px-2 py-2 md:px-3 ${msg.role === "user" 
        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-tr-sm" 
        : "bg-white text-gray-800 rounded-tl-sm border border-gray-200"}`}
    >
      <div className="w-full overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
        <MarkdownMessage content={msg.content} isUser={msg.role === "user"} />
      </div>
      {msg.role === "assistant" && msg.content === "" && isLoading && (
        <div className="flex space-x-1 py-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      )}
      {msg.content && (
        <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mt-2`}>
          <MessageCopyButton text={msg.content} isAssistant={msg.role === "assistant"} />
        </div>
      )}
    </div>
    {msg.role === "user" && (
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
        <FiUser className="text-white text-sm" />
      </div>
    )}
  </div>
))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  </div>

  {/* Input Area */}
  <div className="border-t border-purple-100 bg-white/50 backdrop-blur-sm p-4 md:p-6">
    <div className="max-w-4xl mx-auto flex gap-3 md:gap-4">
      <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => { 
                if (e.key === "Enter" && !isLoading && (user || !isLimitReached)) {
                  handleSendMessage(e); 
                }
              }}
              placeholder={selectedPersona ? `Chat with ${selectedPersona.name}...` : "What's in your mind?..."}
              disabled={isLoading || (!user && isLimitReached)}
              className="w-full text-gray-800 border border-purple-200 rounded-2xl px-4 py-3 md:px-6 md:py-4 pr-12 md:pr-14 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 bg-white/80 backdrop-blur-sm shadow-sm placeholder-gray-500"
            />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading || (!user && isLimitReached)}
            className={`absolute right-2 md:right-3 top-2 w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
              inputValue.trim() && !isLoading && (user || !isLimitReached) 
                ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiSend size={16} className="md:text-base" />
          </button>
      </div>
    </div>
    
    {!user && isLimitReached && (
      <div className="text-center text-amber-600 text-sm mt-2 font-medium">
        Chat limit reached. Please sign in to continue chatting.
      </div>
    )}
    <p className="text-center text-gray-500 text-xs md:text-sm mt-3 md:mt-4">
      Chhaya Persona can make mistakes. Consider checking important information.
    </p>
  </div>
</div>
</div>
</div>
  );
};

export default ChatApp;