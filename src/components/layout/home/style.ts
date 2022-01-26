import styled from 'styled-components';
import { useNeutralColor, usePrimaryColor } from '@styles/global';

export const HomeContainer = styled.div`
  background-color: ${({theme}) => theme.colors.background};
  background-image: url('/images/background/rezero-minimalist.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    '. . . .'
    '. login-area login-area .'
    '. . . .';
  justify-items: center;
  align-items: center;
`;

export const LoginBox = styled.div`
  & {
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-area: login-area;
  }
  background-color: ${({theme}) => useNeutralColor(theme, 700)};
  box-shadow: 0px 0px 3px 1px ${({theme}) => useNeutralColor(theme, 500)};

  border-radius: .3rem;
  width: 100%;
  max-width: 700px;
  min-width: 515px;
  min-height: 300px;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    min-width: 175px;
    padding: 2rem;
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 2rem;
  align-items: stretch;
  max-width: 318px;

  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

export const LoginHeader = styled.header`
  margin: 1.5rem 0;
  line-height: 1.3;
  text-align: center;
`;

export const Title = styled.h2`
  color: ${({theme}) => useNeutralColor(theme, '050')};
  font-size: 1.4rem;
  font-weight: 700;
`;

export const Subtitle = styled.h5`
  color: ${({theme}) => useNeutralColor(theme, 400)};
  font-weight: 700;
  font-size: 0.85rem;
`;

export const LoginForm = styled.form``;

export const LoginInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  padding-left: 5px;

  background: ${({theme}) => useNeutralColor(theme, 800)};
  color: ${({theme}) => useNeutralColor(theme, '050')};
  border: 1px solid ${({theme}) => useNeutralColor(theme, 999)};
  border-radius: 0.35rem;

  font-family: Poppins, sans-serif;

  :focus-visible {
    outline: none;
    border: 1px solid #00d5ff;
  }
`;

export const LoginButton = styled.button`
  display: block;
  font-family: Roboto, sans-serif;
  color: ${({theme}) => useNeutralColor(theme, '050')};
  background: ${({theme}) => usePrimaryColor(theme, 700)};
  border: none;
  user-select: none;

  border-radius: 0.35rem;
  margin: 1rem 0;
  width: 100%;
  padding: 0.5rem;

  :hover {
    :disabled {
      cursor: not-allowed;
      background: ${({theme}) => useNeutralColor(theme, '500')};
    }
    cursor: pointer;
    background: ${({theme}) => usePrimaryColor(theme, 600)};
    transition: 500ms;
  }
  :focus {
    background: ${({theme}) => usePrimaryColor(theme, 800)};
    transition: 500ms;
  }
  transition: 500ms;
`;

export const ProfileContainer = styled.div`
  & {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  margin: 0 5%;
  padding: 1rem;
  background-color: ${({theme}) => useNeutralColor(theme, 800)};
  border: 1px solid ${({theme}) => useNeutralColor(theme, 999)};
  border-radius: 0.8rem;
`;

export const UserImage = styled.img`
  max-width: 155px;
  border-radius: 50%;
`;

export const Username = styled.p`
  color: ${({theme}) => useNeutralColor(theme, '050')};
  background: ${({theme}) => useNeutralColor(theme, 999)};
  font-family: Poppins, sans-serif;
  font-size: 0.8rem;

  padding: 0.4rem;
  border-radius: 1rem;
  margin-top: 1.5rem;
`;
