"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiPlus, FiSend, FiTrash2, FiMessageSquare, FiUser, FiCopy, FiCheck } from "react-icons/fi";
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import type { SyntaxHighlighterProps } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Components } from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
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
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={copyToClipboard}
        className="absolute top-3 right-3 z-10 p-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1"
        title={copied ? "Copied!" : "Copy code"}
      >
        {copied ? (
          <>
            <FiCheck size={14} />
            <span className="text-xs">Copied!</span>
          </>
        ) : (
          <>
            <FiCopy size={14} />
            <span className="text-xs">Copy</span>
          </>
        )}
      </button>
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        className={`rounded-lg !bg-gray-1000 !p-4 ${className || ""}`}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const MarkdownMessage: React.FC<{ content: string; isUser: boolean }> = ({ content, isUser }) => {
  if (isUser) {
    return <div className="whitespace-pre-wrap">{content}</div>;
  }

  const components: Components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      const codeString = String(children).replace(/\n$/, "");
      
      return !inline && match ? (
        <CodeBlockWithCopy 
          code={codeString}
          language={match[1]}
        />
      ) : (
        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>
          {children}
        </code>
      );
    },
    h1: ({ children }) => <h1 className="text-xl font-bold text-gray-800 mt-4 mb-2">{children}</h1>,
    h2: ({ children }) => <h2 className="text-lg font-semibold text-gray-800 mt-4 mb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-base font-semibold text-gray-800 mt-3 mb-2">{children}</h3>,
    ul: ({ children }) => <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>,
    li: ({ children }) => <li className="text-gray-700">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-purple-300 pl-4 italic text-gray-600 my-2">{children}</blockquote>
    ),
  };

  return (
    <div className="prose prose-sm max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-800 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm">
      <ReactMarkdown components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState([
    "Create Html Game Environment...",
    "Apply To Leave For Emergency",
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputValue,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: "",
    };

    setMessages([...newMessages, assistantMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No reader available");
      }

      let accumulatedContent = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedContent += chunk;

        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === assistantMessage.id ? { ...msg, content: accumulatedContent } : msg
          )
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === assistantMessage.id
            ? { ...msg, content: "Sorry, I encountered an error. Please try again." }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setConversations(["New Conversation", ...conversations]);
  };

  const handleClearAll = () => {
    setConversations([]);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Sidebar */}
      <div className="w-72 bg-white/80 backdrop-blur-sm border-r border-purple-100 flex flex-col shadow-lg">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span><img src="favicon.ico" alt="Logo" className="rounded" /></span>
          </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
              Chhaya Persona
            </h1>
          </div>

          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-4 rounded-xl mb-8 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <FiPlus className="text-lg" /> New chat
          </button>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <FiMessageSquare className="text-purple-600" />
              <p className="text-gray-700 font-semibold">Conversations</p>
            </div>
            <button
              onClick={handleClearAll}
              className="text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors duration-200"
            >
              <FiTrash2 size={16} />
            </button>
          </div>

          <ul className="space-y-2 mb-8">
            {conversations.map((conv, index) => (
              <li
                key={index}
                className="text-gray-600 hover:bg-purple-50 p-3 rounded-lg cursor-pointer truncate transition-colors duration-200 border border-transparent hover:border-purple-200"
              >
                {conv}
              </li>
            ))}
          </ul>

          <div className="mb-6">
            <p className="text-gray-700 font-semibold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              Last 7 Days
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:bg-purple-50 p-3 rounded-lg cursor-pointer truncate transition-colors duration-200">
                Crypto Lending App Name
              </li>
              <li className="hover:bg-purple-50 p-3 rounded-lg cursor-pointer truncate transition-colors duration-200">
                Operator Grammar Types
              </li>
              <li className="hover:bg-purple-50 p-3 rounded-lg cursor-pointer truncate transition-colors duration-200">
                Min States For Binary DFA
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-auto p-6 border-t border-purple-100">
          <button className="flex items-center gap-3 text-gray-600 hover:text-purple-600 mb-4 p-2 rounded-lg hover:bg-purple-50 transition-colors duration-200">
            <span className="text-xl">⚙️</span>
            <span className="font-medium">Settings</span>
          </button>
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <FiUser className="text-white" />
            </div>
            <span className="font-semibold text-gray-800">Suprabhat</span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <div className="text-center mt-20">
          {/* <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span><img src="favicon.ico" alt="Logo" className="rounded" /></span>
          </div> */}
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent mb-4">
                  Welcome to Chhaya Persona
                </h2>
                <p className="text-gray-600 text-lg">Start a conversation by typing your message below.</p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100 hover:shadow-md transition-shadow cursor-pointer">
                    <h3 className="font-semibold text-purple-700 mb-2">💡 Ask me anything</h3>
                    <p className="text-sm text-gray-600">
                      I can help with coding, writing, analysis, and more
                    </p>
                  </div>
                  <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100 hover:shadow-md transition-shadow cursor-pointer">
                    <h3 className="font-semibold text-purple-700 mb-2">🚀 Get started</h3>
                    <p className="text-sm text-gray-600">
                      Try asking about a project or problem you're working on
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center">
                  <span><img src="favicon.ico" alt="Logo" className="rounded" /></span>
                </div>
                  )}

                  <div
                    className={`max-w-[75%] rounded-2xl px-5 py-4 shadow-sm ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-tr-md"
                        : "bg-white/80 backdrop-blur-sm text-gray-800 rounded-tl-md border border-purple-100"
                    }`}
                  >
                    <MarkdownMessage content={message.content} isUser={message.role === "user"} />
                    {message.role === "assistant" && message.content === "" && isLoading && (
                      <div className="flex space-x-1 py-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    )}
                  </div>

                  {message.role === "user" && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <FiUser className="text-white text-sm" />
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-purple-100 bg-white/50 backdrop-blur-sm p-6">
          <div className="max-w-4xl mx-auto flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage(e);
                  }
                }}
                placeholder="What's in your mind?..."
                disabled={isLoading}
                className="w-full text-gray-800 border border-purple-200 rounded-2xl px-6 py-4 pr-14 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 bg-white/80 backdrop-blur-sm shadow-sm placeholder-gray-500"
              />
              <button
                onClick={(e) => handleSendMessage(e)}
                disabled={!inputValue.trim() || isLoading}
                className={`absolute right-2 top-2 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  inputValue.trim() && !isLoading
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <FiSend size={18} />
              </button>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            Chhaya Persona can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
