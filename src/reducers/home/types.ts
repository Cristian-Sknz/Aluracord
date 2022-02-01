export type HomeReducerState = {
  username: string,
  error: boolean,
  loading: boolean;
}

export type HomeAction = {
  type: HomeActionType;
  payload?: any;
}

export enum HomeActionType {
  NEW_USERNAME = 'NEW_USERNAME',
  FAILED_USERNAME = 'FAILED_USERNAME',
  SUCCESS_USERNAME = 'SUCCESS_USERNAME',
}