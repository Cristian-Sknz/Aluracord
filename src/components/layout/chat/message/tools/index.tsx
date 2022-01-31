import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MessageToolsContainer, Tools, ToolsList } from '../style';
import { faReply, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

export type MessageToolsProps = {
  id: number;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  onReply(id: number): void;
};

const MessageTools: React.FC<MessageToolsProps> = (props) => {
  return (
    <MessageToolsContainer>
      <ToolsList>
        <Tools onClick={() => props.onReply(props.id)}>
          <FontAwesomeIcon icon={faReply} />
        </Tools>
        {props.onDelete && (
          <>
            <Tools onClick={() => props.onEdit(props.id)}>
              <FontAwesomeIcon icon={faEdit} />
            </Tools>

            <Tools onClick={() => props.onDelete(props.id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </Tools>
          </>
        )}
      </ToolsList>
    </MessageToolsContainer>
  );
};

export default MessageTools;
