import Header from '../Header/Header';
import Image from 'next/image';
import BlockTop from '../HeaderKyrsTop/HeaderKyrsTop';
import { useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
import { useRouter } from 'next/router';
import Preloader from '../Preloader/Preloader';

export default function KyrsCardInside({
    title,
    url,
    secondImgUrl,
    teachers,
    start,
    duration,
    price,
    register,
    freePlace,
    forWho,
    about,
    videoInvite
}) {
    const [comments, setComments] = useState([])
    const [commentName, setCommentName] = useState();
    const [comment, setComment] = useState();
    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter()
    const id = router.query?.id

    const send = (e) => {
        e.preventDefault();
        db.collection("directionCardList/" + id + "/comments").add({
            name: commentName,
            des: comment
        })
    };
    const submit = () => { };

    useEffect(() => {
        db.collection("directionCardList/" + id + "/comments")
            .get()
            .then((snapshot) => {
                setIsLoading(false)
                const commentData = []
                snapshot.forEach((doc) => {
                    commentData.push({ ...doc.data(), id: doc.id })
                })
                setComments(commentData)
            });
    }, [id]);

    if (isLoading) {
        return <Preloader full />
    }

    return (
        <div>
            <BlockTop />
            <Header />
            <div className="container">
                <div className="kyrs-card_main-block">
                    <Image
                        unoptimized
                        src={url || "/file-image.png"}
                        alt={'Главная картинка'}
                        width={300}
                        height={500}
                    />
                    <div className="kyrs-card_main-text">
                        <div className="kyrs-card-text_title">{title}</div>
                        <div className="kyrs-card-text_block">
                            <div>{teachers?.length > 1 ? 'Преподватели:' : 'Преподователь:'}</div>
                            <div>
                                {teachers?.map((el, index) => teachers?.length > 1 ? el + (index === teachers?.length - 1 ? "" : ", ") : el)}
                            </div>
                        </div>
                       {
                           register ? 
                                <div className="kyrs-card-text_block">
                                    <div>Регистрация открыта до:</div>
                                    <div>{new Date(register?.seconds * 1000).toLocaleDateString()}</div>
                                </div> : ""
                       }
                       {
                            start ? <div className="kyrs-card-text_block">
                                <div>Старт курса:</div>
                                <div>{new Date(start?.seconds * 1000).toLocaleDateString()}</div>
                            </div> : ""
                       }
                        <div className="kyrs-card-text_block">
                            <div>Длительность:</div>
                            <div>
                                {
                                    duration
                                }
                                {
                                    duration == 1 ? " час" : duration >= 2 || duration <=4 ? " часа" : " часов"
                                }
                            </div>
                        </div>
                        <div className="kyrs-card-text_block">
                            <div>Стоимость:</div>
                            <div>{price}</div>
                        </div>
                        <div className="kyrs-card-text_block">
                            <div>Свободные места:</div>
                            <div>{freePlace}</div>
                        </div>
                    </div>
                </div>
                <div className="direction-title">ВИДЕОПРИГЛАШЕНИЕ</div>
                <div className="video-invite">
                    <video
                        controls
                        width="920"
                        height="518"
                        src={videoInvite}
                    ></video>
                </div>
            </div>
            <div className="kyrs-card_info">
                <div className="container">
                    <div>
                        <Image
                            unoptimized
                            src={secondImgUrl || "/file-image.png"}
                            alt={'Второя картинка'}
                            width={600}
                            height={700}
                        />
                    </div>
                    <div className="kyrs-card_about">
                        <div className="kyrs-card_about-block">
                            <div className="kyrs-card_about-title">ДЛЯ КОГО ЭТОТ КУРС?</div>
                            <div className="kyrs-card_about-des">{forWho}</div>
                        </div>
                        <div className="kyrs-card_about-block">
                            <div className="kyrs-card_about-title">О КУРСЕ</div>
                            <div className="kyrs-card_about-des">{about}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="direction-title">ОТЗЫВЫ О КУРСЕ</div>
            <div className="comments_wrapper">
                {comments.length > 0 ? (
                    comments.map((el) => (
                        <div key={el.id} className="comment">
                            <div>
                                <div className="comment_name">{el.name}</div>
                            </div>
                            <div>{el.des}</div>
                        </div>
                    ))
                ) : (
                    <div className="comment comment-nothing">
                        <div className="comment_name">Пока еще не было комментариев</div>
                    </div>
                )
                }
            </div>
            <div className="comment-inputs_wrapper">
                <form onSubmit={send}>
                    <input
                        type={'text'}
                        onChange={(e) => setCommentName(e.target.value)}
                        value={commentName}
                        required
                        placeholder="Ваше имя"
                    />
                    <textarea
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        required
                        placeholder="Ваш комментарий..."></textarea>
                    <div className="btn-wrapper">
                        <button className="btn">Отправить</button>
                    </div>
                </form>
            </div>
            <div className="container">
                <div className="forma">
                    <Image unoptimized
                        src="https://animationschool.ru/wp-content/themes/as_underscores_theme/images/sh5.png"
                        alt="leftFormImage" width={300} height={500} />
                    <form onSubmit={submit}>
                        <div className="direction-title">ЗАПИСАТЬСЯ</div>
                        <input required type={'text'} placeholder="Введите ваше имя и фамлию" />
                        <input required type={'text'} placeholder="Введите ваш эл.адрес" />
                        <input required type={'text'} placeholder="Введите ваш телефон" />
                        <div>Откуда вы узнали о нашей школе?</div>
                        <select required>
                            <option  value="" disabled>
                                Нажмите и выбеите из списка
                            </option>
                            <option value="Самостоятельно - интернет, сайты">
                                Самостоятельно - интернет, сайты
                            </option>
                            <option value="Instagram">Instagram</option>
                            <option value="Самостоятельно - интернет, сайты">
                                Самостоятельно - интернет, сайты
                            </option>
                            <option value="Самостоятельно - интернет, сайты">
                                Самостоятельно - интернет, сайты
                            </option>
                            <option value="Другое">Другое</option>
                        </select>
                        <div>выберите из списка</div>
                        <div className="btn-wrapper">
                            <button className="btn">Отправить</button>
                        </div>
                        <label>
                            <input required defaultChecked type={'checkbox'} />
                            <div>
                                Нажимая на кнопку, вы даете
                                <a href="#"> согласие на обработку своих персональных данных</a>
                            </div>
                        </label>
                    </form>
                    <Image
                        unoptimized
                        src="https://animationschool.ru/wp-content/themes/as_underscores_theme/images/sh6.png"
                        alt="rightFormImage"
                        width={300}
                        height={500}
                    />
                </div>
            </div>
        </div>
    );
}
