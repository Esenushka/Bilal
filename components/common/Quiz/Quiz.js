import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image'


export default function Quiz() {
    const settings = {
        dots: false,
        infinite: false,
        swipe: false,
        speed: 500,
        slidesToShow: 1,
        centerPadding: "300px",
        centerMode: true,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    centerPadding: "140px"
                }

            },
            {
                breakpoint: 960,
                settings: {
                    centerPadding: "0px"
                }
            }
        ]
    }
    return (
        <Slider className='quiz' {...settings}>
            <div id="quiz" className='quiz_block'>
                <div className='quiz_title'>ТОЛЬКО НАЧИНАЕТЕ СВОЙ ПУТЬ В ИНДУСТРИИ?</div>
                <div className='quiz_des'>
                    Пройдите квиз и узнайте, какая профессия
                    подходит вам!
                </div>
                <video width="327" height="292" preload="auto" autoPlay="autoplay" muted={true}> <source type="video/mp4" src="https://animationschool.ru/wp-content/themes/as_underscores_theme/video/quiz_circle.mp4" /></video>
                <div className='btn-wrapper '>
                    <button className='btn quiz-btn'>
                        НАЧАТЬ
                    </button>
                </div>
            </div>
            <div className='quiz_block'>
                <div className='quiz_title'>ВОПРОС №1</div>
                <div className='quiz_des'>
                    Что вы любите больше:
                    мультфильмы или видео-игры?
                </div>
                <div className='label_wrapper'>
                    <label>
                        <div>Определенно мультфильмы</div>
                        <input defaultChecked name='radio1' type={"radio"} />
                        <span className='checkmark'></span>
                    </label>
                    <label>
                        <div>Определенно мультфильмы</div>
                        <input name='radio1' type={"radio"} />
                        <span className='checkmark'></span>
                    </label>
                    <label>
                        <div>Определенно мультфильмы</div>
                        <input name='radio1' type={"radio"} />
                        <span className='checkmark'></span>
                    </label>
                </div>
                <div className='btn-wrapper '>
                    <button className='btn quiz-btn'>
                        ДАЛЕЕЕ
                    </button>
                </div>
            </div>
            <div className='quiz_block'>
                <div className='quiz_title'>ВОПРОС №2</div>
                <div className='quiz_des'>
                    Что вы любите больше:
                    мультфильмы или видео-игры?
                </div>
                <div className='label_wrapper'>
                    <label>
                        Определенно мультфильмы
                        <input defaultChecked name='radio2' type={"radio"} />
                        <span className='checkmark'></span>
                    </label>
                    <label>
                        Определенно мультфильмы
                        <input name='radio2' type={"radio"} />
                        <span className='checkmark'></span>
                    </label>
                    <label>
                        Определенно мультфильмы
                        <input name='radio2' type={"radio"} />
                        <span className='checkmark'></span>
                    </label>
                </div>
                <div className='btn-wrapper '>
                    <button className='btn quiz-btn'>
                        ДАЛЕЕЕ
                    </button>
                </div>
            </div>
            <div className='quiz_block'>
                <div className='quiz_title'>ВОПРОС №3</div>
                <div className='quiz_des'>
                    Что вы любите больше:
                    мультфильмы или видео-игры?
                </div>
                <div className='label_wrapper'>
                    <label>
                        Определенно мультфильмы
                        <input defaultChecked name='radio3' type={"radio"} />
                        <span className='checkmark'></span>
                    </label>
                    <label>
                        Определенно мультфильмы
                        <input name='radio3' type={"radio"} />
                        <span className='checkmark'></span>
                    </label>
                    <label>
                        Определенно мультфильмы
                        <input name='radio3' type={"radio"} />
                        <span className='checkmark'></span>
                    </label>
                </div>
                <div className='btn-wrapper '>
                    <button className='btn quiz-btn'>
                        ДАЛЕЕЕ
                    </button>
                </div>
            </div>
            <div className='quiz_block'>
                <div className='quiz_title'>ВОПРОС №4</div>
                <div className='quiz_des'>
                    Что вы любите больше:
                    мультфильмы или видео-игры?
                </div>
                <div className='label_wrapper'>
                    <label>
                        Определенно мультфильмы
                        <input defaultChecked name='radio4' type={"radio"} />
                        <span className='checkmark'></span>
                    </label>
                    <label>
                        Определенно мультфильмы
                        <input name='radio4' type={"radio"} />
                        <span className='checkmark'></span>
                    </label>
                    <label>
                        Определенно мультфильмы
                        <input name='radio4' type={"radio"} />
                        <span className='checkmark'></span>
                    </label>
                </div>
                <div className='btn-wrapper '>
                    <button className='btn quiz-btn'>
                        ДАЛЕЕЕ
                    </button>
                </div>
            </div>
            <div className='quiz_block'>
                <div className='quiz_title'>ВОПРОС №5</div>
                <div className='quiz_des'>
                    Что вы любите больше:
                    мультфильмы или видео-игры?
                </div>
                <div className='label_wrapper'>
                    <label>
                        Определенно мультфильмы
                        <input defaultChecked name='radio5' type={"radio"} />
                        <span className='checkmark'></span>
                    </label>
                    <label>
                        Определенно мультфильмы
                        <input name='radio5' type={"radio"} />
                        <span className='checkmark'></span>
                    </label>
                    <label>
                        Определенно мультфильмы
                        <input name='radio5' type={"radio"} />
                        <span className='checkmark'></span>
                    </label>
                </div>
                <div className='btn-wrapper '>
                    <button className='btn quiz-btn'>
                        ДАЛЕЕЕ
                    </button>
                </div>
            </div>
            <div className='quiz_block'>
                <div className='quiz_title'>ВОЗМОЖНО ВАС ПОДОЙДЕТ</div>
                <div className='quiz_card'>
                    <Image width={320} height={350} src="/card.jpg" alt="card" />
                    <div className='quiz_card-info'>
                        <div className='quiz_card-title'>
                            3D аниматор в мультфильмах
                        </div>
                        <div className='quiz_card-des'>
                            Изучаем 3D-анимацию с нуля и до стажировки на студии
                        </div>
                        <div className='quiz_card-teachers'>
                            <div className='quiz_card-name'>Преподаватели:</div>
                            Алексей Медведев, Владислав Калинин, Арсений Тургулайнен,
                            Ксения Куценко, Владимир Загоруйко, Василиса Тузова,
                            Глеб Ясиницкий, Василий Бурьяк, Владислав Храпко
                        </div>
                        <div className='quiz_card-start'>
                            <div className='quiz_card-name'>Старт первого курса:</div>
                            4 июня 2022
                        </div>
                        <div className='quiz_card-place'>
                            <div className='quiz_card-name'>Свободные места:</div>
                            Есть
                        </div>
                    </div>
                </div>
            </div>


        </Slider>
    )
}
