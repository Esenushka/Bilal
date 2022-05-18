
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from "next/head"
import { db } from '../../../config/firebase'
import KyrsEditCard from '../../../components/common/KyrsEditCard/KyrsEditCard'

export default function EditKyrs() {

    return (
        <div>
            <Head>
                <title>dsd</title>
            </Head>
            <KyrsEditCard />
        </div>
    )
}
