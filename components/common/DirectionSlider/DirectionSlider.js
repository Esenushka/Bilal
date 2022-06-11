import { useEffect, useState } from 'react'
import Slider from 'react-slick/lib/slider'
import DirectionSliderCard from './DirectionSliderCard'
import Link from 'next/link'
import { db } from "../../../config/firebase"

export default function DirectionSlider() {
    const [directionCardList, setDirectionCardList] = useState([])

    useEffect(() => {
        db.collection("directionCardList")
            .get()
            .then((snapshot) => {

                const direction = []
                snapshot.forEach((doc) => {
                    direction.push({ ...doc.data(), id: doc.id })
                })
                setDirectionCardList(direction.reverse())
            })
    }, [])
    const settings = {
        dots: false,
        infinite: true,
        swipeToslide: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        slidesToShow: 3,
        centerPadding: "90px",
        centerMode: true,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
                    centerPadding: "20px"
                }

            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    centerPadding: "100px"
                }

            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    centerPadding: "50px"
                }
            }
        ]
    }


    return (
        <div>
            <div className="direction_wrapper">
            {
                directionCardList?.length < 5 ? <div className='direction_cards'>
                    {directionCardList.map((el) => <DirectionSliderCard key={el.id} url={el.url}
                        direction={el.direction}
                        urlDirection={el.urlDirection}/>)}
                </div> :
                    <Slider className="direction_slider" {...settings}>
                        {
                            directionCardList.map((el) => <DirectionSliderCard
                                key={el.id}
                                url={el.url}
                                direction={el.direction}
                                urlDirection={el.urlDirection}
                            />)
                        }

                    </Slider>
            }
            </div>
            <div  className='response_direction container'>
                {
                    directionCardList.map((el) => <Link key={el.id} href={"/kyrsy" + "?" + el.urlDirection}>
                        <a >
                            <div>{el.direction}</div>
                            <div></div>
                        </a>
                    </Link>)
                }
            </div>
        </div>
    )
}
