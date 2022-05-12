import Header from '../Header/Header';
import Image from "next/image"
import { useEffect } from 'react';

export default function KyrsCardInside({title}) {
   console.log(title);
    return (
        <div>
            <div className='header-kyrs_wrapper'>
                <div className='header-kyrs'>
                    <Image
                        loader={() => "//animationschool.ru/wp-content/themes/as_underscores_theme/css/../images/ha1.png"}
                        src="//animationschool.ru/wp-content/themes/as_underscores_theme/css/../images/ha1.png"
                        alt='header-kyrs_left'
                        width={1000}
                        height={200}
                    />

                    <div className='btn_wrapper'>
                        <button className='btn'>
                            ЗАПИСАТЬСЯ НА КУРС
                        </button>
                    </div>

                    <Image
                        loader={() => "//animationschool.ru/wp-content/themes/as_underscores_theme/css/../images/ha2.png"}
                        src="//animationschool.ru/wp-content/themes/as_underscores_theme/css/../images/ha2.png"
                        alt='header-kyrs_left'
                        width={1000}
                        height={200}
                    />
                </div>
            </div>
            <Header />
            <div className='container'>
                <div className='kyrs-card_main-block'>
                    {/* <Image
                    loader={()=>imgUrl}
                    src={imgUrl} layout="fill"
                    alt='test'/> */}
                </div>
            </div>
        </div>
    )
}
