import { db } from "../../../config/firebase"
import DirectionSliderCard from '../DirectionSlider/DirectionSliderCard'
import Link from 'next/link'
import { useState, useEffect } from "react"
import Image from "next/image"
import KyrsCard from "../KyrsCard/KyrsCard"

export default function KyrsEdit() {
    const [directionList, setDirectionList] = useState([])
    const [directionCardList, setDirectionCardList] = useState([])

    useEffect(() => {
        db.collection("directionList")
            .get()
            .then((snapshot) => {

                const direction = []
                snapshot.forEach((doc) => {
                    direction.push({ ...doc.data(), id: doc.id })
                })
                setDirectionList(direction)
            })
        db.collection("directionCardList")
            .get()
            .then((snapshot) => {
                const directionCards = []
                snapshot.forEach((doc) => {
                    directionCards.push({ ...doc.data(), id: doc.id })
                })
                setDirectionCardList(directionCards)
            });

    }, [])

    return (
        <div className='kyrs-edit_wrapper'>
            <div className='direction-title'>
                Напровления Курсов
            </div>
            <div>
                {
                    <div className='direction_cards'>
                        {directionList.map((el) => <DirectionSliderCard key={el.id} {...el} />)}
                        <Link href={"/admin/direction/newDirection"}>
                            <div className="direction_card kyrs-card add ">
                                <div><Image
                                    width={100}
                                    height={100}
                                    src="/add.png"
                                    alt="addImage"
                                />
                                </div>
                                <div>
                                    <div>Добавить напровление</div>
                                    <div></div>
                                </div>
                            </div>
                        </Link>
                    </div>
                }

                <div className='response_direction container'>
                    {
                        directionList.map((el) => <Link key={el.id} href={"/admin/direction/" + el.id}>
                            <a>
                                <div>{el.direction}</div>
                                <div></div>
                            </a>
                        </Link>)
                    }
                    <Link href={"/admin/direction/newDirection"}>
                            <a>
                                <div>Добавить напровление</div>
                                <div></div>
                            </a>
                    </Link>
                </div>
            </div>
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
                        <Image
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
