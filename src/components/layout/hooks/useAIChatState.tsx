
import { useState } from 'react';

export const useAIChatState = () => {
  const [aiChatOpen, setAiChatOpen] = useState(false);

  const toggleAiChat = () => {
    setAiChatOpen(!aiChatOpen);
  };

  return { aiChatOpen, setAiChatOpen, toggleAiChat };
};
