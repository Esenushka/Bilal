import React from 'react'
import { NavLink } from "../NavLink/NavLink"
import Image from 'next/image'
import { useRouter } from 'next/router'
import firebase from '../../../config/firebase'
import { useState } from 'react'
import Link from "next/link"

export default function AdminNavBar() {
    const [active, setActive] = useState(false)
    const router = useRouter()
    const logout = async () => {
        const confirm = window.confirm("Вы уверены")
        if (confirm) {
            await router.push("/")
            firebase.auth().signOut()
        }
    }

    return (
        <div className='admin_navbar-wrapper'>
            <div className='admin_navbar'>
                <ul>
                    <NavLink href="/admin/dashboard">
                        <li className='list'>
                            <p>Курсы</p>
                            <div style={{ "--clr": "#77d94a" }}>
                                <span className='icon'>

                                    <Image
                                        src="/online-course.png"
                                        alt='course'
                                        width={35}
                                        height={35}
                                    />
                                </span>
                            </div>
                        </li>
                    </NavLink>
                    <NavLink href="/admin/studentsWorks">
                        <li className='list'>
                            <p>Работа студетов</p>
                            <div style={{ "--clr": "#d9944a" }} >
                                <span className='icon'>
                                    <Image
                                        src="/graduated.png"
                                        alt='course'
                                        width={35}
                                        height={35}
                                    />
                                </span>
                            </div>
                        </li>
                    </NavLink>
                    <NavLink href="/admin/medias">
                        <li className='list'>
                            <p>Контакты</p>

                            <div style={{ "--clr": "#5b4ad9" }}>
                                <span className='icon'>
                                    <Image
                                        src="/social-media.png"
                                        alt='course'
                                        width={35}
                                        height={35}
                                    />
                                </span>
                            </div>
                        </li>
                    </NavLink>
                    <NavLink href="/admin/blog">
                        <li className='list'>
                            <p>Блог</p>

                            <div style={{ "--clr": "#d94abe" }} >
                                <span className='icon'>
                                    <Image
                                        src="/blogging.png"
                                        alt='course'
                                        width={35}
                                        height={35}
                                    />
                                </span>
                            </div>
                        </li>
                    </NavLink>
                    <Link href="/">
                        <li className='list'>
                            <p>Главная</p>
                            <div style={{ "--clr": "#d9944a" }} >
                                <span className='icon'>
                                    <Image
                                        src="/home.png"
                                        alt='course'
                                        width={35}
                                        height={35}
                                    />
                                </span>
                            </div>
                        </li>
                    </Link>
                    <a onClick={logout}>
                        <li className='list'>
                            <p>Выйти</p>

                            <div style={{ "--clr": "#d94a4a" }} >
                                <span className='icon'>
                                    <Image
                                        src="/logout.png"
                                        alt='course'
                                        width={35}
                                        height={35}
                                    />
                                </span>
                            </div>
                        </li>
                    </a>
                    <div className='indicators'></div>
                </ul>
            </div>
            <div className='header container'>
                <div className="logo">
                    <NavLink href={'/'}>
                        <Image width={50} height={50} src="/favicon.ico" alt="Logo" />
                    </NavLink>
                </div>
                <div
                    onClick={() => {
                        setActive(!active);
                    }}
                    className={'wrapper-menu ' + (active ? 'open' : '')}>
                    <div className="line-menu half start"></div>
                    <div className="line-menu"></div>
                    <div className="line-menu half end"></div>
                </div>
            </div>
            <div className={'burger-modal ' + (active ? 'active' : '')}>
                <div>
                    <NavLink
                        href={'/admin/dashboard'}>
                        Курсы
                    </NavLink>
                    <NavLink
                        href={'/admin/studentsWorks'}>
                        Работы студентов
                    </NavLink>
                    <NavLink
                        href={'/admin/medias'}>
                        Контакты
                    </NavLink>
                    <NavLink
                        href={'/admin/blog'}>
                        Блог
                    </NavLink>
                    <a
                        onClick={logout}>
                        Выйти
                    </a>
                </div>
            </div>
        </div>
    )
}
