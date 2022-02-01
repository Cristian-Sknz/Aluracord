import { useNeutralColor } from '@styles/global';
import styled from 'styled-components';

export const MessageToolsContainer = styled.div`
  position: absolute;
  display: none;
  right: 20px;
  background: ${({theme}) => useNeutralColor(theme, '500')};
  padding: .3rem;
  border-radius: .5rem;
`;

export const ChatMessageItem = styled.li`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: .5rem;
  transition: 500ms;

  :hover {
    background: rgba(0, 0, 0, 0.15);
    transition: 500ms;
    & ${MessageToolsContainer} {
      display: block;
    }
  }
`;

export const MessageDetails = styled.div`
  display: flex;
  align-items: center;
`;

export const MessageAuthor = styled.div`
  display: flex;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 35px;
  border-radius: 50%;
`;

export const Author = styled.h5`
  margin: 0 .5rem;
  color: ${({theme}) => useNeutralColor(theme, '050')};
  font-weight: 500;
  font-family: Poppins, sans-serif;


  display: inline;
`;

export const MessageDate = styled.span`
  color: ${({theme}) => useNeutralColor(theme, '300')};
  font-size: .85rem;
  font-family: Poppins, sans-serif;
`;

export const IsEdited = styled.span`
  color: ${({theme}) => useNeutralColor(theme, '300')};
  font-size: .6rem;
  font-family: Poppins, sans-serif;
  display: none;
  margin: 0 .2rem;
  &.edited {
    display: inline;
  }
`;

export const MessageContainer = styled.div`
  margin: .3rem 0;
  padding: 0 .3rem;
  margin-left: 2.5rem;
`;

export const MessageLine = styled.p`
  display: inline-block;
  color: ${({theme}) => useNeutralColor(theme, '050')};
  font-weight: 300;
  line-break: anywhere;
  line-height: 1.2;
  max-width: 900px;
  margin: 0;
`;

export const ToolsList = styled.ul`
  display: flex;
`;

export const Tools = styled.li`
  color: ${({theme}) => useNeutralColor(theme, '050')};
  padding: .4rem;
  border-radius: .5rem;
  cursor: pointer;
  :hover {
    background: ${({theme}) => useNeutralColor(theme, '700')};
  }
`;

export const ChangeActionDisplay = styled.div`
  background-color: ${({ theme }) => useNeutralColor(theme, '800')};
  color: ${({ theme }) => useNeutralColor(theme, '300')};
  font-size: .9rem;
  font-weight: 300;
  padding: .3rem;
  border-radius: .5rem .5rem 0 0;
  position: relative;
  top: -.5rem;
`;

export const ChangeActionCancelButton = styled.button`
  margin: 0 .3rem;
  padding: .1rem .2rem;
  border: none;
  color: ${({ theme }) => useNeutralColor(theme, '050')};
  background: transparent;
  cursor: pointer;
  & * {
    vertical-align: bottom;
  }
`;