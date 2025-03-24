
import { useState, useEffect } from 'react';

export const useAIChatState = () => {
  const [aiChatOpen, setAiChatOpen] = useState<boolean>(() => {
    // Try to get the saved state from localStorage when component mounts
    const savedState = localStorage.getItem('aiChatOpen');
    return savedState === 'true';
  });

  // Persist AI chat state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('aiChatOpen', String(aiChatOpen));
  }, [aiChatOpen]);

  const toggleAiChat = () => {
    setAiChatOpen(prev => !prev);
  };

  return { aiChatOpen, setAiChatOpen, toggleAiChat };
};
