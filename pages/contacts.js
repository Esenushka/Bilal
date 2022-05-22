import Head from "next/head"
import Footer from "../components/common/Footer/Footer"
import Header from "../components/common/Header/Header"
import ContactsPage from "../components/pages/ContactsPage"

export default function contacts() {
    return (
        <div>
            <Head>
                <title>Контакты</title>
                <link rel='icon' href='/b2.png' />

            </Head>
            <Header/>
            <ContactsPage/>
            <Footer/>
        </div>
    )
}
