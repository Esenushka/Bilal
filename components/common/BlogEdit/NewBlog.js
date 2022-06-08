import Image from "next/image"
import { db, storageRef } from '../../../config/firebase.js';
import { useEffect, useState } from 'react';
import { useRouter } from "next/router"
import Link from "next/link"
import firebase from "firebase/compat/app";

export default function NewBlog() {
    const [newBlog, setNewBlog] = useState({})
    const [file, setFile] = useState("");
    const [fileData, setFileData] = useState("");
    const [fileSecond, setFileSecond] = useState("");
    const [fileSecondData, setFileSecondData] = useState("");
    const [active, setActive] = useState(false)

    const rout = useRouter()
    const id = rout.query.id



    const getUrl = async (name) => await storageRef
        .ref()
        .child("items/" + name)
        .getDownloadURL()
        .then((url) => {
            return url
        })

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



    const submit = (e) => {
        e.preventDefault()
        const body = document.getElementsByTagName("body")[0]
        const data = {
            ...newBlog,
            date: firebase.firestore.TimeStamp.fromDate(new Date())
        }
        body.style.overflowY = "hidden"
        setActive(true)

        if (fileData) {
            storageRef.ref("items/" + fileData.name).put(fileData).then(() => {
                getUrl(fileData.name).then((url) => {
                    data = {
                        ...data,
                        titleImg: url
                    }
                    storageRef.ref("items/" + fileSecondData.name).put(fileSecondData).then(() => {
                        getUrl(fileSecondData.name).then((secondUrl) => {
                            db.collection("blog").add({
                                ...data,
                                MainImg: secondUrl
                            })
                                .then(() => {
                                    body.style.overflowY = "visible"
                                    setActive(false)
                                    router.push("/admin/blog")
                                })
                        })
                    })
                })
            })
        }
        if (fileSecondData) {

        }
        setTimeout(() => {
            setActive(false)
        }, 5000)
    }



    return (
        <>
            <Link href="/admin/blog">
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
            <form onSubmit={submit} className='blog-edit_wrapper'>

                <div className="container">
                    <div className=" post-block-top">
                        <div className="block-top">
                            <textarea
                                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                                required
                            ></textarea>
                        </div>
                        <div className={"post-img " + (!file ? "blogImage" : "")}>
                            {
                                <Image loading="eager"
                                    unoptimized
                                    width={1000}
                                    height={1000}
                                    src={file || "/file-image.png"}
                                    alt="Post image" />

                            }
                        </div>
                    </div>
                    <div className='blog-file_input'>
                        <input required onChange={({ target }) => handleChange(target, setFileData, setFile)} type={"file"} />
                    </div>
                </div>
                <div className="container">
                    <div className='post-content'>
                        <div className='blog-date'>
                            {
                                new Date().toLocaleDateString()
                            }
                        </div>
                        <div className='blog-text_wrapper'>
                            <div className='blog-text'>
                                <textarea
                                    onChange={(e) => setNewBlog({ ...newBlog, FirstText: e.target.value })}
                                    required >
                                </textarea>
                            </div>
                        </div>
                        <div className={'blog-img_main ' + (!fileSecond ? "blogImage" : "")}>
                            <input required onChange={({ target }) => handleChange(target, setFileSecondData, setFileSecond)} type={"file"} />
                            {
                                <Image loading="eager"
                                    unoptimized
                                    width={1000}
                                    height={1000}
                                    src={fileSecond || "/file-image.png"}
                                    alt="Post image" />
                            }
                        </div>
                        <div className='blog-text_wrapper'>
                            <div className='blog-text_wrapper'>
                                <div className='blog-text'>
                                    <textarea
                                        onChange={(e) => setNewBlog({ ...newBlog, SecondText: e.target.value })}
                                        required >
                                    </textarea>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="btn-wrapper ">
                    <button className="btn">
                        Добавить
                    </button>

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
            </form>
        </>

    );
}
