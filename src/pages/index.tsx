import React from 'react'
import Head from 'next/head'
import Home from '@components/layout/home'
import { GetServerSideProps } from 'next'
import { destroyCookie, parseCookies } from 'nookies'
import Jwt from 'jsonwebtoken';

const Index = () => {
  return (
    <>
      <Head>
        <title>Aluracord - Imersão React</title>
      </Head>
      <>
        <Home/>
      </>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'aluracord-token' : token } = parseCookies(ctx);
  if (token) {
    try {
      Jwt.verify(token, process.env.APPLICATION_SECRET);
      return {
        redirect: {
          destination: '/chat',
          permanent: false,
        }
      }
    } catch (err) {
      destroyCookie(ctx, 'aluracord-token');
    }
  }
  return {
    props: {}
  }
}

export default Index;
