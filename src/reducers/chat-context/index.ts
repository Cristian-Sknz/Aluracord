import { Message } from '@contexts/types';
import { useReducer } from 'react';
import { ChatAction, ChatActionType, ChatReducerState } from './types';

const INITIAL_STATE: ChatReducerState = {
  messages: [],
};

const reducer: React.Reducer<ChatReducerState, ChatAction> = (state, action) => {
  switch (action.type) {
    case ChatActionType.ADD_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, ...action.payload],
      };
    }
    case ChatActionType.DELETE_MESSAGE: {
      return {
        ...state,
        messages: state.messages.filter((msg) => msg.id != action.payload[0].id),
      };
    }
    case ChatActionType.SET_MESSAGES: {
      return {
        ...state,
        messages: action.payload,
      };
    }
    case ChatActionType.UPDATE_MESSAGE: {
      return {
        ...state,
        messages: updateMessage(state, action.payload[0]),
      };
    }

    default: {
      return state;
    }
  }
};

function updateMessage(state: ChatReducerState, updatedMessage: Message) {
  return state.messages.map((originalMessage) => {
    if (originalMessage.id === updatedMessage.id) {
      updatedMessage.users = originalMessage.users;
      return updatedMessage;
    }
    return originalMessage;
  });
}

export { ChatActionType };
export type { ChatAction, ChatReducerState };

export default function useChatReducer() {
  return useReducer(reducer, INITIAL_STATE);
}
