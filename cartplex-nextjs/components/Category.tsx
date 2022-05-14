import {Fragment , useEffect , useState} from 'react'
import Link from 'next/link'
import {FC} from 'react'
import {useGetCategories} from '../adapters/product'


const Category=()=>{
    const getCategories = useGetCategories()
    const [categories , setCategories] = useState<{name:string , id:number}[]>([])
    const [categoriesLoading , setCategoriesLoading] = useState<boolean>(false)

    useEffect(()=>{
        getCategories('category/list/' , setCategories , setCategoriesLoading)
    },[getCategories])

    return (
        <Fragment>
            {
                categories.map(category =>(
                    <Link href={`/category?name=${category.name}`} key={category.id}>
                        <a>
                            <p>{category.name}</p>
                        </a>
                    </Link>
                ))
            }
        </Fragment>
    )

}
export default Category