import React, { useContext } from 'react';
import { ChatContext } from 'src/contexts/chat';
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
  const { messages } = useContext(ChatContext);

  return (
    <ChatContainer>
      <ChatBox>
        <ChatHeader>
          <ChatTitle>Chat</ChatTitle>
          <LogoutButton href='#'>Logout</LogoutButton>
        </ChatHeader>

        <ChatMessageContainer>
          <ChatMessageList>
            {messages.map((data) => (
              <ChatMessage message={data} key={data.id} />
            ))}
          </ChatMessageList>
        </ChatMessageContainer>

        <ChatInputContainer>
          <ChatInput
            name='message'
            placeholder='Digite uma mensagem!'
            maxRows={10}
            maxLength={500}
          />
        </ChatInputContainer>
      </ChatBox>
    </ChatContainer>
  );
};

export default Chat;
