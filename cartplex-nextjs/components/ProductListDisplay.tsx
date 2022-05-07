import {FC} from 'react'
import Link from 'next/link'
import {productListInterface} from '../utils/interfaces'
import Image from 'next/image'

export const ProductListDisplay: FC<{product:productListInterface}>=({product})=>{
    const {main_thumbnail , name ,rating , price , slug} = product
    return (
        <Link href={`product/${slug}/`}>
            <a className='product_display_link_wrapper'>
                <div className='product_display product_flex'>
                        <div className='product_display_imgwrapper'>
                            <Image src={main_thumbnail} alt='Product Display' layout='fill'/>
                        </div>
                        <div className='product_display_info'>
                            <p>{name}</p>
                            <p>{rating}</p>
                            <p><b>N{price}</b></p>
                        </div>
                </div>
            </a>
        </Link>
    )
}