import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
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

const Home: React.FC = () => {
  const [username, setUsername] = useState<string>('Cristian-SknZ');
  const [error, setError] = useState<boolean>(false);
  const { authenticate } = useAuth();

  const onImageError = useCallback(() => {
    setError(true);
  },[]);

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (username.length == 0) {
      setError(true)
      setUsername(e.currentTarget.value);
      return;
    }
    setError(false);
    setUsername(e.currentTarget.value);
  },[]);

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authenticate(e.target[0].value)
  },[]);

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
              value={username}
              placeholder='Digite um usuário'
            />
            <LoginButton disabled={error}>Entrar</LoginButton>
          </LoginForm>
        </LoginContainer>

        <ProfileContainer>
          <UserImage 
            onError={onImageError}
            alt={`${username} - Github Avatar`} 
            src={(error) ? RemImage : `https://github.com/${username}.png`}
          />
          <Username>{(error) ? 'Ram (¬‿¬)' : username}</Username>
        </ProfileContainer>
      </LoginBox>
    </HomeContainer>
  );
};

export default Home;
