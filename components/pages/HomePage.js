import Link from 'next/link'
import DirectionSlider from '../common/DirectionSlider/DirectionSlider'
import Lessons from '../common/Lessons/Lessons'
import MainSlider from '../common/MainSlider/MainSlider'
import Quiz from '../common/Quiz/Quiz'
import Image from "next/image"
import { useEffect, useState } from 'react'
import { db } from '../../config/firebase'

export default function HomePage() {

    const [directionCardList, setDirectionCardList] = useState([])

    useEffect(() => {
        db.collection("directionCardList")
            .get()
            .then((snapshot) => {
                const direction = []
                snapshot.forEach((doc) => {
                    direction.push({ ...doc.data(), id: doc.id })
                })
                setDirectionCardList(direction)
            })
    }, [])

    return (
        <div>
            <MainSlider directionCardList={directionCardList} />
            <div className='direction-title'>Направления обучения</div>
            <DirectionSlider />
            <div className='btn-wrapper'>
                <Link href={"/kyrsy "}>
                    <button className='btn'>Все курсы</button>
                </Link>
            </div>
            <div className='main-video container'>
                <video
                    src='/mainVideo.mp4'
                    controls
                    poster='/poster.png'
                    width={920}
                    height={520}
                >
                </video>
            </div>
            <Quiz />
            <Lessons />
            <div className='container'>
                <div className='step_wrapper'>
                    <div className='direction-title'>
                        ШАГНИТЕ В МИР ИСКУССТВО
                    </div>
                    <div className='studios_des'>
                        Выберите курс или пройдите опрос
                    </div>
                    <div className='btn_wrapper step-btn'>
                        <Link href="/kyrsy">
                            <button className='btn'>ВЫБРАТЬ КУРС</button>
                        </Link>
                        <a href='#quiz'>
                            <button className='btn'>ПРОЙТИ ОПРОС</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
