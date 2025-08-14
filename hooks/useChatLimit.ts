import { useState, useEffect, useCallback } from 'react';

const CHAT_LIMIT = 5;
const STORAGE_KEY = 'chat_count';

export function useChatLimit() {
  const [chatCount, setChatCount] = useState(0);
  const [isLimitReached, setIsLimitReached] = useState(false);

  // Load initial state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const count = stored ? parseInt(stored, 10) : 0;
    setChatCount(count);
    setIsLimitReached(count >= CHAT_LIMIT);
  }, []);

  // Sync across tabs when localStorage changes
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && event.newValue !== null) {
        const newCount = parseInt(event.newValue, 10);
        setChatCount(newCount);
        setIsLimitReached(newCount >= CHAT_LIMIT);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Update localStorage whenever chatCount changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, chatCount.toString());
    setIsLimitReached(chatCount >= CHAT_LIMIT);
  }, [chatCount]);

  const incrementChatCount = useCallback(() => {
    setChatCount(prevCount => {
      const newCount = prevCount + 1;
      localStorage.setItem(STORAGE_KEY, newCount.toString()); // Ensure cross-tab sync
      return newCount;
    });
  }, []);

  const resetChatCount = useCallback(() => {
    setChatCount(0);
    localStorage.removeItem(STORAGE_KEY);
    setIsLimitReached(false);
  }, []);

  const remainingChats = Math.max(0, CHAT_LIMIT - chatCount);

  return {
    chatCount,
    remainingChats,
    isLimitReached,
    incrementChatCount,
    resetChatCount,
    chatLimit: CHAT_LIMIT,
  };
}