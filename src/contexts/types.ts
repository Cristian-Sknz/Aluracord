export type GithubUser = {
  id: number;
  name: string;
  username: string;
  bio: string;
  location: string;
  createdAt: string;
  publicRepos: number;
  followers: number;
  following: number;
  joinedAt?: string;
};

export type Message = {
  id?: number;
  author: number;
  date?: string;
  message: string;
  message_type: MessageType;
  users?: GithubUser;
};


export enum MessageType {
  STICKER = 'Sticker',
  TEXT = 'Text',
}