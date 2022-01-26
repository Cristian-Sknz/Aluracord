import { useNeutralColor } from '@styles/global';
import styled from 'styled-components';

export const ChatContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  background-image: url('/images/background/rezero-minimalist.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  height: 100vh;
  display: grid;
  grid-template-columns: 0.3fr 2.4fr 0.3fr;
  grid-template-rows: 0.3fr 2.4fr 0.3fr;
  gap: 0px 0px;
  grid-template-areas:
    '. . .'
    '. chat .'
    '. . .';

  justify-items: center;
  align-items: center;
`;

export const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: chat;
  width: 100%;
  max-height: 560px;
  padding: 2rem;

  background-color: ${({theme}) => useNeutralColor(theme, '700')};
`;

export const ChatHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ChatTitle = styled.h3`
  color: ${({theme}) => useNeutralColor(theme, '100')};
  font-family: Poppins, sans-serif;
`;

export const LogoutButton = styled.a`
  color: ${({theme}) => useNeutralColor(theme, '100')};
  font-size: .9rem;
  font-family: Poppins, sans-serif;
  text-decoration: none;

  border: none;
`;

export const ChatMessageContainer = styled.div`
  background: ${({theme}) => useNeutralColor(theme, '600')};
  min-height: 480px;
  margin: 1rem 0;
  padding: .5rem;
  overflow-y: auto;
`;

export const ChatMessageList = styled.ul`
  display: flex;
  flex-direction: column;
`;