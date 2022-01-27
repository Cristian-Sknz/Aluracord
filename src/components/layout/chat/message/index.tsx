import React from 'react';
import moment from 'moment';
import { Message } from '@contexts/chat';
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
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const date = moment(message.date);

  return (
    <ChatMessageItem>
      <MessageDetails>
        <MessageAuthor>
          <Avatar src={message.avatarUrl} />
          <Author>{message.author}</Author>
        </MessageAuthor>
        <MessageDate title={date.format('LLLL')}>
          {date.calendar()}
        </MessageDate>
      </MessageDetails>

      <MessageContainer>
        <StyledMessage>{message.message}</StyledMessage>
      </MessageContainer>
    </ChatMessageItem>
  );
};

export default ChatMessage;
