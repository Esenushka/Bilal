import React from 'react'
import Slider from 'react-slick/lib/slider'
import DirectionSliderCard from './DirectionSliderCard'
import Link from 'next/link'
import { directionList } from '../../constants/directionList'

export default function DirectionSlider() {
    const settings = {
        dots: false,
        infinite: true,
        swipeToslide: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        slidesToShow: 4,
        centerPadding: "90px",
        centerMode: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    centerPadding: "70px"
                }

            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    centerPadding: "100px"
                }
            }
        ]
    }
    return (
        <div>
            <Slider className="direction_slider" {...settings}>
                {
                    directionList.map((el) => <DirectionSliderCard
                        key={el.id}
                        direction={el.direction}
                        url={el.url}
                        urlDirection={el.urlDirection}
                    />)
                }

            </Slider>
            <div className='response_direction container'>
                {
                    directionList.map((el) => <Link key={el.id} href={"kyrsy" + "$" + el.urlDirection}>
                        <a>
                            <div>{el.direction}</div>
                            <div></div>
                        </a>
                    </Link>)
                }
            </div>
        </div>
    )
}
