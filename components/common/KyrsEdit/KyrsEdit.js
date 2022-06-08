import { db } from "../../../config/firebase"
import Link from 'next/link'
import { useState, useEffect } from "react"
import Image from "next/image"
import KyrsCard from "../KyrsCard/KyrsCard"
import Preloader from "../Preloader/Preloader"

export default function KyrsEdit() {
    const [directionCardList, setDirectionCardList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        db.collection("directionCardList")
            .get()
            .then((snapshot) => {
                setIsLoading(false)
                const directionCards = []
                snapshot.forEach((doc) => {
                    directionCards.push({ ...doc.data(), id: doc.id })
                })
                setDirectionCardList(directionCards)
            });

    }, [])

    if(isLoading){
        return <Preloader full/>
    }

    return (
        <div className='kyrs-edit_wrapper'>
          
            <div className="direction-title">
                Курсы
            </div>
            <div className="kyrs-cards_wrapper">
               {
                        directionCardList.map((el) =>
                            <KyrsCard key={el.id} {...el} /> 
                        )
               }
                <Link href={"/admin/kyrs/newKyrs"}>
                    <div className="kyrs-card edit-card-add">
                        <Image loading="eager"
                            src={"/add.png"}
                            alt="addImg"
                            width={350}
                            height={515}
                        />
                    </div>
                </Link>
            </div>
        </div>
    )
}
