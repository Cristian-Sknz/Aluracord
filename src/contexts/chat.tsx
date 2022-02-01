import React, { useCallback, useEffect } from 'react';
import moment from 'moment';
import supabase from '@libs/supabase';
import { useAuth } from './auth';
import { Message, MessageType, GithubUser } from './types';
import useChatReducer, { ChatAction, ChatActionType, ChatReducerState } from '@reducers/chat-context';

const ChatContext = React.createContext({} as ChatContextType);

type ChatContextType = {
  state: ChatReducerState;
  action: ChatContextActions;
};

type ChatContextActions = {
  sendMessage(message: string, isSticker?: boolean): void;
  replyMessage(text: string, replyId:number, isSticker?: boolean): void
  deleteMessage(messageId: number): void;
  editMessage(text: string, messageId: number): void;
  getMessageById(id: number): Message;
};

type RealtimeChatParams = {
  state: ChatReducerState;
  dispatch: React.Dispatch<ChatAction>;
};

function useRealtimeChat({ state, dispatch }: RealtimeChatParams) {
  const messages = supabase.from<Message>('messages');
  const users = supabase.from<GithubUser>('users');

  function onInsert(payload) {
    users.select('*')
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

const ChatProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useChatReducer();
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
    fetchMessages();
    const realtime = subscribe();
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
