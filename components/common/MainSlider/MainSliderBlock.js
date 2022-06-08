import Image from 'next/image'
import Link from 'next/link'

export default function MainSliderBlock({ url, name, des,id }) {
    return (
        <div className="main_slider-block">
            <Image loading="eager"
                unoptimized
                width={1000}
                height={1000}
                src={url} alt="MainSlide" />
            <div>
                <div className='main_slider-block_name'>{name}</div>
                <div className='main_slider-block_des'>
                    {des}
                </div>
                <Link href={"/kyrsy/" + id}>
                    <a>
                        <div>О Курсе</div>
                        <div></div>
                    </a>
                </Link>
            </div>
        </div>
    )
}
