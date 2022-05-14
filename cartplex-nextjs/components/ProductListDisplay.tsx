import {FC} from 'react'
import Link from 'next/link'
import {productListInterface} from '../utils/interfaces'
import Image from 'next/image'
import {get_absolute_url} from '../utils/urls'

export const ProductListDisplay: FC<{product:productListInterface}>=({product})=>{
    const {main_thumbnail , name ,rating , price , slug} = product
    return (
        <Link href={`product/${slug}/`}>
            <a className='ProductDisplay__wrapper'>
                <div className='productDisplay productDisplay--flex'>
                        <div className='productDisplay__imgWrapper'>
                            <Image src={get_absolute_url(main_thumbnail)} alt='Product Display' layout='fill'/>
                        </div>
                        <div className='productDisplay__info'>
                            <p>{name}</p>
                            <p>{rating}</p>
                            <p><b>N{price}</b></p>
                        </div>
                </div>
            </a>
        </Link>
    )
}


export const ProductDisplaySkel=()=>{
    return (
        <div className='productDisplaySkel'>
            <div className='productDisplaySkel__imgWrapper'/>
            <div className='productDisplaySkel__infoWrapper'>
                <div className='productDisplaySkel__text productDisplaySkel__text--wide'/>
                <div className='productDisplaySkel__text'/>
                <div className='productDisplaySkel__text'/>
            </div>
        </div>
    )
}