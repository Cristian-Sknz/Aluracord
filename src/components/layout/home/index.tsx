import React from 'react';
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

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <LoginBox>

        <LoginContainer>
          <LoginHeader>
            <Title>Boas vindas de volta!</Title>
            <Subtitle>Aluracord - Alura Matrix</Subtitle>
          </LoginHeader>

          <LoginForm>
            <LoginInput />
            <LoginButton>Entrar</LoginButton>
          </LoginForm>
        </LoginContainer>

        <ProfileContainer>
          <UserImage src={'https://s3.getstickerpack.com/storage/uploads/sticker-pack/random-anime-pack-4/sticker_22.png?980c87d7addc8d89a8b7fd2440d0ed4f&d=200x200'}/>
          <Username>Cristian-SknZ</Username>
        </ProfileContainer>
      </LoginBox>
    </HomeContainer>
  );
};

export default Home;
