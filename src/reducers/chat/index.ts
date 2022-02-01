import { Reducer, useReducer } from 'react';
import { UserChatAction, UserChatActionHandler, UserChatState } from './types';

const INITIAL_STATE = {
  action: UserChatAction.DEFAULT_MESSAGE,
  messageId: 0,
};

const reducer: Reducer<UserChatState, UserChatActionHandler> = (state, action) => {
  switch (action.type) {
    case UserChatAction.EDIT_MESSAGE: {
      return {
        action: action.type,
        messageId: action.payload.id,
      };
    }
    case UserChatAction.DEFAULT_MESSAGE: {
      return {
        action: action.type,
      };
    }
    case UserChatAction.REPLY_MESSAGE: {
      return {
        action: action.type,
        messageId: action.payload.id,
      };
    }
    default: {
      return state;
    }
  }
};

export type { UserChatActionHandler, UserChatState };
export {UserChatAction}

export default function useChatReducer() {
  return useReducer(reducer, INITIAL_STATE);
}