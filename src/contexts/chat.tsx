import moment from 'moment';
import React, { useCallback, useEffect, useReducer } from 'react';
import supabase from 'src/lib/supabase';
import { useAuth } from './auth';
import { Message, MessageType, GithubUser } from './types';

const ChatContext = React.createContext({} as ChatContextType);

type ChatContextType = {
  state: ChatReducerState;
  sendMessage(message: string, isSticker?: boolean): void;
  deleteMessage(messageId: number): void;
};

type CreateMessageParams = {
  user: GithubUser;
  message: string;
  isSticker?: boolean;
};

function createMessage(create: CreateMessageParams): Message {
  return {
    author: create.user.id,
    date: moment().toISOString(),
    message: create.message,
    message_type: create.isSticker ? MessageType.STICKER : MessageType.TEXT,
  };
}

const INITIAL_STATE: ChatReducerState = {
  messages: [],
};

type ChatReducerState = {
  messages: Message[];
};

enum ChatActionType {
  ADD_MESSAGE = 'ADD_MESSAGE',
  SET_MESSAGES = 'SET_MESSAGES',
  DELETE_MESSAGE = 'DELETE_MESSAGE',
}

type ChatAction = {
  type: ChatActionType;
  payload: any;
};

const reducer: React.Reducer<ChatReducerState, ChatAction> = (state, action) => {
  switch (action.type) {
    case ChatActionType.ADD_MESSAGE: {
      return { ...state, messages: [...state.messages, ...action.payload] };
    }
    
    case ChatActionType.DELETE_MESSAGE: {
      return {
        ...state,
        messages: state.messages.filter((msg) => msg.id != action.payload.id),
      };
    }

    case ChatActionType.SET_MESSAGES: {
      return { ...state, messages: action.payload };
    }

    default: {
      return state;
    }
  }
};

const ChatProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const messages = supabase.from<Message>('messages2');
  const users = supabase.from<GithubUser>('users');
  const { user } = useAuth();

  const sendMessage = useCallback((message: string, isSticker: boolean) => {
    messages.insert(createMessage({ user, message, isSticker })).then();
  }, [user]);

  const deleteMessage = useCallback((id: number) => {
    messages.delete().match({ id: id, author: user.id }).then();
  }, []);

  const fetchMessages = useCallback(() => {
    messages.select('*, users (*)').then(({ data }) => {
      dispatch({
        type: ChatActionType.SET_MESSAGES,
        payload: data,
      });
    });
  }, []);

  const useRealtimeChat = useCallback(() => {
    const onInsert = (payload) => {
      users.select('*').eq('id', payload.new.author)
        .then((user) => {
          payload.new['users'] = user.data[0];
          dispatch({
            type: ChatActionType.ADD_MESSAGE,
            payload: [payload.new],
          });
        });
    };

    const onDelete = (payload) => {
      dispatch({
        type: ChatActionType.DELETE_MESSAGE,
        payload: [payload.old],
      });
    };

    return messages.on('INSERT', onInsert).on('DELETE', onDelete).subscribe();
  }, []);

  useEffect(() => {
    const realtime = useRealtimeChat();
    fetchMessages();
    return () => { realtime.unsubscribe(); };
  }, []);

  return (
    <ChatContext.Provider value={{ state, sendMessage, deleteMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => React.useContext(ChatContext);
export default ChatProvider;
