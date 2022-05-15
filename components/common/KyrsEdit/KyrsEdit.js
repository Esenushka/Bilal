import { db } from "../../../config/firebase"
import DirectionSliderCard from '../DirectionSlider/DirectionSliderCard'
import Link from 'next/link'
import { useState, useEffect } from "react"
import Image from "next/image"

export default function KyrsEdit() {
    const [directionList, setDirectionList] = useState([])
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
                        <Link href={"/admin/dashboard/newKyrs"}>
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
                        directionList.map((el) => <Link key={el.id} href={"/kyrsy" + "$" + el.urlDirection}>
                            <a>
                                <div>{el.direction}</div>
                                <div></div>
                            </a>
                        </Link>)
                    }
                </div>
            </div>

        </div>
    )
}
