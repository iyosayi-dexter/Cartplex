import type { NextPage } from 'next'
import {useState , useEffect} from 'react'
import {ProductListDisplay} from '../components/ProductListDisplay'
import {productListInterface} from '../utils/interfaces'
import {useGetProduct , useGetCategories} from '../adapters/product'
import Category from '../components/Category'


const Home: NextPage = () => {
  const getProduct = useGetProduct()
  const getCategories = useGetCategories()

  // Latest products
  const [latestProducts , setLatestProducts] = useState<productListInterface[]>([])
  const [latestLoading , setLatestLoading] = useState<boolean>(false)

  // Categories
  const [categories , setCategories] = useState<{name:string , id:number}[]>([])
  const [categoriesLoading , setCategoriesLoading] = useState<boolean>(false)

  useEffect(()=>{
    getProduct('product/latest/', setLatestProducts , setLatestLoading)
    getCategories('category/list/' , setCategories , setCategoriesLoading)
  },[getProduct , getCategories])


  return (
    <div className='index'>

      <aside className='index__aside'>
        <div className='index_categories'>
          {
            categories.map(category => <Category key={category.id} category={category}/>)
          }
        </div>
      </aside>

      <main className='index__main'>
          <section className='index__bannerGrid'>
          </section>
          <section className='index_deals'>
              <div className='index__bannerGridSecondary'>

              </div>
          </section>
          <section className='index__latest'>
            <p className='index__tag'>Newest Products</p>
            <div className='index__latestItemsWrapper'>
              {
                  latestProducts.map(product =><ProductListDisplay product={product} key={product.id}/>)
              }
            </div>
          </section>
      </main>
    </div>
  )
}

export default Home
