import React, { KeyboardEvent, useCallback, useReducer, useRef, Reducer } from 'react';
import { useAuth } from '@contexts/auth';
import { useChat } from '@contexts/chat';
import { Message } from '@contexts/types';
import ChatMessage from './message/ChatMessage';
import ActionDisplay from './message/display/ActionDisplay';
import {
  ChatBox,
  ChatContainer,
  ChatHeader,
  ChatTitle,
  LogoutButton,
  ChatMessageContainer,
  ChatMessageList,
  ChatInputContainer,
  ChatInput
} from './style';

type UserChatState = {
  action: UserChatAction;
  messageId?: number;
};

export enum UserChatAction {
  DEFAULT_MESSAGE = 'DEFAULT_MESSAGE',
  EDIT_MESSAGE = 'EDIT_MESSAGE',
  REPLY_MESSAGE = 'REPLY_MESSAGE',
};

type UserChatActionHandler = {
  type: UserChatAction;
  payload?: any;
};

const INITIAL_STATE = {
  action: UserChatAction.DEFAULT_MESSAGE,
  messageId: 0,
};

const userChatReducer: Reducer<UserChatState, UserChatActionHandler> = (state, action) => {
  switch (action.type) {
    case UserChatAction.EDIT_MESSAGE: {
      return {
        action: action.type,
        messageId: action.payload.id,
      };
    }
    case UserChatAction.DEFAULT_MESSAGE: {
      return {
        action: action.type,
      };
    }
    case UserChatAction.REPLY_MESSAGE: {
      return {
        action: action.type,
        messageId: action.payload.id,
      };
    }
    default: {
      return state;
    }
  }
};

const Chat: React.FC = () => {
  const [state, dispatch] = useReducer(userChatReducer, INITIAL_STATE);
  const { user, loading, logout } = useAuth();
  const input = useRef<HTMLTextAreaElement>();
  const chat = useChat();

  const handleMessageAction = useCallback(() => {
    const value = input.current.value;
    if (value.length === 0) {
      return;
    }
    input.current.value = '';
    switch (state.action) {
      case UserChatAction.EDIT_MESSAGE: {
        chat.action.editMessage(value, state.messageId);
        onCancel();
        break;
      }
      case UserChatAction.REPLY_MESSAGE: {
        chat.action.replyMessage(value, state.messageId);
        onCancel();
        break;
      }
      case UserChatAction.DEFAULT_MESSAGE: {
        chat.action.sendMessage(value);
        break;
      }
    }
  }, [chat, state]);

  const onReply = (message: Message) => {
    dispatch({
      type: UserChatAction.REPLY_MESSAGE,
      payload: { id: message.id },
    })
  };
  
  const onEdit = (message: Message) => {
    input.current.value = message.message;
    dispatch({
      type: UserChatAction.EDIT_MESSAGE,
      payload: { id: message.id },
    });
  }

  const onDelete = (message: Message) => {
    chat.action.deleteMessage(message.id);
  };

  const onCancel = () => {
    dispatch({
      type: UserChatAction.DEFAULT_MESSAGE,
    });
  }

  const onSend = useCallback((e: KeyboardEvent) => {
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      handleMessageAction();
    }
  }, [handleMessageAction]);

  return (
    <ChatContainer>
      <ChatBox>
        <ChatHeader>
          <ChatTitle>Chat</ChatTitle>
          <LogoutButton onClick={logout}>Logout</LogoutButton>
        </ChatHeader>
        <ChatMessageContainer>
          <ChatMessageList>
            {chat.state.messages.map((data) => (
              <ChatMessage
                own={data.author == user?.id}
                onReply={onReply}
                onDelete={onDelete}
                onEdit={onEdit}
                message={data}
                reply={chat.action.getMessageById(data?.reply)}
                key={data.id}
              />
            ))}
          </ChatMessageList>
        </ChatMessageContainer>

        <ChatInputContainer>
          <ActionDisplay 
            action={state.action}
            message={chat.state.messages.filter((msg) => msg.id == state.messageId)[0]}
            onCancel={onCancel}
          />
          <ChatInput
            name='message'
            placeholder={
              loading ? 'Aguarde, carregando o chat!' : 'Digite uma mensagem!'
            }
            maxRows={10}
            maxLength={500}
            onKeyPress={onSend}
            disabled={loading}
            ref={input}
          />
        </ChatInputContainer>
      </ChatBox>
    </ChatContainer>
  );
};

export default Chat;
