import { useEffect, useState } from 'react'
import Image from "next/image"
import Link from 'next/link'
import { useRouter } from "next/router"
import { db, storageRef } from '../../../config/firebase'

export default function NewStudentWork({ idData }) {
    const [newStudentWork, setNewStudentWork] = useState({})
    const [file, setFile] = useState("");
    const [fileData, setFileData] = useState("");
    const [active, setActive] = useState(false)

    const rout = useRouter()
    const id = Object.keys(rout.query)[0]

    const getUrl = async (name) => await storageRef
        .ref()
        .child("items/" + name)
        .getDownloadURL()
        .then((url) => {
            return url
        })


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
        setActive(true)
        if (fileData) {
            storageRef.ref("items/" + fileData.name).put(fileData).then(() => {
                getUrl(fileData.name).then((url) => {
                    db.collection("directionCardList/" + id + "/studentWork").add({
                        ...newStudentWork, url: url
                    }).then(() => {
                        setActive(false)
                        rout.push("/admin/studentsWorks")
                    })
                })
            })
        }

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
                <form onSubmit={submit}>
                    <input required type={"file"} onChange={({ target }) => handleChange(target)} />
                    <a className={"students-work " + (!file ? "activeImage" : "")}>
                        {
                            <Image loading="eager"
                                unoptimized
                                width={300}
                                height={450}
                                src={file || "/file-image.png"}
                                alt={newStudentWork.name}
                            />
                        }
                    </a>
                    <div className='btn-wrapper'>
                        <button className='btn'>
                            Добавить
                        </button>
                    </div>
                </form>

            </div>
            <div className={'preloader ' + (active ? "active" : "")}>
                <svg id="preloader" width="240px" height="120px" viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">

                    <path id="loop-normal" className="st1" d="M120.5,60.5L146.48,87.02c14.64,14.64,38.39,14.65,53.03,0s14.64-38.39,0-53.03s-38.39-14.65-53.03,0L120.5,60.5
L94.52,87.02c-14.64,14.64-38.39,14.64-53.03,0c-14.64-14.64-14.64-38.39,0-53.03c14.65-14.64,38.39-14.65,53.03,0z">
                        <animate attributeName="stroke-dasharray" from="500, 50" to="450 50" begin="0s" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="stroke-dashoffset" from="-40" to="-540" begin="0s" dur="2s" repeatCount="indefinite" />
                    </path>

                    <path id="loop-offset" d="M146.48,87.02c14.64,14.64,38.39,14.65,53.03,0s14.64-38.39,0-53.03s-38.39-14.65-53.03,0L120.5,60.5L94.52,87.02c-14.64,14.64-38.39,14.64-53.03,0c-14.64-14.64-14.64-38.39,0-53.03c14.65-14.64,38.39-14.65,53.03,0L120.5,60.5L146.48,87.02z"></path>

                    <path id="socket" d="M7.5,0c0,8.28-6.72,15-15,15l0-30C0.78-15,7.5-8.28,7.5,0z">
                        <animateMotion
                            dur="2s"
                            repeatCount="indefinite"
                            rotate="auto"
                            keyTimes="0;1"
                            keySplines="0.42, 0.0, 0.58, 1.0"
                        >
                            <mpath xlinkHref="#loop-offset" />
                        </animateMotion>
                    </path>

                    <path id="plug" d="M0,9l15,0l0-5H0v-8.5l15,0l0-5H0V-15c-8.29,0-15,6.71-15,15c0,8.28,6.71,15,15,15V9z">
                        <animateMotion
                            dur="2s"
                            rotate="auto"
                            repeatCount="indefinite"
                            keyTimes="0;1"
                            keySplines="0.42, 0, 0.58, 1"
                        >
                            <mpath xlinkHref="#loop-normal" />
                        </animateMotion>
                    </path>

                </svg>
            </div>
        </div>
    )
}
