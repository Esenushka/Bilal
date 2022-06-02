import Head from 'next/head'
import Header from '../components/common/Header/Header'
import BlogPage from '../components/pages/BlogPage'

export default function blog() {
    return (
        <div>
            <Head>
                <title>Блог</title>
                <link rel='icon' href='/b2.svg' />
            </Head>
            <Header />
            <BlogPage />
        </div>
    )
}
