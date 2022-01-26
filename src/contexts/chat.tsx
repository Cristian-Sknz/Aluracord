import React, { useState } from 'react';

export const ChatContext = React.createContext({} as ChatContextType);

export type Message = {
  avatarUrl: string;
  author: string;
  date: string;
  message: string;
};

type ChatContextType = {
  messages: Message[];
};


const INITIAL_STATE = [
  {
    author: 'Cristian-SknZ',
    avatarUrl: 'https://github.com/cristian-sknz.png',
    date: 'Hoje as 19:10',
    message: 'Hello World',
  },
];

const ChatProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ messages }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
