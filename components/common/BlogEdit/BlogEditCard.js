import Image from "next/image"
import { db, storageRef } from '../../../config/firebase.js';
import { useEffect, useState } from 'react';
import { useRouter } from "next/router"
import Link from "next/link"
import Preloader from "../Preloader/Preloader.js";

export default function BlogEditCard() {
    const [blog, setBlog] = useState({})
    const [newBlog, setNewBlog] = useState({})
    const [file, setFile] = useState("");
    const [fileData, setFileData] = useState("");
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
                storageRef.ref("items/" + target.files[0].name).put(target.files[0]).then(() => {
                    getUrl(target.files[0].name).then((url) => {
                        more[index] = { img: url, file: newUrl }
                        setMore([...more])

                    })
                })
            };
        }

    };

    const handleChangeText = (e, index) => {
        more.splice(index,1,{text: e.target.value})
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

        db.collection("blog").doc(id).update({
            more: more
        })

        if (fileData) {
            storageRef.ref("items/" + fileData.name).put(fileData).then(() => {
                getUrl(fileData.name).then((url) => {
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
        setMore([...more, { img: "" }])
    }

    const addText = () => {

        setMore([...more, { text: "" }])
    }

    const RemoveItem = (index) => {
       more.splice(index ,1)
       setMore([...more])
    }
    
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
                    <div className=" post-block-top blog-top-edit">
                        <div className="block-top ">
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

                        {
                            more?.map((el, index) =>
                                el?.img !== undefined ? <div key={index} className='blog-img_main'>
                                    <input required onChange={({ target }) => handleChangeMore(target, index, el.img)} type={"file"} />
                                    <div className="blog-delete_img"><Image onClick={()=>RemoveItem(index)} loading="eager" unoptimized width={30} height={30} src="/minus.png" alt="delete" /></div>
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
                                            <div className="blog-delete_img">
                                                    <Image onClick={() => RemoveItem(index)} loading="eager" unoptimized width={30} height={30} src="/minus.png" alt="delete" />
                                            </div>
                                            <textarea
                                                onChange={(e) => handleChangeText(e, index)}
                                                required value={more[index]?.text} >
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


                <div onClick={() => setActive(false)} className={'updated ' + (active ? "active" : "")}>
                    Данные изменились
                </div>

            </form>
            <div className="btn-wrapper buttons">
                <button onClick={submit} className="btn">
                    Сохранить
                </button>
                <button onClick={Delete} className="btn btn-delete">
                    Удалить
                </button>
            </div>
        </>

    );
}
