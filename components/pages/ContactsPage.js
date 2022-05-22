import { useEffect, useState } from "react"
import { db } from "../../config/firebase"
import Preloader from "../common/Preloader/Preloader"

export default function ContactsPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [contacts, setContacts] = useState({})

    useEffect(() => {
        db.collection("contacts")
            .get()
            .then((snapshot) => {
                setIsLoading(false)
                snapshot.forEach((doc) => {
                    setContacts({...doc.data(),id:doc.id})
                })
            })
    }, [])

    if(isLoading){
        return <Preloader full/>
    }

    return (
        <div className="container">
            <div className="block-top contacts_block-top">
                <div>Контакты</div>
                <div>Вступайте в сообщество аниматоров</div>
            </div>
            <div className="contacts-blocks_wrapper">
                <div className="contacts-block">
                    <div>
                        Email
                    </div>
                    <div>
                        Пишите нам на электронный адрес
                        <a href={"mailto: " + contacts.gmail}> {contacts.gmail} </a>
                        в любое время.
                    </div> 
                    <div className="btn_wrapper">
                        <a  href={"mailto: " + contacts.gmail}>
                            <button className="btn">НАПИСАТЬ</button>
                        </a>
                    </div>
                </div>
                <div className="contacts-block">
                    <div>
                        Телефон
                    </div>
                    <div>
                        Звоните по номеру
                        <a  href={"tel: " + contacts.phone}> {contacts.phone} </a>
                        Будем рады ответить на ваши вопросы.
                    </div>
                    <div className="btn_wrapper">
                        <a  href={"tel: " + contacts.phone}>
                            <button className="btn">НАПИСАТЬ</button>
                        </a>
                    </div>
                </div>
                <div className="contacts-block">
                    <div>
                        Whatsapp
                    </div>
                    <div>
                        Пишите нам на whatsapp 
                        <a target="blank" href={"https://wa.me/" + contacts.whatsapp}> {contacts.whatsapp} </a>
                        в любое время.
                    </div>
                    <div className="btn_wrapper">
                        <a target="blank" href={"https://wa.me/" + contacts.whatsapp}>
                            <button className="btn">НАПИСАТЬ</button>
                        </a>
                    </div>
                </div>
                <div className="contacts-block">
                    <div>
                        Telegram
                    </div>
                    <div>
                        Подписывайтесь на наш аккаунт, получайте полезный контент и следите за новостями.
                    </div>
                    <div className="btn_wrapper">
                        <a target="blank" href={contacts.telegram}>
                            <button className="btn">НАПИСАТЬ</button>
                        </a>
                    </div>
                </div>
                <div className="contacts-block">
                    <div>
                        Instagram
                    </div>
                    <div>
                        Подписывайтесь на наш аккаунт, получайте полезный контент и следите за новостями.
                    </div>
                    <div className="btn_wrapper">
                        <a target="blank" href={contacts.instagram} >
                            <button className="btn">НАПИСАТЬ</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
