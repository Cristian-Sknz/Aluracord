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
import MessageTools, { MessageToolsProps } from './tools/MessageTools';
import RepliedMessage from './reply/ReplyMessage';

type ChatMessageProps = {
  message: Message;
  reply?: Message;
} & Omit<MessageToolsProps, 'id'>;

const ChatMessage: React.FC<ChatMessageProps> = (props) => {
  const user = props.message.users;
  const message = props.message;
  const reply = props.reply;
  const date = moment(message.date);

  return (
    <ChatMessageItem>
      <RepliedMessage reply={reply}/>
      <MessageDetails>
        <MessageAuthor>
          <Avatar src={`https://github.com/${user.username}.png`} />
          <Author>{(user.name) ? user.name : user.username}</Author>
        </MessageAuthor>
        <MessageDate title={date.format('LLLL')}>{date.calendar()}</MessageDate>

        <MessageTools
          message={props.message}
          own={props.own}
          onReply={props.onReply}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      </MessageDetails>

      <MessageContainer>
        {message.message.split('\n').map((value, line) => (
          <MessageLine key={line}>{value}</MessageLine>
        ))}
        {message.edited && <IsEdited className={'edited'}>(editado)</IsEdited>}
      </MessageContainer>
    </ChatMessageItem>
  );
};

export default ChatMessage;
