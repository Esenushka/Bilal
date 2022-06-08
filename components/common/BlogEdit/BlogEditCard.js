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
    const [more, setMore] = useState([])


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
                        setMore([...doc.data().more])
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

    const handleChangeMore = (target, index, img) => {
        if (target.files.length) {
            const reader = new FileReader();
            reader.readAsDataURL(target.files[0]);
            reader.onload = (e) => {
                const newUrl = e.target.result;
                more[index] = { file: newUrl, img: img, type: "img", fileData: target.files[0] }
                setMore([...more]);
            };
        }

    };

    const handleChangeText = (e, index) => {
        more[index] = { text: e.target.value, type: "text" }
        setMore([...more])
    }


    const submit = (e) => {
        e.preventDefault()
        const data = {
            ...newBlog,
        }
        setActive(true)
        for (let key in data) {
            if (data[key]) {
                db.collection("blog").doc(id).update({
                    [key]: data[key]
                })
            }
        }
        more.forEach((el, index) => {
            if (el.fileData) {
                storageRef.ref("items/" + el.fileData.name).put(el.fileData).then(() => {
                    getUrl(el.fileData.name).then((url) => {
                        more[index] = { img: url, type: "img" }
                        setMore([...more])
                        db.collection("blog").doc(id).update({
                            more: more
                        })
                    })
                })
            }
        })
        

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

    const addImage = () => {
        setMore([...more, { img: "", type: "img" }])
    }

    const addText = () => {

        setMore([...more, { text: "", type: "text" }])
    }

    console.log(more);

    if (isLoading) {
        return <Preloader full />
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
                                defaultValue={blog.title}
                            ></textarea>
                        </div>
                        <div className={"post-img "}>
                            {
                                file ? <Image loading="eager"
                                    unoptimized
                                    width={1000}
                                    height={1000}
                                    src={file}
                                    alt="Post image" /> :
                                    <Image loading="eager"
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
                                <input type="date" onChange={(e) => setNewBlog({ ...newBlog, date: e.target.value })} defaultValue={blog.date} />
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
                                    <Image loading="eager"
                                        unoptimized
                                        width={1000}
                                        height={1000}
                                        src={fileSecond}
                                        alt="Post image" />
                                    : <Image loading="eager"
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
                        {
                            more?.map((el, index) =>
                                el.img !== undefined ? <div key={index} className='blog-img_main'>
                                    <input onChange={({ target }) => handleChangeMore(target, index, el.img)} type={"file"} />
                                    {
                                        el.file ?
                                            <Image loading="eager"
                                                unoptimized
                                                width={1000}
                                                height={1000}
                                                src={el.file}
                                                alt="Post image" />
                                            : <Image loading="eager"
                                                unoptimized
                                                width={1000}
                                                height={1000}
                                                src={el.img || "/file-image.png"}
                                                alt="Post image" />

                                    }
                                </div> : <div key={index} className='blog-text_wrapper'>
                                    <div className='blog-text_wrapper'>
                                        <div className='blog-text'>
                                            <textarea
                                                onChange={(e) => handleChangeText(e, index)}
                                                required defaultValue={el.text}>
                                            </textarea>
                                        </div>
                                    </div>
                                </div>

                            )
                        }
                        <div className="btn-wrapper buttons blog-btn">
                            <div onClick={addImage}>
                                Добавить фото
                            </div>
                            <div onClick={addText}>
                                Добавить Текст
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
