import React, { createContext, useContext, useState, useEffect } from 'react';

const AI_CHAT_SIZE_KEY = 'ai-chat-panel-size';

interface AIChatContextType {
  aiChatOpen: boolean;
  setAiChatOpen: (open: boolean) => void;
  toggleAiChat: () => void;
  aiChatSize: number;
  handleAiChatSizeChange: (size: number) => void;
}

const AIChatContext = createContext<AIChatContextType | null>(null);

export const useAIChat = () => {
  const context = useContext(AIChatContext);
  if (!context) {
    throw new Error('useAIChat must be used within an AIChatProvider');
  }
  return context;
};

export const AIChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiChatSize, setAiChatSize] = useState(() => {
    const savedSize = localStorage.getItem(AI_CHAT_SIZE_KEY);
    return savedSize ? parseInt(savedSize, 10) : 30;
  });

  const handleAiChatSizeChange = (size: number) => {
    const clampedSize = Math.min(Math.max(size, 30), 45);
    setAiChatSize(clampedSize);
    localStorage.setItem(AI_CHAT_SIZE_KEY, clampedSize.toString());
  };

  const toggleAiChat = () => {
    setAiChatOpen(!aiChatOpen);
  };

  const value = {
    aiChatOpen,
    setAiChatOpen,
    toggleAiChat,
    aiChatSize,
    handleAiChatSizeChange
  };

  return (
    <AIChatContext.Provider value={value}>
      {children}
    </AIChatContext.Provider>
  );
}; 