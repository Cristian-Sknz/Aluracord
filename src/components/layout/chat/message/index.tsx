import React from 'react';
import moment from 'moment';
import {
  Author,
  Avatar,
  ChatMessageItem,
  MessageLine,
  MessageAuthor,
  MessageContainer,
  MessageDate,
  MessageDetails,
} from './style';
import { Message } from '@contexts/types';

type ChatMessageProps = {
  message: Message;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const date = moment(message.date);

  return (
    <ChatMessageItem>
      <MessageDetails>
        <MessageAuthor>
          <Avatar src={`https://github.com/${message.users.username}.png`} />
          <Author>{message.users.name}</Author>
        </MessageAuthor>
        <MessageDate title={date.format('LLLL')}>{date.calendar()}</MessageDate>
      </MessageDetails>

      <MessageContainer>
        {message.message.split('\n').map((value, line) => (
          <MessageLine key={line}>{value}</MessageLine>
        ))}
      </MessageContainer>
    </ChatMessageItem>
  );
};

export default ChatMessage;
