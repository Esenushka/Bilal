import React from 'react'
import Image from "next/image"
import { db, storageRef } from '../../../config/firebase';
import { useEffect, useState } from "react";
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';


export default function NewDirection() {
    const [direction, setDirection] = useState("")
    const [directionList, setDirectionList] = useState([])
    const [urlDirection, setUrlDirection] = useState("")
    const [file, setFile] = useState("");
    const [fileData, setFileData] = useState("");
    const [disabled, setDisabled] = useState(false)

    const rout = useRouter();

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

        if (fileData) {
            setDisabled(true)
            storageRef.ref("items/" + fileData.name).put(fileData).then(() => {
                getUrl(fileData.name).then((url) => {
                    db.collection("directionList").add({
                        ...data,
                        url: url,
                    })
                        .then(() => {
                            rout.push("/admin/dashboard")
                        })


                })
            });
        }
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
    return (
        <div className='kyrs_edit-wrapper'>
            <div className={"direction_card kyrs_edit " + (file ? "added" : "add")}>
                {
                    file ?
                        <Image
                            unoptimized
                            width={355}
                            height={230}
                            src={file}
                            alt="addImage"
                        />
                        :
                        <div>
                            <Image
                                unoptimized
                                width={100}
                                height={100}
                                src={"/file-image.png"}
                                alt="addImage"
                            />
                        </div>
                }
                <div>
                    <div>{direction}</div>
                    {
                        direction ? <div></div> : ""
                    }
                </div>
            </div>
            <div className='kyrs-edit_right'>
                <div className="kyrs-filter">
                    {
                        direction ? <div>
                            <a>
                                {direction}
                            </a>
                        </div>
                            : ""
                    }
                    {
                        directionList.map((el) => <div key={el.id} >
                            <a >
                                {el.direction}
                            </a>
                        </div>)
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
                            required
                            onChange={({ target }) => handleChange(target)}
                            className='file-input'
                            type={"file"}
                        />
                    </div>
                    <input onChange={(e) => { addDirection(e) }} required placeholder='Название напровления' type={"text"} />
                    <div className='btn-wrapper'>
                        <button disabled={disabled} className='btn'>
                            Добавить
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
        </div>
    )
}
