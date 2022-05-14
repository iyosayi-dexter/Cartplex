import type { NextPage } from 'next'
import {useState , useEffect , Fragment} from 'react'
import {ProductListDisplay , ProductDisplaySkel} from '../components/ProductListDisplay'
import {productListInterface , bannerInterface} from '../utils/interfaces'
import {useGetProduct , useGetBanners} from '../adapters/product'
import Categories from '../components/Category'
import Banner from '../components/Banner'



// THIS IS JUST THE TESTING PHASE, THIS CODE IS SURELY GOING TO BE REFACTORED
const Home: NextPage = () => {
  const getProduct = useGetProduct()
  const getBanners = useGetBanners()

  // discounted products
  const [discountedProducts , setDiscountedProducts] = useState<productListInterface[]>([])
  const [discountedLoading , setDiscountedLoading ] = useState<boolean>(false)

  // Latest products
  const [latestProducts , setLatestProducts] = useState<productListInterface[]>([])
  const [latestLoading , setLatestLoading] = useState<boolean>(false)

    // Latest products
    const [trendindProducts , setTrendingProducts] = useState<productListInterface[]>([])
    const [trendingProductsLoading , setTrendingProductsLoading] = useState<boolean>(false)

    // Latest products
    const [topRatedProducts , setTopRatedProducts] = useState<productListInterface[]>([])
    const [topRatedProductsLoading , setTopRatedProductsLoading] = useState<boolean>(false)

    const [banners , setBanners] = useState<bannerInterface[]>([])
    const [bannerLoading , setBannerLoading] = useState<boolean>(false)

  useEffect(()=>{
    getProduct('product/latest/', setLatestProducts , setLatestLoading)
    getProduct('product/sale/' , setDiscountedProducts , setDiscountedLoading)
    getProduct('product/trending/' , setTrendingProducts , setTrendingProductsLoading)
    getProduct('product/rating/' , setTopRatedProducts , setTopRatedProductsLoading)
    getBanners('product/banner/' , setBanners , setBannerLoading)
  },[getProduct ,getBanners])


  return (
    <div className='index'>

      <aside className='index__aside'>
        <div className='index_categories'>
          <Categories/>
        </div>

        <div className='index__productItems'>
            <p>Trending Items</p>
            <div className='index__trendingProductsWrapper'>
              {
                trendindProducts.map(trendingProduct => (
                  <ProductListDisplay product={trendingProduct} key={trendingProduct.id}/>
                ))
              }
            </div>
        </div>

        <div className='index__productItems'>
            <p>Top Rated Products</p>
            <div className='index__trendingProductsWrapper'>
              {
                topRatedProducts.map(topRatedProduct => (
                  <ProductListDisplay product={topRatedProduct} key={topRatedProduct.id}/>
                ))
              }
            </div>
        </div>

      </aside>

      <main className='index__main'>
          <section className='index__bannerGrid'>
                {
                  banners.slice(0,3).map(banner=> <Banner key={banner.id} banner={banner}/>)
                }
          </section>

          <section className='index__deals'>
            <p className='index__tag'>Best Deals</p>
            <div className='index__latestItemsWrapper'>
              {
                  discountedProducts.map(product =><ProductListDisplay product={product} key={product.id}/>)
              }
              {
                latestLoading &&(
                  <Fragment>
                      <ProductDisplaySkel/>
                      <ProductDisplaySkel/>
                      <ProductDisplaySkel/>
                      <ProductDisplaySkel/>
                      <ProductDisplaySkel/>
                      <ProductDisplaySkel/>
                  </Fragment>
                )
              }
            </div>
          </section>

          <section className='index__latest'>
            <p className='index__tag'>Newest Products</p>
            <div className='index__latestItemsWrapper'>
              {
                  latestProducts.map(product =><ProductListDisplay product={product} key={product.id}/>)
              }
              {
                latestLoading &&(
                  <Fragment>
                      <ProductDisplaySkel/>
                      <ProductDisplaySkel/>
                      <ProductDisplaySkel/>
                      <ProductDisplaySkel/>
                      <ProductDisplaySkel/>
                      <ProductDisplaySkel/>
                  </Fragment>
                )
              }
            </div>
          </section>

      </main>
    </div>
  )
}

export default Home
