
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, MicOff } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    onSendMessage(input);
    setInput('');
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      console.log('Speech recording started');
    } else {
      console.log('Speech recording stopped, processing...');
      setTimeout(() => {
        setInput('How do I document a home visit?');
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t p-2 flex items-center gap-2 w-full">
      <Button 
        type="button" 
        variant="outline" 
        size="icon" 
        onClick={toggleRecording}
        className={isRecording ? "text-red-500 animate-pulse h-8 w-8" : "h-8 w-8"}
      >
        {isRecording ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
      </Button>
      <Input 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        placeholder="Ask a question..." 
        className="h-8 text-xs flex-1" 
      />
      <Button 
        type="submit" 
        size="sm" 
        className="h-8 w-8 p-0" 
        disabled={!input.trim() || isLoading}
      >
        <Send className="h-3.5 w-3.5" />
      </Button>
    </form>
  );
};

export default ChatInput;
