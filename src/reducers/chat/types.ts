export type UserChatState = {
  action: UserChatAction;
  messageId?: number;
};

export enum UserChatAction {
  DEFAULT_MESSAGE = 'DEFAULT_MESSAGE',
  EDIT_MESSAGE = 'EDIT_MESSAGE',
  REPLY_MESSAGE = 'REPLY_MESSAGE',
};

export type UserChatActionHandler = {
  type: UserChatAction;
  payload?: any;
};
