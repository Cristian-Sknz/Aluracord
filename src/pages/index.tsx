import React from 'react'
import Head from 'next/head'
import Home from '@components/layout/home'

const Index = () => {
  return (
    <>
      <Head>
        <title>AluraCord - Imersão React</title>
      </Head>
      <>
        <Home/>
      </>
    </>
  )
}

export default Index;
