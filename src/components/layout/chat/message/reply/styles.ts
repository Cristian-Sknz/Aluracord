import { useNeutralColor } from '@styles/global';
import styled, { css } from 'styled-components';

export const ReplyArrow = css`
  content: '';
  position: relative;
  width: 1.9rem;
  height: 10px;

  top: 3px;
  margin-left: 0.7rem;
  margin-right: 0.3rem;
  border: 3px solid ${({ theme }) => useNeutralColor(theme, '800')};
  border-right: 0;
  border-bottom: 0;
  border-radius: 0.5rem 0 0 0rem;
  transition: 300ms;

  @media screen and (max-width: 425px) {
    width: 10px;
    transition: 300ms;
  }

  @media screen and (max-width: 330px) {
    display: none;
  }
`;

export const ReplyContainer = styled.div`
  display: flex;
  align-items: center;

  opacity: 0.7;
  border-radius: 0.6rem;
  padding: 0.2rem 0.3rem;
  transition: 300ms;
  font-size: 0.8rem;

  ::before {
    ${ReplyArrow}
  }
`;

export const ReplyDetails = styled.div`
  display: flex;
  align-items: center;
`;

export const ReplyUserAvatar = styled.img`
  width: 19px;
  border-radius: 50%;
`;

export const ReplyUsername = styled.span`
  color: ${({ theme }) => useNeutralColor(theme, '300')};
  margin-left: 0.3rem;
`;

export const ReplyMessage = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 300px;
  width: 30vw;

  margin: 0 0.3rem;
  display: inline-block;
  color: ${({ theme }) => useNeutralColor(theme, '200')};
`;
