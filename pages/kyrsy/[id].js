import Footer from '../../components/common/Footer/Footer'
import KyrsCardInside from '../../components/common/KyrsCard/KyrsCardInside'
import { useState, useEffect } from 'react'
import { directionCardList } from '../../components/constants/directionCardList'
import { useRouter } from 'next/router'
import Head from "next/head"

export default function KyrsCard() {
    const [data, setData] = useState({})
    const router = useRouter()
    const id = router.query?.id
    useEffect(() => {
        directionCardList.forEach((el) => el.id == id ? setData(el) : false)
    }, [id]);
    return (
        <div>
            <Head>
                <title>{data.title}</title>
            </Head>
            <KyrsCardInside title={data.title} />
            <Footer />
        </div>
    )
}
