import React from 'react';
import Head from 'next/head';
import Chat from '@components/layout/chat/Chat';
import ChatProvider from 'src/contexts/chat';

import { GetServerSideProps } from 'next';
import { isValidToken } from '@contexts/auth';

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
  if (!isValidToken(ctx)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
  return {props: {}};
}

export default ChatPage;
