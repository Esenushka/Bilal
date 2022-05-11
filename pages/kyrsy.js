import Head from 'next/head'
import React from 'react'
import Footer from '../components/common/Footer/Footer'
import Header from '../components/common/Header/Header'
import KyrsyPage from '../components/pages/KyrsyPage'

export default function kyrsy() {
    return (
        <div className='kyrs_wrapper'>
            <Head>
                <title>Курсы</title>
            </Head>
            <Header />
            <KyrsyPage />
            <Footer />
        </div>
    )
}
