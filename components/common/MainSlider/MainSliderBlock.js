import Image from 'next/image'
import Link from 'next/link'

export default function MainSliderBlock({ url, name, des }) {
    return (
        <div className="main_slider-block">
            <Image
                unoptimized
                width={1000}
                height={1000}
                src={"/photo1.jpg"} alt="MainSlide" />
            <div>
                <div className='main_slider-block_name'>{name}</div>
                <div className='main_slider-block_des'>
                    {des}
                </div>
                <Link href={"#"}>
                    <a>
                        <div>О Курсе</div>
                        <div></div>
                    </a>
                </Link>
            </div>
        </div>
    )
}
