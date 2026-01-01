"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  FiSend,
  FiUser,
  FiCopy,
  FiCheck,
  FiArrowLeft,
  FiMenu,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiThumbsUp,
  FiThumbsDown,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Components } from "react-markdown";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useChatLimit } from "@/hooks/useChatLimit";
import { ChatLimitBanner } from "@/component/ChatLimitBanner";
import { ChatSidebar } from "@/component/ChatSidebar";

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

type ModelType = "gemini" | "groq" | "gpt-oss" | "qwen" | "claude";

interface ModelOption {
  value: ModelType;
  label: string;
  description: string;
}

const modelOptions: ModelOption[] = [
  {
    value: "gpt-oss",
    label: "Chat GPT",
    description: "Open AI's model",
  },
  {
    value: "gemini",
    label: "Gemini",
    description: "Google's advanced AI model",
  },
  {
    value: "groq",
    label: "Kimi K2",
    description: "Good for coding - chinese model hai",
  },
  {
    value: "qwen",
    label: "dolphin-mistral",
    description: "Uncensored hai bhai",
  },
  {
    value: "claude",
    label: "Claude-sonnet-4",
    description: "Name toh suna hoga",
  },
];

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

  // Format language name for display
  const getLanguageDisplayName = (lang: string) => {
    const languageMap: { [key: string]: string } = {
      javascript: "JavaScript",
      typescript: "TypeScript",
      python: "Python",
      jsx: "JSX",
      tsx: "TSX",
      css: "CSS",
      html: "HTML",
      json: "JSON",
      bash: "Bash",
      sql: "SQL",
      java: "Java",
      cpp: "C++",
      c: "C",
      go: "Go",
      rust: "Rust",
      php: "PHP",
      ruby: "Ruby",
      swift: "Swift",
      kotlin: "Kotlin",
    };
    return languageMap[lang.toLowerCase()] || lang.toUpperCase();
  };

  return (
    <div
      className="relative group w-full my-3 max-w-full overflow-hidden border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {/* VS Code-style header bar */}
      <div className="flex items-center justify-between bg-[#1e1e1e] border-b-2 border-black px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="text-cyan-400 font-mono text-xs font-bold uppercase">
            {getLanguageDisplayName(language)}
          </div>
        </div>
        <button
          onClick={copyToClipboard}
          className="p-1.5 px-2.5 bg-cyan-400 hover:bg-cyan-300 text-black font-bold border-2 border-black transition-all flex items-center gap-1.5 text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
          title="Copy code"
        >
          {copied ? (
            <>
              <FiCheck size={14} strokeWidth={3} />
              <span className="text-xs font-black uppercase">Copied!</span>
            </>
          ) : (
            <>
              <FiCopy size={14} strokeWidth={3} />
              <span className="text-xs font-black uppercase">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div
        className="w-full overflow-x-auto bg-[#1e1e1e]"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          PreTag="div"
          showLineNumbers={true}
          className="!bg-transparent !p-0 !m-0 text-xs md:text-sm"
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "transparent",
            fontSize: "0.875rem",
            lineHeight: "1.5",
            fontFamily:
              "ui-monospace, SFMono-Regular, 'Courier New', Consolas, monospace",
            minWidth: "100%",
            width: "auto",
            overflowX: "auto",
          }}
          codeTagProps={{
            style: {
              fontSize: "0.875rem",
              lineHeight: "1.5",
              fontFamily:
                "ui-monospace, SFMono-Regular, 'Courier New', Consolas, monospace",
              display: "block",
            },
          }}
          lineNumberStyle={{
            minWidth: "3em",
            paddingRight: "1em",
            color: "#858585",
            textAlign: "right",
            userSelect: "none",
            fontFamily:
              "ui-monospace, SFMono-Regular, 'Courier New', Consolas, monospace",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const MarkdownMessage: React.FC<{ content: string; isUser: boolean }> = ({
  content,
  isUser,
}) => {
  if (isUser)
    return (
      <div className="whitespace-pre-wrap break-words font-bold">{content}</div>
    );

  const components: Components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      const codeString = String(children).replace(/\n$/, "");

      // Check if it's a multi-line code block (has newlines) or has a language specified
      const isMultiLine = codeString.includes("\n");
      const hasLanguage = match && match[1];

      // Render as code block if: not inline AND (has language OR is multi-line)
      if (!inline && (hasLanguage || isMultiLine)) {
        return (
          <div className="w-full max-w-full overflow-hidden">
            <CodeBlockWithCopy
              code={codeString}
              language={hasLanguage ? match[1] : "text"}
            />
          </div>
        );
      }

      // Render as inline code (yellow background)
      return (
        <code
          className="bg-yellow-200 px-1.5 py-0.5 border-2 border-black font-mono text-xs font-bold break-all whitespace-pre-wrap"
          {...props}
        >
          {children}
        </code>
      );
    },
    h1: ({ children }) => (
      <h1 className="text-xl font-black text-black mt-4 mb-2 break-words uppercase">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-lg font-black text-black mt-4 mb-2 break-words uppercase">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-base font-black text-black mt-3 mb-2 break-words uppercase">
        {children}
      </h3>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-1 my-2 break-words font-bold">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-1 my-2 break-words font-bold">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-black break-words font-medium">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-black pl-4 font-bold italic text-black my-2 break-words bg-pink-100 py-2">
        {children}
      </blockquote>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black underline decoration-4 decoration-yellow-400 hover:bg-yellow-300 transition-all duration-200 px-1 py-0.5 font-black rounded-md p-2"
      >
        {children}
      </a>
    ),
    p: ({ children }) => (
      <p className="mb-2 font-medium text-black">{children}</p>
    ),
    strong: ({ children }) => (
      <strong className="font-black text-black">{children}</strong>
    ),
  };

  return (
    <div className="prose prose-sm max-w-none overflow-hidden">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
};

const MessageCopyButton: React.FC<{ text: string; isAssistant: boolean }> = ({
  text,
  isAssistant,
}) => {
  const [copied, setCopied] = useState(false);

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
      className="bg-white border-2 border-black px-2 py-1 text-black font-bold uppercase text-xs hover:bg-yellow-100 transition-all flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer"
      aria-label="Copy message"
      title="Copy response"
    >
      {copied ? (
        <>
          <FiCheck size={14} strokeWidth={3} className="text-green-600" />
          <span className="text-green-600">COPIED!</span>
        </>
      ) : (
        <>
          <FiCopy size={14} strokeWidth={3} />
          <span>COPY</span>
        </>
      )}
    </button>
  );
};

const ModelSelector: React.FC<{
  selectedModel: ModelType;
  onModelChange: (model: ModelType) => void;
}> = ({ selectedModel, onModelChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = modelOptions.find(
    (option) => option.value === selectedModel
  )!;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-1 py-2 bg-cyan-300 border-4 border-black font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
      >
        <span className="text-black">{selectedOption.label}</span>
        <FiChevronDown
          size={16}
          strokeWidth={3}
          className={`text-black transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-64 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-20 overflow-hidden">
            {modelOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onModelChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 hover:bg-yellow-100 transition-colors border-b-2 border-black last:border-b-0 cursor-pointer ${
                  selectedModel === option.value
                    ? "bg-cyan-200 border-l-4 border-l-black"
                    : ""
                }`}
              >
                <div className="font-black text-black uppercase text-sm">
                  {option.label}
                </div>
                <div className="text-xs text-black/70 font-bold mt-0.5">
                  {option.description}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ChatApp: React.FC = () => {
  const router = useRouter();
  const { user, session, signOut } = useAuth();
  const { remainingChats, isLimitReached, incrementChatCount, resetChatCount } =
    useChatLimit();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    [id: string]: "like" | "dislike" | null;
  }>({});
  const [inputValue, setInputValue] = useState("");

  const getWordCount = (text: string) =>
    text.trim().split(/\s+/).filter(Boolean).length;
  const wordCount = getWordCount(inputValue);
  const maxWords = 300;

  const [selectedPersona, setSelectedPersona] = useState<PersonaData | null>(
    null
  );
  const [selectedModel, setSelectedModel] = useState<ModelType>("gemini");
  const [conversations, setConversations] = useState<any[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  };

  const loadConversations = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (!error && data) setConversations(data);
  }, []);

  const loadMessages = useCallback(async (conversationId: string) => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });
    if (!error && data) {
      setMessages(
        data.map((m: any) => ({
          id: m.id,
          role: m.role as "user" | "assistant",
          content: m.content,
        }))
      );
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("selectedPersona");
    if (stored) {
      try {
        setSelectedPersona(JSON.parse(stored));
      } catch {
        /* ignore */
      }
    } else {
      // If no persona is selected, redirect to persona selection page
      router.push("/persona");
      return;
    }

    const storedModel = localStorage.getItem("selectedModel") as ModelType;
    if (
      storedModel &&
      modelOptions.some((option) => option.value === storedModel)
    ) {
      setSelectedModel(storedModel);
    }
  }, [router]);

  useEffect(() => {
    (async () => {
      if (!user) return;
      await loadConversations(user.id);
      if (!activeConversationId) {
        setMessages([]);
      }
    })();
  }, [user, loadConversations]);

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

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileSidebarOpen(false);
        if (!user) {
          setSidebarOpen(false);
        }
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [user]);

  const handleModelChange = (model: ModelType) => {
    setSelectedModel(model);
    localStorage.setItem("selectedModel", model);
  };

  const upsertConversation = async (title: string, personaKey: string) => {
    if (!user) return null;
    const { data, error } = await supabase
      .from("conversations")
      .insert({ user_id: user.id, title, persona_key: personaKey })
      .select()
      .single();
    if (error) {
      console.error(error);
      return null;
    }
    return data.id;
  };

  const saveMessage = async (
    conversationId: string,
    role: "user" | "assistant",
    content: string
  ) => {
    if (user) {
      await supabase
        .from("messages")
        .insert({ conversation_id: conversationId, role, content });
    }
  };

  const handleSendMessage = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading || !selectedPersona) return;

    if (!user && isLimitReached) {
      router.push("/login");
      return;
    }
    if (!user) {
      incrementChatCount();
    }

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: inputValue,
    };
    setMessages((prev) => [...prev, userMsg]);

    let convId = activeConversationId;
    if (!convId && user) {
      convId = await upsertConversation(
        inputValue.slice(0, 50),
        selectedPersona.key
      );
      if (!convId) return;
      setActiveConversationId(convId);
      setConversations((prev) => [
        {
          id: convId,
          title: inputValue.slice(0, 50),
          persona_key: selectedPersona.key,
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
    }

    if (convId) {
      await saveMessage(convId, "user", inputValue);
    }

    const assistantMsg: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
    };
    setMessages((prev) => [...prev, assistantMsg]);

    setInputValue("");
    setIsLoading(true);

    try {
      const apiEndpoint = `/api/${selectedModel}`;

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          personaKey: selectedPersona.key, // Send only the key instead of full persona object
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
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id ? { ...m, content: acc } : m
          )
        );
      }

      if (convId) {
        await saveMessage(convId, "assistant", acc);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsg.id
            ? { ...m, content: "Sorry, something went wrong." }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

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
    await supabase.from("conversations").delete().eq("id", id);
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConversationId === id) handleNewChat();
  };

  const handleBackToPersonas = () => {
    localStorage.removeItem("selectedPersona");
    router.push("/persona");
  };

  const handleSignOut = async () => {
    await signOut();
    setMessages([]);
    setConversations([]);
    setActiveConversationId(null);
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen((prev) => !prev);
    } else {
      setSidebarOpen((prev) => !prev);
    }
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-yellow-50 font-sans">
      <ChatLimitBanner />

      {/* Header */}
      <div className="p-3 md:p-4 bg-white border-b-4 border-black flex items-center justify-between sticky top-0 z-50 shadow-sm">
        {(user || !isMobile) && (
          <button
            onClick={toggleSidebar}
            className="p-2 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-black"
            aria-label="Toggle sidebar"
          >
            {isMobile ? (
              mobileSidebarOpen ? (
                <FiX size={20} strokeWidth={3} />
              ) : (
                <FiMenu size={20} strokeWidth={3} />
              )
            ) : sidebarOpen ? (
              <FiChevronLeft size={20} strokeWidth={3} />
            ) : (
              <FiChevronRight size={20} strokeWidth={3} />
            )}
          </button>
        )}
        {!user && isMobile && (
          <button
            onClick={handleBackToPersonas}
            className="p-2 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-black"
            aria-label="Back to personas"
          >
            <FiArrowLeft size={20} strokeWidth={3} />
          </button>
        )}

        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-mb md:text-2xl font-black uppercase tracking-tighter text-black truncate">
            {selectedPersona ? selectedPersona.name : "Chhaya Persona"}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={handleModelChange}
          />
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <ChatSidebar
          isOpen={isMobile ? mobileSidebarOpen : sidebarOpen}
          isMobile={isMobile}
          selectedPersona={selectedPersona}
          conversations={conversations}
          activeConversationId={activeConversationId}
          user={user}
          onNewChat={handleNewChat}
          onSelectConversation={handleSelectConversation}
          onDeleteConversation={handleDeleteConversation}
          onBackToPersonas={handleBackToPersonas}
          onSignOut={handleSignOut}
          onClose={closeMobileSidebar}
        />

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto">
            <div className="p-2 md:p-6 w-full min-w-0">
              <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 w-full min-w-0">
                {messages.length === 0 && (
                  <div className="text-center mt-10 md:mt-20">
                    <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter mb-4">
                      {selectedPersona
                        ? `Chat with ${selectedPersona.name}`
                        : "Welcome to Chhaya Persona"}
                    </h2>
                    {selectedPersona && (
                      <div className="max-w-2xl mx-auto">
                        <p className="text-black font-bold text-base md:text-lg mb-6">
                          You're now chatting with {selectedPersona.name},{" "}
                          {selectedPersona.role}
                        </p>
                        <div className="bg-white border-4 border-black p-4 md:p-6 mb-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                          <p className="text-black font-medium leading-relaxed">
                            {selectedPersona.personality}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2 md:gap-3 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 bg-black border-2 border-black flex items-center justify-center flex-shrink-0 mt-1">
                        {selectedPersona?.image ? (
                          <img
                            src={selectedPersona.image}
                            alt={selectedPersona.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src="/favicon.ico"
                            alt="Logo"
                            className="w-5 h-5"
                          />
                        )}
                      </div>
                    )}
                    <div
                      className={`max-w-[90vw] md:max-w-[85%] px-4 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                        msg.role === "user"
                          ? "bg-green-400 text-black"
                          : "bg-white text-black"
                      }`}
                    >
                      <div
                        className="w-full overflow-x-auto"
                        style={{ WebkitOverflowScrolling: "touch" }}
                      >
                        <MarkdownMessage
                          content={msg.content}
                          isUser={msg.role === "user"}
                        />
                      </div>
                      {msg.role === "assistant" &&
                        msg.content === "" &&
                        isLoading && (
                          <div className="flex space-x-1 py-2">
                            <div className="w-3 h-3 bg-black rounded-full animate-bounce"></div>
                            <div
                              className="w-3 h-3 bg-black rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                            <div
                              className="w-3 h-3 bg-black rounded-full animate-bounce"
                              style={{ animationDelay: "0.4s" }}
                            ></div>
                          </div>
                        )}
                      {msg.content && (
                        <div
                          className={`flex ${
                            msg.role === "user"
                              ? "justify-end"
                              : "justify-start"
                          } mt-2 items-center gap-2 flex-wrap`}
                        >
                          <MessageCopyButton
                            text={msg.content}
                            isAssistant={msg.role === "assistant"}
                          />
                          {msg.role === "assistant" && (
                            <div className="flex gap-1">
                              <button
                                aria-label="Like"
                                className={`p-1.5 border-2 border-black ${
                                  feedback[msg.id] === "like"
                                    ? "bg-green-400"
                                    : "bg-white"
                                } hover:bg-green-200 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px cursor-pointer`}
                                onClick={() =>
                                  setFeedback((f) => ({
                                    ...f,
                                    [msg.id]:
                                      f[msg.id] === "like" ? null : "like",
                                  }))
                                }
                              >
                                <FiThumbsUp size={16} strokeWidth={3} />
                              </button>
                              <button
                                aria-label="Dislike"
                                className={`p-1.5 border-2 border-black ${
                                  feedback[msg.id] === "dislike"
                                    ? "bg-red-400"
                                    : "bg-white"
                                } hover:bg-red-200 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] cursor-pointer`}
                                onClick={() =>
                                  setFeedback((f) => ({
                                    ...f,
                                    [msg.id]:
                                      f[msg.id] === "dislike"
                                        ? null
                                        : "dislike",
                                  }))
                                }
                              >
                                <FiThumbsDown size={16} strokeWidth={3} />
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-8 h-8 bg-black border-2 border-black flex items-center justify-center flex-shrink-0 mt-1">
                        <FiUser
                          className="text-white text-sm"
                          strokeWidth={3}
                        />
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t-4 border-black bg-white p-4 md:p-6 pb-2 md:pb-2">
            <div className="max-w-4xl mx-auto flex gap-3 md:gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      !isLoading &&
                      (user || !isLimitReached)
                    ) {
                      if (wordCount <= maxWords) {
                        handleSendMessage(e);
                      }
                    }
                  }}
                  placeholder={
                    selectedPersona
                      ? `Chat with ${selectedPersona.name}...`
                      : "What's in your mind?..."
                  }
                  disabled={isLoading || (!user && isLimitReached)}
                  className="w-full text-black font-medium border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] px-4 py-3 md:px-6 md:py-4 pr-12 md:pr-14 focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 transition-all placeholder-black/50 placeholder:text-sm"
                />
                {wordCount > maxWords && (
                  <div className="absolute left-0 -bottom-6 text-xs font-black text-red-600  select-none">
                    Max limit is 300 words
                  </div>
                )}
                <button
                  onClick={(e) => {
                    if (wordCount <= maxWords) {
                      handleSendMessage(e);
                    }
                  }}
                  disabled={
                    !inputValue.trim() ||
                    isLoading ||
                    (!user && isLimitReached) ||
                    wordCount > maxWords
                  }
                  className={`absolute right-2 md:right-3 top-2 w-10 h-10 border-4 border-black flex items-center justify-center transition-all duration-200 ${
                    inputValue.trim() &&
                    !isLoading &&
                    (user || !isLimitReached) &&
                    wordCount <= maxWords
                      ? "bg-pink-400 hover:bg-pink-300 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <FiSend size={16} strokeWidth={3} className="md:text-base" />
                </button>
              </div>
            </div>

            {!user && isLimitReached && (
              <div className="text-center text-black font-black text-sm mt-2 uppercase border-2 border-black bg-yellow-200 p-2">
                Chat limit reached. Please sign in to continue chatting.
              </div>
            )}
            <p className="text-center text-black/70 font-bold text-xs md:text-sm mt-3 md:mt-4 uppercase">
              Chhaya Persona can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
