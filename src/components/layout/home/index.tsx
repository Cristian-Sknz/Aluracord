import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
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
  const [username, setUsername] = useState('Cristian-SknZ');
  const imageRef = useRef<HTMLImageElement>();

  const onImageError = useCallback(() => {
    imageRef.current.src = RemImage;
  },[imageRef])

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  },[]);


  return (
    <HomeContainer>
      <LoginBox>

        <LoginContainer>
          <LoginHeader>
            <Title>Boas vindas de volta!</Title>
            <Subtitle>Aluracord - Re:Zero</Subtitle>
          </LoginHeader>

          <LoginForm>
            <LoginInput 
              onChange={onInputChange} 
              value={username}
              placeholder='Digite um usuário'
            />
            <LoginButton disabled={username.length == 0}>Entrar</LoginButton>
          </LoginForm>
        </LoginContainer>

        <ProfileContainer>
          <UserImage 
            ref={imageRef} 
            onError={onImageError} 
            alt={username} 
            src={`https://github.com/${username}.png`}
          />
          <Username>{(username.length == 0) ? 'Ram (¬‿¬)' : username}</Username>
        </ProfileContainer>
      </LoginBox>
    </HomeContainer>
  );
};

export default Home;
