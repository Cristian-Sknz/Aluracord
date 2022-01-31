import React from 'react';
import Head from 'next/head';
import Home from '@components/layout/home';
import { GetServerSideProps } from 'next';
import { isValidToken } from '@contexts/auth';

const Index = () => {
  return (
    <>
      <Head>
        <title>Aluracord - Imersão React</title>
      </Head>
      <>
        <Home />
      </>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (isValidToken(ctx)) {
    return {
      redirect: {
        destination: '/chat',
        permanent: false,
      },
    };
  }
  return { props: {} };
};

export default Index;
