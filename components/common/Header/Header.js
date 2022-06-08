import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { NavLink } from '../NavLink/NavLink';

export default function Header() {
  const [active, setActive] = useState(false);
  return (
    <>
      <div className="container">
        <div className="header">
          <div className="logo">
            <NavLink href={'/'}>
              <Image loading="eager" width={100} height={100} src="/b2.png" alt="Logo" />
            </NavLink>
          </div>
          <div className="navbar">
            <NavLink href={'/kyrsy'}>Курсы</NavLink>
            <NavLink href={'/studentsworks'}>Работы студентов</NavLink>
            <NavLink href={'/contacts'}>Контакты</NavLink>
            <NavLink href={'/blog'}>Блог</NavLink>
            <div className="header_phone-number">
              <div>
                <div>+996 559 98 07 07</div>
                <div>
                  {' '}
                  <Image loading="eager" width={50} height={50} src="/phone-button.png" alt="phoneButton" />
                </div>
              </div>
              <div className="header_phone-modal">
                <a href="tel:+996 559 98 07 07">Позвонить</a>
                <Link href="/contacts">Заказать звонок</Link>
              </div>
              <div className="header_phone-modal-block"></div>
            </div>
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
      </div>
      <div className={'burger-modal ' + (active ? 'active' : '')}>
        <div>
          <NavLink
            href={'/kyrsy'}>
            Курсы
          </NavLink>
          <NavLink
            href={'/studentsworks'}>
            Работы студентов
          </NavLink>
          <NavLink
            href={'/contacts'}>
            Контакты
          </NavLink>
          <NavLink
            href={'/blog'}>
            Блог
          </NavLink>
        </div>
        <div>
          <a href="tel:8 999 333 15 03">8 (999) 333-15-03</a>
          <Link
            href="/contacts">
            Заказать звонок
          </Link>
        </div>
      </div>
    </>
  );
}
