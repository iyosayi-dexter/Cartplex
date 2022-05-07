import type { NextPage } from 'next'
import {useState , useEffect} from 'react'
import ProductLoading from '../components/skel/Loading'
import {ProductListDisplay} from '../components/ProductListDisplay'
import {productListInterface} from '../utils/interfaces'
import {useGetProduct} from '../adapters/product'

const Home: NextPage = () => {
  const getProduct = useGetProduct()

  // Latest products
  const [latestProducts , setLatestProducts] = useState<productListInterface[]>([])
  const [latestLoading , setLatestLoading] = useState<boolean>(false)

  useEffect(()=>{
    getProduct('product/latest/', setLatestProducts , setLatestLoading)
  },[getProduct])


  return (
    <div className='index'>

    </div>
  )
}

export default Home
