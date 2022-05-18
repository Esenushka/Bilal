import Footer from '../../components/common/Footer/Footer'
import KyrsCardInside from '../../components/common/KyrsCard/KyrsCardInside'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from "next/head"
import { db } from '../../config/firebase'

export default function KyrsCard() {
    const [directionCardList, setDirectionCardList] = useState([])

    const router = useRouter()
    const id = router.query?.id

    useEffect(() => {
        db.collection("directionCardList")
            .get()
            .then((snapshot) => {
                const directionCards = []
                snapshot.forEach((doc) => {
                    directionCards.push({ ...doc.data(), id: doc.id })
                })
                directionCards.forEach((el) => el.id === id ? setDirectionCardList(el) : false)
            });
    }, [id]);

    return (
        <div>
            <Head>
                <title>{directionCardList.title}</title>
            </Head>
            <KyrsCardInside {...directionCardList} />
            <Footer />
        </div>
    )
}
