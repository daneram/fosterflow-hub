
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export const useAIChatState = () => {
  const location = useLocation();
  const isAIAssistantPage = location.pathname === '/ai-assistant';
  
  // Initialize from localStorage, but don't show AI chat when on the dedicated AI page
  const [aiChatOpen, setAiChatOpenInternal] = useState<boolean>(() => {
    // Try to get the saved state from localStorage when component mounts
    const savedState = localStorage.getItem('aiChatOpen');
    const initialState = savedState === 'true';
    
    // If we're on the AI assistant page, always start with it closed
    return isAIAssistantPage ? false : initialState;
  });

  // Wrapper to persist state to localStorage
  const setAiChatOpen = useCallback((value: boolean | ((prev: boolean) => boolean)) => {
    setAiChatOpenInternal(prevValue => {
      const newValue = typeof value === 'function' ? value(prevValue) : value;
      
      // Only save to localStorage if we're not on the AI assistant page
      if (!isAIAssistantPage) {
        localStorage.setItem('aiChatOpen', String(newValue));
      }
      
      return newValue;
    });
  }, [isAIAssistantPage]);

  // Toggle function
  const toggleAiChat = useCallback(() => {
    setAiChatOpen(prev => !prev);
  }, [setAiChatOpen]);

  // Debug logging
  useEffect(() => {
    console.log('[useAIChatState] State updated:', { 
      aiChatOpen, 
      isAIAssistantPage, 
      path: location.pathname 
    });
  }, [aiChatOpen, isAIAssistantPage, location.pathname]);

  return { aiChatOpen, setAiChatOpen, toggleAiChat };
};
