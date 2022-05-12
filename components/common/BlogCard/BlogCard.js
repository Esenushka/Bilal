import React from 'react'
import Image from "next/image"


export default function BlogCard() {
    return (
        <div className='blog-card'>
            <Image
                loader={() => "https://animationschool.ru/wp-content/uploads/2021/11/3-800300-536x200.jpg"}
                width={550} height={220} src="https://animationschool.ru/wp-content/uploads/2021/11/3-800300-536x200.jpg" alt='blog' />
            <div className='blog-text'>
                <div>
                    Мы запускаем AnimationClub фонд – помощь авторам в реализации анимационных проектов
                </div>
                <div>
                    Мы хотим, чтобы у авторов появилась возможность получать деньги на реализацию своих проектов. Это основная задача фонда.
                </div>
            </div>
        </div>
    )
}
