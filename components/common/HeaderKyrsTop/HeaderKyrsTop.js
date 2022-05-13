import Image from "next/image"
import { useState } from "react"

export default function HeaderKyrsTop() {
    const [active, setActive] = useState(false)

    return (
        <>
            <div className='header-kyrs_wrapper'>
                <div className='header-kyrs'>
                    <Image
                    unoptimized
                       
                        src="//animationschool.ru/wp-content/themes/as_underscores_theme/css/../images/ha1.png"
                        alt='header-kyrs_left'
                        width={1000}
                        height={200}
                    />

                    <div className='btn_wrapper'>
                        <button onClick={() => setActive(!active)} className='btn'>
                            ЗАПИСАТЬСЯ НА КУРС
                        </button>
                    </div>

                    <Image
                    unoptimized
                      
                        src="//animationschool.ru/wp-content/themes/as_underscores_theme/css/../images/ha2.png"
                        alt='header-kyrs_left'
                        width={1000}
                        height={200}
                    />
                </div>
            </div>
            <div onClick={() => setActive(false)} className={"block-top_modal " + (active ? "active" : "")}>
                <div onClick={(e)=>e.stopPropagation()} className='forma block-top_form'>
                    <form>
                        <div className='direction-title'>
                            ЗАПИСАТЬСЯ
                        </div>
                        <input required type={"text"} placeholder="Введите ваше имя и фамлию" />
                        <input required type={"text"} placeholder="Введите ваш эл.адрес" />
                        <input required type={"text"} placeholder="Введите ваш телефон" />
                        <div>
                            Откуда вы узнали о нашей школе?
                        </div>
                        <select required>
                            <option selected value="" disabled>Нажмите и выбеите из списка</option>
                            <option value="Самостоятельно - интернет, сайты">Самостоятельно - интернет, сайты</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Самостоятельно - интернет, сайты">Самостоятельно - интернет, сайты</option>
                            <option value="Самостоятельно - интернет, сайты">Самостоятельно - интернет, сайты</option>
                            <option value="Другое">Другое</option>
                        </select>
                        <div>выберите из списка</div>
                        <div className='btn-wrapper'>
                            <button className='btn'>
                                Отправить
                            </button>
                        </div>
                        <label>
                            <input required defaultChecked type={"checkbox"} />
                            <div>
                                Нажимая на кнопку, вы даете
                                <a href='#'>
                                    {" "}
                                    согласие на обработку своих персональных данных
                                </a>
                            </div>
                        </label>
                    </form>
                </div>
            </div>
        </>
    )
}
