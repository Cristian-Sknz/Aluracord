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
            {messages.map((message) => (
              <ChatMessage message={message} />
            ))}
          </ChatMessageList>
        </ChatMessageContainer>
      </ChatBox>
    </ChatContainer>
  );
};

export default Chat;
