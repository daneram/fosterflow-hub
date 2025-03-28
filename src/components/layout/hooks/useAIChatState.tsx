import { useState, useEffect } from 'react';

const AI_CHAT_SIZE_KEY = 'ai-chat-panel-size';

export const useAIChatState = () => {
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiChatSize, setAiChatSize] = useState(() => {
    // Try to get saved size from localStorage, default to 30 if not found
    const savedSize = localStorage.getItem(AI_CHAT_SIZE_KEY);
    return savedSize ? parseInt(savedSize, 10) : 30;
  });

  // Handle AI chat panel size changes
  const handleAiChatSizeChange = (size: number) => {
    // Ensure size stays within bounds
    const clampedSize = Math.min(Math.max(size, 30), 45);
    setAiChatSize(clampedSize);
    localStorage.setItem(AI_CHAT_SIZE_KEY, clampedSize.toString());
  };

  const toggleAiChat = () => {
    setAiChatOpen(!aiChatOpen);
  };

  return { 
    aiChatOpen, 
    setAiChatOpen, 
    toggleAiChat,
    aiChatSize,
    handleAiChatSizeChange
  };
};
