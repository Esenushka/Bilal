import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function DirectionSliderCard({ url, direction, urlDirection }) {
    return (
        <Link href={"/kyrsy" + "?" + urlDirection}>
            <a className='direction_card'>
                <Image
                    loader={() => url}
                    width={255}
                    height={230}
                    src={url}
                    alt={"DirectionCard"} />
                <Link href={"#"}>
                    <div>
                        <div>{direction}</div>
                        <div></div>
                    </div>
                </Link>
            </a>
        </Link>
    )
}
