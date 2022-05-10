import Link from 'next/link'
import {FC} from 'react'

const Category: FC<{category:{name:string , id:number}}>=({category})=>{
    const {name} = category
    return (
        <Link href={`/category?name=${name}`}>
            <a>
                <p>{name}</p>
            </a>
        </Link>
    )
}

export default Category