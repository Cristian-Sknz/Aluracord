import React from 'react';
import Head from 'next/head';
import Chat from '@components/layout/chat';
import ChatProvider from 'src/contexts/chat';

import { parseCookies, destroyCookie } from 'nookies';
import { GetServerSideProps } from 'next';
import Jwt from 'jsonwebtoken';

const ChatPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Aluracord - Chat App</title>
      </Head>
      <ChatProvider>
        <Chat />
      </ChatProvider>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'aluracord-token' : token } = parseCookies(ctx);
  if (token) {
    try {
      Jwt.verify(token, process.env.APPLICATION_SECRET);
      return {
        props: {}
      }
    } catch (err) {
      destroyCookie(ctx, 'aluracord-token');
    }
  }
  return {
    redirect: {
      destination: '/',
      permanent: false,
    }
  }
}

export default ChatPage;
