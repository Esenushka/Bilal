import Image from 'next/image';
import { useState, useEffect } from 'react';
import { db, storageRef } from '../../../config/firebase';
import { useRouter } from 'next/router';
import Link from "next/link"
import firebase from 'firebase/compat/app';

export default function KyrsEditCard() {
    const [comments, setComments] = useState([]);
    const [registerDate, setRegisterDate] = useState("")
    const [newData, setNewData] = useState({})
    const [startDate, setStartDate] = useState("")
    const [deleted, setDeleted] = useState(0)
    const [active, setActive] = useState(false)
    const [directionCardList, setDirectionCardList] = useState({})
    const [teachers, setTeachers] = useState([])
    const [file, setFile] = useState("");
    const [fileData, setFileData] = useState("");
    const [videofile, setVideoFile] = useState("");
    const [videoFileData, setVideoFileData] = useState("");
    const [fileSecond, setFileSecond] = useState("");
    const [fileSecondData, setFileSecondData] = useState("");
    const [urlDirection, setUrlDirection] = useState("")

    const {
        title, url, secondImgUrl, start, duration,
        price, register, freePlace, forWho, about, videoInvite, des, direction
    } = directionCardList

    const router = useRouter()
    const id = router.query?.id


    const getUrl = async (name) => await storageRef
        .ref()
        .child("items/" + name)
        .getDownloadURL()
        .then((url) => {
            return url
        })


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
        const date = year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day)
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
            teachers: teachers,
            urlDirection: urlDirection,
            register: newData.register ? newData.register : "",
            start: newData.start ? newData.start : "",
            dataChild: 0,
          

        }

        if (newData || urlDirection === true) {
            for (let key in data) {
                if (data[key]) {
                    db.collection("directionCardList").doc(id).update({ [key]: data[key] })
                    setActive(true)
                }
            }
        }

        if (fileData) {
            storageRef.ref("items/" + fileData.name).put(fileData).then(() => {
                getUrl(fileData.name).then((url) => {
                    db.collection("directionCardList").doc(id).update({ url: url })
                    setActive(true)
                })
            })
        }

        if (videoFileData) {
            storageRef.ref("items/" + videoFileData.name).put(videoFileData).then(() => {
                getUrl(videoFileData.name).then((url) => {
                    db.collection("directionCardList").doc(id).update({ videoInvite: url })
                    setActive(true)
                })
            })

        }
        if (fileSecondData) {
            storageRef.ref("items/" + fileSecondData.name).put(fileSecondData).then(() => {
                getUrl(fileSecondData.name).then((url) => {
                    db.collection("directionCardList").doc(id).update({ secondImgUrl: url })
                    setActive(true)
                })
            })

        }

        setTimeout(() => {
            setActive(false)
        }, 6000)
    }

    const removeTeacher = (index) => {
        teachers.splice(index,1)
        setTeachers([...teachers])
    }

    const addTeacher = (e, index) => {
        teachers[index] = e.target.value
        setTeachers([...teachers])
    }

    const Delete = () => {
        let res = confirm("Вы уверены?")
        if (res) {
            db.collection("directionCardList").doc(id).delete()
            router.push("/admin/dashboard")
        }
    }

    const handleChange = (target, setFilesData, setFiles) => {
        if (target.files.length) {
            const reader = new FileReader();
            setFilesData(target.files[0]);
            reader.readAsDataURL(target.files[0]);
            reader.onload = (e) => {
                const newUrl = e.target.result;
                setFiles(newUrl);
            };
        }

    };

    const addDirection = (e) => {
        setNewData({ ...newData, direction: e.target.value })
        translit(e.target.value)
    }

    function translit(word) {
        const converter = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
            'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
            'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
            'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
            'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch',
            'ш': 'sh', 'щ': 'sch', 'ь': '', 'ы': 'y', 'ъ': '',
            'э': 'e', 'ю': 'yu', 'я': 'ya'
        };

        word = word.toLowerCase();

        let answer = '';
        for (let i = 0; i < word.length; ++i) {
            if (converter[word[i]] == undefined) {
                answer += word[i];
            } else {
                answer += converter[word[i]];
            }
        }

        answer = answer.replace(/[^-0-9a-z]/g, '-');
        answer = answer.replace(/[-]+/g, '-');
        answer = answer.replace(/^\-|-$/g, '');
        setUrlDirection(answer)
    }

    return (
        <>
            <form onSubmit={submit} className='kyrs-edit-card'>
                <div className='back-to'>
                    <Link href="/admin/dashboard">
                        <div className='back-to-dasboard'>
                            <Image loading="eager"
                                unoptimized
                                width={40}
                                height={40}
                                alt='arrow'
                                src={"/right-arrow.png"}
                            />
                        </div>
                    </Link>
                </div>
                <div className='direction_edit-kyrs container'>
                    <h4>Напровления</h4>
                    <input
                        onChange={(e) => addDirection(e)}
                        type={"text"} defaultValue={direction} />
                </div>
                <div className="container">
                    <div>
                        <input
                            onChange={({ target }) => handleChange(target, setFileData, setFile)}
                            type={"file"} />
                    </div>
                    <div className="kyrs-card_main-block edit-card">
                        {
                            file ? <Image loading="eager"
                                unoptimized
                                src={file}
                                alt={'Главная картинка'}
                                width={300}
                                height={500}
                            /> : <Image loading="eager"
                                unoptimized
                                src={url || "/file-image.png"}
                                alt={'Главная картинка'}
                                width={300}
                                height={500}
                            />
                        }
                        <div className="kyrs-card_main-text">
                            <div className="kyrs-card-text_title">
                                <input
                                    onChange={(e) => { setNewData({ ...newData, title: e.target.value }) }}
                                    required
                                    type={"text"}
                                    defaultValue={title} />
                            </div>
                            <div className='kyrs-card-text_des'>
                                <textarea
                                    required
                                    onChange={(e) => { setNewData({ ...newData, des: e.target.value }) }}
                                    defaultValue={des}
                                ></textarea>
                            </div>
                            <div className="kyrs-card-text_block">
                                <div>{directionCardList.teachers?.length > 1 ? 'Преподватели:' : 'Преподователь:'}</div>
                                <div>
                                    {
                                        teachers.length > 0 ? teachers?.map((el, index) => <label className='teachers-edit-label' key={index}>
                                            <input
                                                value={teachers[index]}
                                                required
                                                onChange={(e) => addTeacher(e, index)}
                                                type={"text"} />
                                            <Image loading="eager" onClick={() => removeTeacher(index)} src={"/minus.png"} alt="deleteImg" width={1000} height={1000} />
                                        </label>
                                        )
                                            : <label>
                                                <input
                                                    onChange={(e) => addTeacher(e, 0)}
                                                    required type={"text"} />
                                            </label>
                                    }
                                    <div className='add-edit-image'>
                                        <Image loading="eager"
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

                                <div> Регистрация открыта до:</div>
                                <input type={"date"}
                                    onChange={(e) => { setNewData({ ...newData, register: (e.target.value ? firebase.firestore.Timestamp.fromDate(new Date(e.target.value)) : "") }) }}
                                    defaultValue={registerDate}
                                />



                            </div>
                            <div className="kyrs-card-text_block">
                                <div>Старт курса:</div>
                                <div>
                                    <input type={"date"}
                                        onChange={(e) => { setNewData({ ...newData, start: (e.target.value ? firebase.firestore.Timestamp.fromDate(new Date(e.target.value)) : "") }) }}
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
                                    <input type={"text"}
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
                                onChange={({ target }) => handleChange(target, setVideoFileData, setVideoFile)}
                                type={"file"}
                                defaultValue={videoInvite} />
                        </div>
                    </div>
                    <div className="video-invite edit-video">
                        {
                            videoFileData ?
                                <video
                                    width="920"
                                    height="518"
                                    controls
                                    src={videofile}
                                ></video>
                                : <video width="920" height="518" controls src={videoInvite}>
                                </video>
                        }
                    </div>
                </div>
                <div className="kyrs-card_info edit-info">
                    <div className="container">
                        <div>
                            {
                                fileSecond ?
                                    <Image loading="eager"
                                        unoptimized
                                        src={fileSecond}
                                        alt={'Второя картинка'}
                                        width={600}
                                        height={700}
                                    /> : <Image loading="eager"
                                        unoptimized
                                        src={secondImgUrl || "/file-image.png"}
                                        alt={'Второя картинка'}
                                        width={600}
                                        height={700}
                                    />
                            }
                            <input
                                onChange={({ target }) => handleChange(target, setFileSecondData, setFileSecond)}
                                className='edit-info_input'
                                type={"file"}

                            />
                        </div>
                        <div className="kyrs-card_about">
                            <div className="kyrs-card_about-block">
                                <div className="kyrs-card_about-title">ДЛЯ КОГО ЭТОТ КУРС?</div>
                                <div className="kyrs-card_about-des">
                                    <textarea required onChange={(e)=>{setNewData({...newData,forWho: e.target.value})}} defaultValue={forWho}></textarea>
                                </div>
                            </div>
                            <div className="kyrs-card_about-block">
                                <div className="kyrs-card_about-title">О КУРСЕ</div>
                                <div className="kyrs-card_about-des">
                                    <textarea required onChange={(e) => { setNewData({ ...newData,  about: e.target.value }) }} defaultValue={about}></textarea>
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
                                    <Image loading="eager" src='/close.png' alt='close' width={30} height={30} />
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

                <div className='btn-wrapper buttons'>
                    <button className='btn'>Сохранить</button>
                    <button onClick={Delete} className='btn-delete btn'>Удалить</button>
                </div>
                <div onClick={() => setActive(false)} className={'updated ' + (active ? "active" : "")}>
                    Данные изменились
                </div>

            </form>
        </>
    );
}
