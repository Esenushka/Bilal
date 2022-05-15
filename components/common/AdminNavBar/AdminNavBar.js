import React from 'react'
import { NavLink } from "../NavLink/NavLink"
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function AdminNavBar() {
    const router = useRouter()
    const logout = () => {
        const confirm = window.confirm("Вы уверены")
        if (confirm) {
            router.push("/")
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
        </div>
    )
}
