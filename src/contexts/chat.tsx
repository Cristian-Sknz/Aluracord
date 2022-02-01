import moment from 'moment';
import React, { useCallback, useEffect, useReducer } from 'react';
import supabase from 'src/lib/supabase';
import { useAuth } from './auth';
import { Message, MessageType, GithubUser } from './types';

const ChatContext = React.createContext({} as ChatContextType);

type ChatContextType = {
  state: ChatReducerState;
  action: {
    sendMessage(message: string, isSticker?: boolean): void;
    replyMessage(text: string, replyId:number, isSticker?: boolean): void
    deleteMessage(messageId: number): void;
    editMessage(text: string, messageId: number): void;
    getMessageById(id: number): Message;
  }
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
  UPDATE_MESSAGE = 'UPDATE_MESSAGE',
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
        messages: state.messages.filter((msg) => msg.id != action.payload[0].id),
      };
    }

    case ChatActionType.UPDATE_MESSAGE: {
      return {
        ...state,
        messages: state.messages.map((msg) => {
          if (msg.id === action.payload[0].id) {
            action.payload[0].users = msg.users;
            return action.payload[0];
          }
          return msg;
        }),
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

type RealtimeChatParams = {
  state: ChatReducerState;
  dispatch: React.Dispatch<ChatAction>;
};

function useRealtimeChat({ state, dispatch }: RealtimeChatParams) {
  const messages = supabase.from<Message>('messages');
  const users = supabase.from<GithubUser>('users');

  function onInsert(payload) {
    users
      .select('*')
      .eq('id', payload.new.author)
      .then((user) => {
        payload.new['users'] = user.data[0];
        dispatch({
          type: ChatActionType.ADD_MESSAGE,
          payload: [payload.new],
        });
      });
  }

  function onUpdate(payload) {
    dispatch({
      type: ChatActionType.UPDATE_MESSAGE,
      payload: [payload.new],
    });
  }

  function onDelete(payload) {
    dispatch({
      type: ChatActionType.DELETE_MESSAGE,
      payload: [payload.old],
    });
  }

  const subscribe = useCallback(() => {
    return messages
      .on('INSERT', onInsert)
      .on('DELETE', onDelete)
      .on('UPDATE', onUpdate)
      .subscribe();
  }, []);

  return { subscribe, messages, users };
}

const ChatProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { messages, subscribe } = useRealtimeChat({ state, dispatch });
  const { user } = useAuth();

  const sendMessage = useCallback((message: string, isSticker: boolean) => {
    messages.insert(createMessage({ user, message, isSticker })).then();
  }, [user, messages]);

  const deleteMessage = useCallback((id: number) => {
    messages.delete().match({ id: id, author: user.id }).then();
  }, [user, messages]);

  const replyMessage = useCallback((message, replyId: number, isSticker: boolean) => {
    const msg = createMessage({ user, message, isSticker });
    msg.reply = replyId;
    messages.insert(msg).then();
  }, [user, messages])

  const editMessage = useCallback((text: string, id: number) => {
    messages.update({message: text, edited: true}).match({id}).then();
  }, [user, messages]);

  const getMessageById = useCallback((id: number) => {
    return state.messages.find((message) => message.id == id);
  }, [state.messages]);

  const fetchMessages = useCallback(() => {
    messages.select('*, users(*)')
      .order('id', {ascending: true}).then(({ data }) => {
        dispatch({
          type: ChatActionType.SET_MESSAGES,
          payload: data,
        })
    });
  }, [messages]);

  useEffect(() => {
    const realtime = subscribe();
    fetchMessages();
    return () => {
      realtime.unsubscribe();
    };
  }, []);

  return (
    <ChatContext.Provider value={
      {
        state, 
        action: {
          sendMessage, 
          deleteMessage, 
          editMessage, 
          replyMessage,
          getMessageById
        }
      }
    }>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => React.useContext(ChatContext);
export default ChatProvider;
