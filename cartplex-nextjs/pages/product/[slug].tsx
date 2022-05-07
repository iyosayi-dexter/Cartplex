import {FC, FormEvent} from 'react'
import {cartItemInterface, productDetailInterface} from '../../utils/interfaces'
import {useState} from 'react'
import REST_API_URL from '../../utils/global'
import {GetServerSideProps} from 'next'
import Image from 'next/image'
import { get_absolute_url } from '../../utils/urls'
import { useAddToCart  , generateCartItemId } from '../../utils/cart'
import { BaseSyntheticEvent } from 'react'


const ProductDisplay:FC<{data:productDetailInterface}>=({data})=>{
    const {product} = data
    const [quantity , setQuantity] = useState<number>(1)
    const [size , setSize] = useState<number|null>(null)

    const addToCart = useAddToCart()

    const handleAddToCart=(e:FormEvent)=>{
        e.preventDefault()
        const item:cartItemInterface = {
            id:generateCartItemId(product.id , size),
            image_url:product.main_thumbnail,
            product_name:product.name,
            quantity:quantity,
            size:size,
            price:product.price,
            total:parseFloat(product.price) * quantity
            }
        addToCart(item)
    }

    const handleSetQuantity=(e:BaseSyntheticEvent)=>{
        if(e.target.value < 1){
            return
        }
        setQuantity(parseInt(e.target.value))
    }

    return (
        <section className='product_detail_page'>
            <div className="product_image_container">
                <div className="product_detail_img_wrapper">
                    <Image src={get_absolute_url(product.main_thumbnail)} alt={product.name} layout='fill' className='product_detail_display_image'/>
                </div>
            </div>
            <section className="product_detail_info">
                <div className='product_detail_product_info'>
                    <h1 className='product_detail_name'>{product.name}</h1>
                    <div className='flex_between product_detail_info_shared_width'>
                        <p><b>Price: </b></p>
                        <p className='product_detail_price'>N{product.price}</p>
                    </div>
                    {
                        (product.sizes.length !==0) && (
                            <div className='product_detail_sizes_container flex_between product_detail_info_shared_width'>
                                <p><b>Sizes :</b></p>
                                <div className='product_detail_sizes_wrapper'>
                                    {
                                        product.sizes.map(size => <span key={size} className='product_detail_product_size'>{size}</span>)
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>

                <form onSubmit={(e)=> handleAddToCart(e)} className='form_field product_detail_info_shared_width'>
                    <div className='flex_between'>
                        <label htmlFor="quantity"><b>Quantity : </b></label>
                        <input type='number' name='quantity' value={quantity} onChange={e=>handleSetQuantity(e)}/>
                    </div>
                    <button className='btn_primary'>
                        Add to cart
                    </button>
                </form>

            </section>
        </section>
    )
}


export default ProductDisplay


export const getServerSideProps: GetServerSideProps= async(context)=>{
    const {slug} = context.query
    const res = await fetch(`${REST_API_URL}/product/detail/${slug}/`)

    /*
    * @throw - server responds with a 400 level error code ->  show 404 page
    */
    if (res.status >= 400 && res.status <= 499){
        return {
            notFound:true
        }
    }

    const data = await res.json()
    return {
        props:{
            data
        }
    }
}