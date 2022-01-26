import { Message } from '@contexts/chat';
import React from 'react';

import {
  Author,
  Avatar,
  ChatMessageItem,
  Message as StyledMessage,
  MessageAuthor,
  MessageContainer,
  MessageDate,
  MessageDetails,
} from './style';

type ChatMessageProps = {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <ChatMessageItem>
      <MessageDetails>
        <MessageAuthor>
          <Avatar src={message.avatarUrl} />
          <Author>{message.author}</Author>
        </MessageAuthor>
        <MessageDate>{message.date}</MessageDate>
      </MessageDetails>

      <MessageContainer>
        <StyledMessage>{message.message}</StyledMessage>
      </MessageContainer>

    </ChatMessageItem>
  );
};

export default ChatMessage;
