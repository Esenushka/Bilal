import Link from 'next/link'
import DirectionSlider from '../common/DirectionSlider/DirectionSlider'
import Lessons from '../common/Lessons/Lessons'
import MainSlider from '../common/MainSlider/MainSlider'
import Quiz from '../common/Quiz/Quiz'
import Image from "next/image"
import { useEffect, useState } from 'react'

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

    return (
        <div>
            <MainSlider />
            <div className='direction-title'>Напровления обучения</div>
            <DirectionSlider />
            <Link href={"#"}>
                <div className='btn-wrapper'>
                    <button className='btn'>Все курсы</button>
                </div>
            </Link>
            <Quiz />
            <Lessons />
            <div className='direction-title container'>НАШИ ДРУЗЬЯ И ПАРТНЁРЫ</div>
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
