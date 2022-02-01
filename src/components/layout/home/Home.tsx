import React, { ChangeEvent, FormEvent, SyntheticEvent, useCallback } from 'react';
import { useAuth } from '@contexts/auth';
import {
  HomeContainer,
  LoginContainer,
  LoginBox,
  LoginHeader,
  Title,
  Subtitle,
  LoginForm,
  LoginInput,
  LoginButton,
  ProfileContainer,
  UserImage,
  Username,
} from './style';
import useHomeReducer, { HomeActionType } from '@reducers/home';

const RemImage = '/images/avatar/RemUwU.png';

const Home: React.FC = () => {
  const [state, dispatch] = useHomeReducer();
  const { authenticate } = useAuth();

  const onImageError = useCallback(() => {
    dispatch({
      type: HomeActionType.FAILED_USERNAME
    });
  },[]);

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: HomeActionType.NEW_USERNAME,
      payload: { username: e.currentTarget.value }
    });
  },[]);

  const onLoad = useCallback((e: SyntheticEvent<HTMLImageElement, Event>) => {
    if (e.currentTarget.src.match(RemImage)) {
      return;
    }
    dispatch({
      type: HomeActionType.SUCCESS_USERNAME,
    });
  }, [])

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.error || state.loading) {
      return;
    }
    authenticate(state.username);
  }, [state]);

  return (
    <HomeContainer>
      <LoginBox>

        <LoginContainer>
          <LoginHeader>
            <Title>Boas vindas de volta!</Title>
            <Subtitle>Aluracord - Re:Zero</Subtitle>
          </LoginHeader>

          <LoginForm onSubmit={onSubmit}>
            <LoginInput 
              onChange={onInputChange} 
              value={state.username}
              placeholder='Digite um usuário'
            />
            <LoginButton disabled={state.error || state.loading}>Entrar</LoginButton>
          </LoginForm>
        </LoginContainer>

        <ProfileContainer>
          <UserImage 
            onError={onImageError}
            onLoad={onLoad}
            alt={`${state.username} - Github Avatar`} 
            src={(state.error) ? RemImage : `https://github.com/${state.username}.png`}
          />
          <Username>{(state.error) 
            ? 'Ram (¬‿¬)' 
            : (state.loading) 
            ? 'Carregando...' 
            : state.username}
          </Username>
        </ProfileContainer>
      </LoginBox>
    </HomeContainer>
  );
};

export default Home;
