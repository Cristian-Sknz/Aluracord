import React from 'react';
import Head from 'next/head';
import Chat from '@components/layout/chat';
import ChatProvider from 'src/contexts/chat';

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

export default ChatPage;
