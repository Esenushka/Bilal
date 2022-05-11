import Slider from 'react-slick/lib/slider'
import { MainSliderList } from '../../constants/mainSliderList'
import MainSliderBlock from './MainSliderBlock'

export default function MainSlider() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        centerPadding: "240px",
        centerMode: true,
        slidesToShow: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    centerPadding: "110px"
                }
            },
            {
                breakpoint: 900,
                settings: {
                    centerMode: false,
                    centerPadding: 0,
                }
            }
        ]
    }
    return (
        <div className='main_wrapper'>
            <Slider {...settings}>
                {MainSliderList.map((el) =>
                    <MainSliderBlock key={el.id} url={el.url} name={el.name} des={el.des} />
                )}

            </Slider>
        </div>
    )
}
