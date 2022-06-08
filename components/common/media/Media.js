import Image from "next/image"
import { useEffect, useState } from "react"
import { db } from "../../../config/firebase"

export default function Media() {
    const [contacts, setContacts] = useState({})
    const [newContacts, setNewContacts] = useState({})
    const [active, setActive] = useState(false)

    useEffect(() => {
        db.collection("contacts")
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    setContacts({ ...doc.data(), id: doc.id })
                })
            })
    }, [])

    const submit = (e) =>{
        e.preventDefault()
        for(let key in newContacts){
            if(newContacts[key]){
                db.collection("contacts").doc(contacts.id).update({[key]: newContacts[key]})
                setActive(true)
            }
        }
        setTimeout(()=>{
            setActive(false)
        },5000)
    }


    return (
        <>
        <form onSubmit={submit} className='container medias_wrapper'>
            <div>
                <Image loading="eager"
                    src={"/whatsapp.png"}
                    alt={"whatsapp"}
                    width={50}
                    height={50}
                />
                <input onChange={(e) => setNewContacts({ ...newContacts, whatsapp: e.target.value })} placeholder="Whatsapp" defaultValue={contacts.whatsapp} required type={"tel"} />
            </div>
            <div>
                <Image loading="eager"
                    src={"/telegram.png"}
                    alt={"telegram"}
                    width={50}
                    height={50}
                />
                <input onChange={(e) => setNewContacts({ ...newContacts, telegram: e.target.value })} placeholder="Telegram" defaultValue={contacts.telegram} required type={"text"} />
            </div>
            <div>
                <Image loading="eager"
                    src={"/instagram.png"}
                    alt={"instagram"}
                    width={50}
                    height={50}
                />
                <input onChange={(e) => setNewContacts({ ...newContacts, instagram: e.target.value })} placeholder="Instagram" defaultValue={contacts.instagram} required type={"text"} />
            </div>
            <div>
                <Image loading="eager"
                    src={"/gmail.png"}
                    alt={"gmail"}
                    width={50}
                    height={50}
                />
                <input onChange={(e) => setNewContacts({ ...newContacts, gmail: e.target.value })} placeholder="Email" defaultValue={contacts.gmail} required type={"email"} />
            </div>
            <div>
                <Image loading="eager"
                    src={"/telephone.png"}
                    alt={"telephone"}
                    width={50}
                    height={50}
                />
                <input onChange={(e) => setNewContacts({ ...newContacts, phone: e.target.value })} placeholder="Phone" defaultValue={contacts.phone} required type={"tel"} />
            </div>
            <div className="btn-wrapper">
                <button className="btn">Сохранить</button>
            </div>
        </form>
            <div onClick={() => setActive(false)} className={'updated ' + (active ? "active" : "")}>
                Данные изменились
            </div>
        </>
    )
}
