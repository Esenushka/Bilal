import React from 'react'

export default function Footer() {
    return (
        <div className='footer'>
            <div className='container'>
                <div className='footer_left-block'>
                    <div>&copy; Школа анимации 2020</div>
                    <div>Все права защищены</div>
                </div>
                <div className='footer_right-block'>
                    <a href='#' target={'blank'}>
                        Договор оферты
                    </a>
                    <a href='#' target={'blank'}>
                        Политика конфиденциальности
                    </a>
                </div>
            </div>
        </div>
    )
}
