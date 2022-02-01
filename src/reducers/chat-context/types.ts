import { Message } from '@contexts/types';

export type ChatReducerState = {
  messages: Message[];
};

export enum ChatActionType {
  ADD_MESSAGE = 'ADD_MESSAGE',
  SET_MESSAGES = 'SET_MESSAGES',
  UPDATE_MESSAGE = 'UPDATE_MESSAGE',
  DELETE_MESSAGE = 'DELETE_MESSAGE',
}

export type ChatAction = {
  type: ChatActionType;
  payload: any;
};