import Head from 'next/head'
import React from 'react'
import Header from '../components/common/Header/Header'
import KyrsyPage from '../components/pages/KyrsyPage'

export default function kyrsy() {
    return (
        <div className='kyrs_wrapper'>
            <Head>
                <title>Курсы</title>
             <link rel='icon' href='/b2.svg' />
            </Head>
            <Header />
            <KyrsyPage />
        </div>
    )
}
