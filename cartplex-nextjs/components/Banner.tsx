import Link from 'next/link'
import {FC} from 'react'
import { bannerInterface } from '../utils/interfaces'
import Image from 'next/image'

const Banner: FC<{banner:bannerInterface}>=({banner})=>{
    return (
        <div className='banner'>
            <Link href={`/product/${banner.product_url}`}>
                <a>
                    <Image src={banner.cover} alt='banner' layout='fill'/>
                </a>
            </Link>
        </div>
    )
}

export default Banner