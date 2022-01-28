import React, { KeyboardEvent, useCallback, useRef } from 'react';
import { useAuth } from '@contexts/auth';
import { useChat } from '@contexts/chat';
import ChatMessage from './message';
import {
  ChatBox,
  ChatContainer,
  ChatHeader,
  ChatTitle,
  LogoutButton,
  ChatMessageContainer,
  ChatMessageList,
  ChatInputContainer,
  ChatInput,
} from './style';

const Chat: React.FC = () => {
  const input = useRef<HTMLTextAreaElement>();
  const {loading, logout} = useAuth();
  const chat = useChat();

  const send = useCallback(() => {
    const value = input.current.value
    if (value.length === 0) {
      return;
    }
    input.current.value = '';
    chat.sendMessage(value);
  },[chat])

  const onSend = useCallback((e: KeyboardEvent) => {
    if(!e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      send();
    }
  }, [send])

  return (
    <ChatContainer>
      <ChatBox>
        <ChatHeader>
          <ChatTitle>Chat</ChatTitle>
          <LogoutButton onClick={logout}>Logout</LogoutButton>
        </ChatHeader>

        <ChatMessageContainer>
          <ChatMessageList>
            {chat.messages.map((data, index) => (
              <ChatMessage message={data} key={index} />
            ))}
          </ChatMessageList>
        </ChatMessageContainer>

        <ChatInputContainer>
          <ChatInput
            name='message'
            placeholder={(loading) ? 'Aguarde, carregando o chat!' : 'Digite uma mensagem!'}
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
