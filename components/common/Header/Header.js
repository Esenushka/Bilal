import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NavLink } from "../NavLink/NavLink";

export default function Header() {
    const [active, setActive] = useState(false)
    return (
        <>
            <div className="container">
                <div className="header">
                    <div className="logo">
                        <NavLink href={"/"}>
                            <Image width={50} height={50} src="/favicon.ico" alt="Logo" />
                        </NavLink>
                    </div>
                    <div className="navbar">
                        <NavLink href={"/kyrsy"}>
                            Курсы
                        </NavLink>
                        <NavLink href={"#"}>
                            Работы студентов
                        </NavLink>
                        <NavLink href={"/contacts"}>
                            Контакты
                        </NavLink>
                        <NavLink href={"/blog"}>
                            Блог
                        </NavLink>
                        <div className="header_phone-number">
                            <div>
                                <div>8 (999) 333-15-03</div>
                                <div> <Image width={50} height={50} src="/phone-button.png" alt="phoneButton" /></div>
                            </div>
                            <div className="header_phone-modal">
                                <a href="tel:8 999 333 15 03">
                                    Позвонить
                                </a>
                                <Link href="/contacts">
                                    Заказать звонок
                                </Link>
                            </div>
                            <div className="header_phone-modal-block"></div>
                        </div>
                    </div>
                    <div onClick={() => { setActive(!active) }} className={"wrapper-menu " + (active ? "open" : "")}>
                        <div className="line-menu half start"></div>
                        <div className="line-menu"></div>
                        <div className="line-menu half end"></div>
                    </div>

                </div>
            </div>
            <div className={"burger-modal " + (active ? "active" : "")}>
                <div>
                    <NavLink onClick={() => { setActive(false) }} href={"/kyrsy"}>
                        Курсы
                    </NavLink>
                    <NavLink onClick={() => { setActive(false) }} href={"#"}>
                        Работы студентов
                    </NavLink>
                    <NavLink onClick={() => { setActive(false) }} href={"/contacts"}>
                        Контакты
                    </NavLink>
                    <NavLink onClick={() => { setActive(false) }} href={"/blog"}>
                        Блог
                    </NavLink>
                </div>
                <div>
                    <a href="tel:8 999 333 15 03">
                        8 (999) 333-15-03
                    </a>
                    <Link onClick={() => { setActive(false) }} href="/contacts">
                        Заказать звонок
                    </Link>
                </div>
            </div>
        </>
    )
}
