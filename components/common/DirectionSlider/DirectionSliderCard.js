import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function DirectionSliderCard({ url, direction, id, urlDirection }) {
    const router = useRouter()
    return (
        <div>
            <div className='direction_card'>
                <Image loading="eager"
                    unoptimized
                    width={255}
                    height={230}
                    src={url}
                    alt={"DirectionCard"} />
                <Link href={router.pathname === "/admin/dashboard" ? ("/admin/direction/" + id) : ("/kyrsy" + "?" + urlDirection)}>
                    <a>
                        <div>{direction}</div>
                        <div></div>
                    </a>
                </Link>
            </div>
        </div>
    )
}
