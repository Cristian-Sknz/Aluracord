import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { GithubUser, useAuth } from './auth';

const ChatContext = React.createContext({} as ChatContextType);

export type Message = {
  id?: number;
  avatarUrl: string;
  author: string;
  date: string;
  message: string;
};

type ChatContextType = {
  messages: Message[];
  sendMessage(message: string): void;
};

function createMessage(user: GithubUser, message: string): Message {
  return {
    avatarUrl: `https://github.com/${user.username}.png`,
    author: user.name,
    date: moment().toISOString(),
    message,
  };
}

const ChatProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth();

  const sendMessage = useCallback((message: string) => {
    setMessages([...messages, createMessage(user, message)]);
  }, [messages, user]);

  useEffect(() => {
    fetch('/api/messages')
      .then((response) => response.json())
      .then((data: Message[]) => setMessages(data));
  }, []);

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => React.useContext(ChatContext);
export default ChatProvider;
