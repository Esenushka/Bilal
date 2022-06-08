import { useEffect, useState } from 'react'
import Image from "next/image"
import Link from 'next/link'
import { useRouter } from "next/router"
import { db, storageRef } from '../../../config/firebase'
import Preloader from '../Preloader/Preloader'

export default function StudentsEdit({ idData }) {
    const [studentsWork, setStudentsWork] = useState({})
    const [file, setFile] = useState("");
    const [fileData, setFileData] = useState("");
    const [active, setActive] = useState(false)
    const [directionId, setDirectionId] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const rout = useRouter()
    const id = rout.query.id



    const getUrl = async (name) => await storageRef
        .ref()
        .child("items/" + name)
        .getDownloadURL()
        .then((url) => {
            return url
        })

    useEffect(() => {
        idData.forEach((el) => {
            db.collection("directionCardList/" + el + "/studentWork")
                .get()
                .then((snapshot) => {
                    setIsLoading(false)
                    snapshot.forEach((doc) => {
                        if (doc.id === id) {
                            setStudentsWork({ ...doc.data(), id: doc.id })
                            setDirectionId(el)
                        }
                    })
                })

        })
    }, [id, idData])

    const handleChange = (target) => {
        if (target.files.length) {
            const reader = new FileReader();
            setFileData(target.files[0]);
            reader.readAsDataURL(target.files[0]);
            reader.onload = (e) => {
                const newUrl = e.target.result;
                setFile(newUrl);
            };
        }

    };

    const submit = (e) => {
        e.preventDefault()
        if (fileData) {
            storageRef.ref("items/" + fileData.name).put(fileData).then(() => {
                getUrl(fileData.name).then((url) => {
                    db.collection("directionCardList/" + directionId + "/studentWork").doc(id).update({ url: url })
                    setActive(true)
                })
            })
        }
        setTimeout(() => {
            setActive(false)
        }, 5000)
    }


    const Delete = () => {
        const res = confirm("Вы уверены?")
        if (res) {
            db.collection("directionCardList/" + directionId + "/studentWork")
                .doc(id)
                .delete()
                .then(() => {
                    rout.push("/admin/studentsWorks")
                })
        }
    }
    if (isLoading) {
        return <Preloader full />
    }
    return (
        <div className='edit-students_wrapper'>
            <div className='back-to'>
                <Link href="/admin/studentsWorks">
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
            <div className='kyrs-cards_wrapper edit-students'>
                <a className={"students-work "}>
                    <form onSubmit={submit}>
                        <input type={"file"} onChange={({ target }) => handleChange(target)} />
                        {
                            file ?
                                <Image loading="eager"
                                    unoptimized
                                    width={300}
                                    height={450}
                                    src={file}
                                    alt={studentsWork.name}
                                /> :
                                <Image loading="eager"
                                    unoptimized
                                    width={300}
                                    height={450}
                                    src={studentsWork.url || "/file-image.png"}
                                    alt={studentsWork.name}
                                />
                        }
                    </form>
                </a>
                <div className='btn-wrapper'>
                    <button onClick={submit} className='btn'>
                        Сохранить
                    </button>
                    <button onClick={Delete} className='btn btn-delete'>
                        Удалить
                    </button>
                </div>

                <div onClick={() => setActive(false)} className={'updated ' + (active ? "active" : "")}>
                    Данные изменились
                </div>
            </div>
        </div>
    )
}
