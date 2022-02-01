import React from 'react';
import { Message } from '@contexts/types';
import { UserChatAction } from '../../Chat';
import { ChangeActionCancelButton, ChangeActionDisplay } from '../style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

type ActionDisplayProps = {
  action: UserChatAction;
  message?: Message;
  onCancel(): void
}

const ActionDisplay: React.FC<ActionDisplayProps> = (props) => {
  if (props.action == UserChatAction.DEFAULT_MESSAGE){
    return <></>
  }

  const user = props.message.users;

  return (
    <ChangeActionDisplay>
      {(props.action == UserChatAction.REPLY_MESSAGE)
      ? `Respondendo para ${(user.name) ? user.name : user.username}`
      : 'Você está editando uma mensagem...'
      }
      <ChangeActionCancelButton>
        <FontAwesomeIcon icon={faTimes} onClick={props.onCancel}/>
      </ChangeActionCancelButton>
    </ChangeActionDisplay>
  );
};

export default ActionDisplay;
