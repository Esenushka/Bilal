import Image from "next/image"
import { db, storageRef } from '../../../config/firebase.js';
import { useEffect, useState } from 'react';
import { useRouter } from "next/router"
import Link from "next/link"
import Preloader from "../Preloader/Preloader.js";
import firebase from "firebase/compat/app";

export default function BlogEditCard() {
    const [blog, setBlog] = useState({})
    const [newBlog, setNewBlog] = useState({})
    const [file, setFile] = useState("");
    const [fileData, setFileData] = useState("");
    const [fileSecond, setFileSecond] = useState("");
    const [fileSecondData, setFileSecondData] = useState("");
    const [active, setActive] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const rout = useRouter()
    const id = rout.query.id

    useEffect(() => {
        db.collection("blog")
            .get()
            .then((snapshot) => {
                setIsLoading(false)
                snapshot.forEach((doc) => {
                    if (doc.id === id) {
                        setBlog({ ...doc.data(), id: doc.id })
                    }
                })
            })
    }, [id]);



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
        const data = {
            ...newBlog,
            date: new Date().toLocaleDateString()
        }
        setActive(true)
        for (let key in data) {
            if (data[key]) {
                db.collection("blog").doc(id).update({
                    [key]: data[key]
                })
            }
        }
        if (fileData) {
            storageRef.ref("items/" + fileData.name).put(fileData).then(() => {
                getUrl(fileData.name).then((url) => {
                    db.collection("blog").doc(id).update({ titleImg: url })
                })
            })
        }
        if (fileSecondData) {
            storageRef.ref("items/" + fileSecondData.name).put(fileSecondData).then(() => {
                getUrl(fileSecondData.name).then((url) => {
                    db.collection("blog").doc(id).update({ titleImg: url })
                })
            })
        }
        setTimeout(() => {
            setActive(false)
        }, 5000)
    }

    const Delete = () => {
        const res = confirm("Вы Уверены?")
        if (res) {
            db.collection("blog").doc(id).delete()
                .then(() => {
                    rout.push("/admin/blog")
                })
        }
    }

    if(isLoading){
        return <Preloader full/>
    }

    return (
        <>
            <Link href="/admin/blog">
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
            <form onSubmit={submit} className='blog-edit_wrapper'>

                <div className="container">
                    <div className=" post-block-top">
                        <div className="block-top">
                            <textarea
                                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                                required
                                defaultValue={blog.title}
                            ></textarea>
                        </div>
                        <div className={"post-img "}>
                            {
                                file ? <Image
                                    unoptimized
                                    width={1000}
                                    height={1000}
                                    src={file}
                                    alt="Post image" /> :
                                    <Image
                                        unoptimized
                                        width={1000}
                                        height={1000}
                                        src={blog.titleImg || "/file-image.png"}
                                        alt="Post image" />
                            }
                        </div>
                    </div>
                    <div className='blog-file_input'>
                        <input onChange={({ target }) => handleChange(target, setFileData, setFile)} type={"file"} />
                    </div>
                </div>
                <div className="container blog-container">
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
                                    required defaultValue={blog.FirstText}>
                                </textarea>
                            </div>
                        </div>
                        <div className='blog-img_main'>
                            <input onChange={({ target }) => handleChange(target, setFileSecondData, setFileSecond)} type={"file"} />
                            {
                                fileSecond ?
                                    <Image
                                        unoptimized
                                        width={1000}
                                        height={1000}
                                        src={fileSecond}
                                        alt="Post image" />
                                    : <Image
                                        unoptimized
                                        width={1000}
                                        height={1000}
                                        src={blog.MainImg || "/file-image.png"}
                                        alt="Post image" />
                            }
                        </div>
                        <div className='blog-text_wrapper'>
                            <div className='blog-text_wrapper'>
                                <div className='blog-text'>
                                    <textarea
                                        onChange={(e) => setNewBlog({ ...newBlog, SecondText: e.target.value })}
                                        required defaultValue={blog.SecondText}>
                                    </textarea>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="btn-wrapper buttons">
                    <button className="btn">
                        Сохранить
                    </button>
                    <button onClick={Delete} className="btn btn-delete">
                        Удалить
                    </button>
                </div>
                <div onClick={() => setActive(false)} className={'updated ' + (active ? "active" : "")}>
                    Данные изменились
                </div>

            </form>
        </>

    );
}
