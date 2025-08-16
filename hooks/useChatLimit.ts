import { useState, useEffect, useCallback } from 'react';

const CHAT_LIMIT = 5;
const STORAGE_KEY = 'chat_count';

export function useChatLimit() {
  const [chatCount, setChatCount] = useState(0);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial state from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const count = stored ? parseInt(stored, 10) : 0;
      
      // Validate the stored value
      const validCount = !isNaN(count) && count >= 0 ? count : 0;
      
      setChatCount(validCount);
      setIsLimitReached(validCount >= CHAT_LIMIT);
    } catch (error) {
      console.warn('Failed to load chat count from localStorage:', error);
      setChatCount(0);
      setIsLimitReached(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync across tabs when localStorage changes
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        try {
          const newCount = event.newValue ? parseInt(event.newValue, 10) : 0;
          const validCount = !isNaN(newCount) && newCount >= 0 ? newCount : 0;
          
          setChatCount(validCount);
          setIsLimitReached(validCount >= CHAT_LIMIT);
        } catch (error) {
          console.warn('Failed to sync chat count across tabs:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Update localStorage whenever chatCount changes (but not on initial load)
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, chatCount.toString());
        setIsLimitReached(chatCount >= CHAT_LIMIT);
      } catch (error) {
        console.warn('Failed to save chat count to localStorage:', error);
      }
    }
  }, [chatCount, isLoading]);

  const incrementChatCount = useCallback(() => {
    setChatCount(prevCount => {
      const newCount = prevCount + 1;
      
      // Immediate localStorage update for better consistency
      try {
        localStorage.setItem(STORAGE_KEY, newCount.toString());
      } catch (error) {
        console.warn('Failed to update chat count in localStorage:', error);
      }
      
      return newCount;
    });
  }, []);

  const decrementChatCount = useCallback(() => {
    setChatCount(prevCount => {
      const newCount = Math.max(0, prevCount - 1);
      
      // Immediate localStorage update
      try {
        localStorage.setItem(STORAGE_KEY, newCount.toString());
      } catch (error) {
        console.warn('Failed to update chat count in localStorage:', error);
      }
      
      return newCount;
    });
  }, []);

  const resetChatCount = useCallback(() => {
    try {
      setChatCount(0);
      localStorage.removeItem(STORAGE_KEY);
      setIsLimitReached(false);
    } catch (error) {
      console.warn('Failed to reset chat count:', error);
    }
  }, []);

  const canSendMessage = useCallback(() => {
    return !isLimitReached && chatCount < CHAT_LIMIT;
  }, [isLimitReached, chatCount]);

  const remainingChats = Math.max(0, CHAT_LIMIT - chatCount);

  return {
    chatCount,
    remainingChats,
    isLimitReached,
    isLoading,
    incrementChatCount,
    decrementChatCount,
    resetChatCount,
    canSendMessage,
    chatLimit: CHAT_LIMIT,
  };
}