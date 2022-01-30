import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import supabase from 'src/lib/supabase';
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

const chatInteractions = () => {
  const builder = supabase.from<Message>('messages');
  const { user } = useAuth();

  const sendMessage = useCallback((message: string) => {
    builder.insert(createMessage(user, message)).then();
  }, [user]);

  const deleteMessage = useCallback((id: number) => {
    builder.delete().match({ 'id': id })
  },[])

  return {
    builder,
    sendMessage
  };
}

const ChatProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<Message>(null);
  const chat = chatInteractions();
  const { builder } = chat;

  const fetchMessages = useCallback(() => {
    builder.select('*').then(({ data }) => {
      setMessages(data as Message[]);
    });
  }, []);

  const useRealtimeChat = useCallback(() => {
    return builder.on('INSERT', (event) => setNewMessage(event.new)).subscribe();
  }, []);

  useEffect(() => {
    if (newMessage) {
      setMessages([...messages, newMessage]);
    }
  }, [newMessage]);

  useEffect(() => {
    const realtime = useRealtimeChat();
    fetchMessages();
    return () => { realtime.unsubscribe(); }
  }, []);

  return (
    <ChatContext.Provider value={{ sendMessage: chat.sendMessage, messages }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => React.useContext(ChatContext);
export default ChatProvider;
