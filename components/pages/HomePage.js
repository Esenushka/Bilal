import Link from 'next/link'
import DirectionSlider from '../common/DirectionSlider/DirectionSlider'
import Lessons from '../common/Lessons/Lessons'
import MainSlider from '../common/MainSlider/MainSlider'
import Quiz from '../common/Quiz/Quiz'
import Image from "next/image"
import { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import Preloader from '../common/Preloader/Preloader'

export default function HomePage() {
    const [offset, setOffset] = useState();
    const [innerWidth, setInnerWidth] = useState(0)


    const handleScroll = () => setOffset(window.pageYOffset);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    })

    useEffect(() => {
        setInnerWidth(window.innerWidth)
    }, [])

    const [directionCardList, setDirectionCardList] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        db.collection("directionCardList")
            .get()
            .then((snapshot) => {
                setIsLoading(false)
                const direction = []
                snapshot.forEach((doc) => {
                    direction.push({ ...doc.data(), id: doc.id })
                })
                setDirectionCardList(direction)
            })
    }, [])

    if (isLoading) {
        return <Preloader full />
    }

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
                    {innerWidth > 990 ? <Image className={'fade_left ' + (innerWidth > 1200 ? (offset > 3500 ? "active" : "") : (offset > 4100 ? "active" : ""))} width={270} height={270} src={"/sh1.png"} alt="sh1" /> : ""}
                    <div className='direction-title'>
                        ШАГНИТЕ В МИР АНИМАЦИИ
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
                    {innerWidth > 990 ? <Image className={'fade_right ' + (innerWidth > 1200 ? (offset > 3500 ? "active" : "") : (offset > 4100 ? "active" : ""))} width={250} height={250} src={"/sh2.png"} alt="sh2" /> : ""}
                </div>
            </div>
        </div>
    )
}
