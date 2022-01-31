import React, { ChangeEvent, FormEvent, SyntheticEvent, useCallback, useReducer } from 'react';
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

const RemImage = '/images/avatar/RemUwU.png';

type HomeReducerState = {
  username: string,
  error: boolean,
  loading: boolean;
}

type HomeAction = {
  type: HomeActionType;
  payload?: any;
}

enum HomeActionType {
  NEW_USERNAME = 'NEW_USERNAME',
  FAILED_USERNAME = 'FAILED_USERNAME',
  SUCCESS_USERNAME = 'SUCCESS_USERNAME',
}

const INITIAL_STATE: HomeReducerState = {
  error: true,
  loading: false,
  username: ''
}

const homeReducer: React.Reducer<HomeReducerState, HomeAction> = (state, action) => {
  switch (action.type) {
    case HomeActionType.FAILED_USERNAME: {
      return { ...state, error: true, loading: false }
    }
    case HomeActionType.NEW_USERNAME: {
      return { ...state, error: false, loading: true, username: action.payload.username }
    }
    case HomeActionType.SUCCESS_USERNAME: {
      return { ...state, error: false, loading: false }
    }
    default: {
      return state;
    }
  }
}

const Home: React.FC = () => {
  const [state, dispatch] = useReducer(homeReducer, INITIAL_STATE);
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
