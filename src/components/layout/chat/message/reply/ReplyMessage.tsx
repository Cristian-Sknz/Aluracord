import React from 'react';
import { Message } from '@contexts/types';
import { ReplyContainer, ReplyDetails, ReplyMessage, ReplyUserAvatar, ReplyUsername } from './styles';

type RepliedMessageProps = {
  reply: Message;
}

const RepliedMessage: React.FC<RepliedMessageProps> = ({reply}) => {
  if (!reply) {
    return <></>;
  }

  return (
    <ReplyContainer>
      <ReplyDetails>
        <ReplyUserAvatar src={`https://github.com/${reply.users.username}.png`}/>
        <ReplyUsername>{(reply.users.name) ? reply.users.name : reply.users.username}</ReplyUsername>
      </ReplyDetails>
      <ReplyMessage>{reply.message}</ReplyMessage>
    </ReplyContainer>
  );
};

export default RepliedMessage;
