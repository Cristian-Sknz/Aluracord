import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MessageToolsContainer, Tools, ToolsList } from '../style';
import { faReply, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Message } from '@contexts/types';

export type MessageToolsProps = {
  message: Message;
  own: boolean;
  onDelete?: (msg: Message) => void;
  onEdit?: (msg: Message) => void;
  onReply(msg: Message): void;
};

const MessageTools: React.FC<MessageToolsProps> = (props) => {
  return (
    <MessageToolsContainer>
      <ToolsList>
        <Tools onClick={() => props.onReply(props.message)}>
          <FontAwesomeIcon icon={faReply} />
        </Tools>
        {props.own && (
          <>
            <Tools onClick={() => props.onEdit(props.message)}>
              <FontAwesomeIcon icon={faEdit} />
            </Tools>
            <Tools onClick={() => props.onDelete(props.message)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </Tools>
          </>
        )}
      </ToolsList>
    </MessageToolsContainer>
  );
};

export default MessageTools;
