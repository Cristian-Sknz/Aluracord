import React, { useEffect, useState } from 'react';

export const ChatContext = React.createContext({} as ChatContextType);

export type Message = {
  id: number;
  avatarUrl: string;
  author: string;
  date: string;
  message: string;
};

type ChatContextType = {
  messages: Message[];
};

const ChatProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch('/api/messages')
      .then((response) => response.json())
      .then((data: Message[]) => setMessages(data));
  }, []);

  return (
    <ChatContext.Provider value={{ messages }}>{children}</ChatContext.Provider>
  );
};

export default ChatProvider;
