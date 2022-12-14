import Head from 'next/head'
import React from 'react'

interface Props {
    title: string
}

const Header = ({ title }: Props) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content="Generated by create-t3-app" />
            <link rel="icon" href="/favicon2.ico" />
        </Head>
    )
}

export default Header