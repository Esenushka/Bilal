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
        centerPadding: "0px",
        centerMode: true,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    centerPadding: "0px"
                }
            },
            {
                breakpoint: 900,
                settings: {
                    centerMode: true,
                    centerPadding: "220px",
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    centerMode: false,
                    centerPadding: 0,
                    slidesToShow: 1,
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
