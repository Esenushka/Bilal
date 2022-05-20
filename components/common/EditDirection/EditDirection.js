import React from 'react'
import Image from "next/image"
import { db, storageRef } from '../../../config/firebase';
import { useEffect, useState } from "react";
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';


export default function EditDirection() {
    const [directionList, setDirectionList] = useState([])
    const [direction, setDirection] = useState("")
    const [file, setFile] = useState("");
    const [fileData, setFileData] = useState("");
    const [urlDirection, setUrlDirection] = useState("")
    const [directionItem, setDirectionItem] = useState({})
    const [active, setActive] = useState(false)

    const rout = useRouter();
    const { id } = rout.query

    const a = <div>
        
    </div>

    useEffect(() => {
        db.collection("directionList")
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    if (doc.id === id) {
                        setDirectionItem({ ...doc.data(), id: doc.id })
                    }
                })
            })
    }, [id])


    const getUrl = async (name) => await storageRef
        .ref()
        .child("items/" + name)
        .getDownloadURL()
        .then((url) => {
            return url
        })


    const submit = (e) => {
        e.preventDefault();
        const data = {
            direction: direction,
            urlDirection: urlDirection
        }

        for (let key in data) {
            if (data[key]) {
                db.collection("directionList").doc(id).update({ [key]: data[key] })
                setActive(true)
            }
        }

        if (fileData) {
            storageRef.ref("items/" + fileData.name).put(fileData).then(() => {
                getUrl(fileData.name).then((url) => {
                    db.collection("directionList").doc(id).update({ url: url })
                    setActive(true)
                })
            });
        }
        setTimeout(() => {
            setActive(false)
        }, 6000)
    };

    const addDirection = (e) => {
        setDirection(e.target.value)
        translit(e.target.value)
    }

    const handleChange = (target) => {
        const reader = new FileReader();
        setFileData(target.files[0]);
        reader.readAsDataURL(target.files[0]);
        reader.onload = (e) => {
            const newUrl = e.target.result;
            setFile(newUrl);
        };

    };


    useEffect(() => {
        db.collection("directionList")
            .get()
            .then((snapshot) => {

                const direction = []
                snapshot.forEach((doc) => {
                    direction.push({ ...doc.data(), id: doc.id })
                })
                setDirectionList(direction)
            })
    }, [])

    const deleteData = () => {
        let res = confirm("Вы уверены")
        if(res){
            db.collection("directionList").doc(id).delete()
            rout.push("/admin/dashboard")
        }
    }

    return (
        <div className='kyrs_edit-wrapper'>
            <div className={"direction_card kyrs_edit"}>
                
                    {
                        file ? 
                            <Image
                                unoptimized
                                width={255}
                                height={230}
                                src={file}
                                alt="addImage"
                            />
                            : <Image
                                unoptimized
                                width={255}
                                height={230}
                                src={ directionItem.url || "/file-image.png"}
                                alt="addImage"
                            />
                    }
              
                <div>
                    <div>{direction || directionItem.direction}</div>
                    <div></div>
                </div>
            </div>
            <div className='kyrs-edit_right'>
                <div className="kyrs-filter">
                    {
                        direction || directionItem.direction ? <div>
                            <a>
                                {direction || directionItem.direction}
                            </a>
                        </div>
                            : ""
                    }
                    {
                        directionList.map((el) => el.id !== id ? <div key={el.id} >
                            <a >
                                {el.direction}
                            </a>
                        </div> : "")
                    }
                    <div>
                        <a >
                            Все
                        </a>
                    </div>
                </div>
                <form onSubmit={submit} className='new-kyrs'>
                    <div>
                        <input
                            onChange={({ target }) => handleChange(target)}
                            className='file-input'
                            type={"file"}
                        />
                    </div>
                    <input defaultValue={directionItem.direction} onChange={(e) => { addDirection(e) }} required placeholder='Название напровления' type={"text"} />
                    <div className='btn-wrapper buttons'>
                        <button className='btn'>
                            Изменить
                        </button>
                        <button onClick={deleteData} className='btn btn-delete'>
                            Удалить
                        </button>
                    </div>
                </form>
            </div>
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
            <div onClick={()=>setActive(false)} className={'updated ' + (active ? "active" : "")}>
                Данные изменились
            </div>
        </div>
    )
}
