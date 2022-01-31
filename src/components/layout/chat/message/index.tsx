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
  IsEdited,
} from './style';
import { Message } from '@contexts/types';
import MessageTools, { MessageToolsProps } from './tools';

type ChatMessageProps = {
  message: Message;
} & Omit<MessageToolsProps, 'id'>;

const ChatMessage: React.FC<ChatMessageProps> = (props) => {
  const date = moment(props.message.date);
  return (
    <ChatMessageItem>
      <MessageTools
        message={props.message}
        own={props.own}
        onReply={props.onReply}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
      />
      <MessageDetails>
        <MessageAuthor>
          <Avatar src={`https://github.com/${props.message.users.username}.png`} />
          <Author>{props.message.users.name}</Author>
        </MessageAuthor>
        <MessageDate title={date.format('LLLL')}>{date.calendar()}</MessageDate>
      </MessageDetails>

      <MessageContainer>
        {props.message.message.split('\n').map((value, line) => (
          <MessageLine key={line}>{value}</MessageLine>
        ))}
        {props.message.edited && <IsEdited className={'edited'}>(editado)</IsEdited>}
      </MessageContainer>
    </ChatMessageItem>
  );
};

export default ChatMessage;
