
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

export const useAIChatState = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const isAIAssistantPage = location.pathname === '/ai-assistant';
  
  // Initialize from localStorage, or use defaults based on device type
  const [aiChatOpen, setAiChatOpenInternal] = useState<boolean>(() => {
    // Try to get the saved state from localStorage when component mounts
    const savedState = localStorage.getItem('aiChatOpen');
    
    // If we're on the AI assistant page, always start with it closed
    if (isAIAssistantPage) {
      return false;
    }
    
    // If we have a saved state, use it
    if (savedState !== null) {
      return savedState === 'true';
    }
    
    // Default behavior: open on desktop, closed on mobile
    return !isMobile;
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
      isMobile,
      path: location.pathname 
    });
  }, [aiChatOpen, isAIAssistantPage, isMobile, location.pathname]);

  return { aiChatOpen, setAiChatOpen, toggleAiChat };
};
