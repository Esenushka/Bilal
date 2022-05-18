import Image from 'next/image';
import { useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
import { useRouter } from 'next/router';
import Link from "next/link"

export default function KyrsEditCard() {
    const [comments, setComments] = useState([]);
    const [registerDate, setRegisterDate] = useState("")
    const [newData, setNewData] = useState({})
    const [startDate, setStartDate] = useState("")
    const [deleted, setDeleted] = useState(0)
    const [active, setActive] = useState(false)
    const [directionCardList, setDirectionCardList] = useState({})
    const [teachers, setTeachers] = useState([])

    const {
        title, imgUrl, secondImgUrl, start, duration,
        price, register, freePlace, forWho, about, videoInvite
    } = directionCardList

    const router = useRouter()
    const id = router.query?.id

    useEffect(() => {
        db.collection("directionCardList")
            .get()
            .then((snapshot) => {
                const directionCard = []
                snapshot.forEach((doc) => {
                    directionCard.push({ ...doc.data(), id: doc.id })
                })
                setDirectionCardList(directionCard.find((el) => el.id === id))
                setTeachers(directionCard.find((el) => el.id === id)?.teachers)
            });
    }, [id]);

    useEffect(() => {
        db.collection("directionCardList/" + id + "/comments")
            .get()
            .then((snapshot) => {
                const commentData = []
                snapshot.forEach((doc) => {
                    commentData.push({ ...doc.data(), id: doc.id })
                })
                setComments(commentData)
            });
    }, [id, deleted]);

    const getDate = (el, setDate) => {
        const day = new Date(el?.seconds * 1000).getDate();
        const month = new Date(el?.seconds * 1000).getMonth() + 1
        const year = new Date(el?.seconds * 1000).getFullYear()
        const date = year + "-" + (month < 10 ? "0" + month : month) + "-" + day
        setDate(date)
    }
    useEffect(() => {
        getDate(register, setRegisterDate)
        getDate(start, setStartDate)
    }, [register, start])

    const deleteComment = (commentId) => {
        let res = confirm("Вы уверены?")
        if (res) {
            db.collection("directionCardList/" + id + "/comments/")
                .doc(commentId)
                .delete();
            setDeleted(deleted + 1)

        }
    }

    const submit = (e) => {
        e.preventDefault()
        const data = {
            ...newData,
            teachers: teachers
        }

        for (let key in data) {
            if (data[key]) {
                db.collection("directionCardList").doc(id).update({ [key]: data[key] })
                setActive(true)
            }
        }

        setTimeout(() => {
            setActive(false)
        }, 6000)
    }

    const removeTeacher = (teacherIndex) => {
        const filtered = teachers.filter((el, index) => teacherIndex !== index)
        setTeachers(filtered)

    }

    const addTeacher = (e, index) => {
        teachers[index] = e.target.value
        setTeachers([...teachers])
    }

    return (
        <form onSubmit={submit} className='kyrs-edit-card'>
            <Link href="/admin/dashboard">
                <div className='back-to-dasboard'>
                    <Image
                        unoptimized
                        width={40}
                        height={40}
                        alt='arrow'
                        src={"/right-arrow.png"}
                    />
                </div>
            </Link>
            <div className="container">
                <div>
                    <input type={"file"} />
                </div>
                <div className="kyrs-card_main-block edit-card">
                    <Image
                        unoptimized
                        src={imgUrl || "/file-image.png"}
                        alt={'Главная картинка'}
                        width={300}
                        height={500}
                    />
                    <div className="kyrs-card_main-text">
                        <div className="kyrs-card-text_title">
                            <input
                                onChange={(e) => { setNewData({ ...newData, title: e.target.value }) }}
                                required
                                type={"text"}
                                defaultValue={title} />
                        </div>
                        <div className="kyrs-card-text_block">
                            <div>{teachers?.length > 1 ? 'Преподватели:' : 'Преподователь:'}</div>
                            <div>
                                {
                                    teachers.length > 0 ? teachers?.map((el, index) => <label className='teachers-edit-label' key={index}>
                                        <input
                                            required
                                            value={teachers[index]}
                                            onChange={(e) => addTeacher(e, index)}
                                            type={"text"} />
                                        <Image onClick={() => removeTeacher(index)} src={"/minus.png"} alt="deleteImg" width={1000} height={1000} />
                                    </label>
                                    )
                                        : <label>
                                            <input required type={"text"} />
                                        </label>
                                }
                                <div className='add-edit-image'>
                                    <Image
                                        onClick={() => setTeachers([...teachers, ""])}
                                        src={"/add.png"}
                                        alt="addImg"
                                        width={50}
                                        height={50}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="kyrs-card-text_block">
                            <div>Регистрация открыта до:</div>
                            <input type={"date"}
                                required
                                onChange={(e) => { setNewData({ ...newData, register: e.target.value }) }}
                                defaultValue={registerDate}
                            />

                        </div>
                        <div className="kyrs-card-text_block">
                            <div>Старт курса:</div>
                            <div>
                                <input type={"date"}
                                    required
                                    onChange={(e) => { setNewData({ ...newData, start: e.target.value }) }}
                                    defaultValue={startDate}

                                />
                            </div>
                        </div>
                        <div className="kyrs-card-text_block">
                            <div>Длительность:</div>
                            <div>
                                <input type={"text"}
                                    required
                                    onChange={(e) => { setNewData({ ...newData, duration: e.target.value }) }}
                                    defaultValue={duration} />
                            </div>
                        </div>
                        <div className="kyrs-card-text_block">
                            <div>Стоимость:</div>
                            <div>
                                <input type={"number"}
                                    required
                                    onChange={(e) => { setNewData({ ...newData, price: e.target.value }) }}
                                    defaultValue={price} />
                            </div>
                        </div>
                        <div className="kyrs-card-text_block">
                            <div>Свободные места:</div>
                            <div>
                                <input type={"number"}
                                    required
                                    onChange={(e) => { setNewData({ ...newData, freePlace: e.target.value }) }}
                                    defaultValue={freePlace} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="direction-title">ВИДЕОПРИГЛАШЕНИЕ</div>
                <div className='video-input'>
                    <div>
                        <input
                        onChange={(e) => setNewDate({...newData,videoInvite: e.target.value})}
                        type={"text"}
                            required
                            defaultValue={videoInvite} />
                    </div>
                </div>
                <div className="video-invite edit-video">
                    <iframe
                        width="920"
                        height="518"
                        src={videoInvite}
                        allowFullScreen></iframe>
                </div>
            </div>
            <div className="kyrs-card_info edit-info">
                <div className="container">
                    <div>
                        <Image
                            unoptimized
                            src={secondImgUrl || "/file-image.png"}
                            alt={'Второя картинка'}
                            width={600}
                            height={700}
                        />
                        <input className='edit-info_input'
                            type={"file"}

                        />
                    </div>
                    <div className="kyrs-card_about">
                        <div className="kyrs-card_about-block">
                            <div className="kyrs-card_about-title">ДЛЯ КОГО ЭТОТ КУРС?</div>
                            <div className="kyrs-card_about-des">
                                <textarea required defaultValue={forWho}></textarea>
                            </div>
                        </div>
                        <div className="kyrs-card_about-block">
                            <div className="kyrs-card_about-title">О КУРСЕ</div>
                            <div className="kyrs-card_about-des">
                                <textarea required defaultValue={about}></textarea>
                            </div>
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
                            <div onClick={() => { deleteComment(el.id) }} className='delete-comment'>
                                <Image src='/close.png' alt='close' width={30} height={30} />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="comment comment-nothing">
                        <div className="comment_name">Пока еще не было комментариев</div>
                    </div>
                )
                }
            </div>

            <div className='btn-wrapper'>
                <button className='btn'>Сохранить</button>
            </div>
            <div onClick={() => setActive(false)} className={'updated ' + (active ? "active" : "")}>
                Данные изменились
            </div>

        </form>
    );
}
