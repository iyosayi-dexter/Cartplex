import Image from 'next/image'
import CartItem from '../components/CartItem'
import { useCartContext } from '../contexts/cartContext'
import { useCartOrderSum } from '../utils/cart'
import EmptyCart from '../components/EmptyCart'

const MyCart=()=>{
    const {cartItems} = useCartContext()
    const orderSum = useCartOrderSum()
    const cartItemsEl = cartItems?.map(item => <CartItem key={item.id} cartItem={item}/>)
    return (
        <section className='cart'>
            <h1 className='cart_page_header'>
                Your Cart
            </h1>

            <div className='cart_wrapper'>
                {/* CART LIST  */}

                <div className='cart_item_wrapper'>
                    {/* CART PRODUCT HEADER */}
                    {cartItemsEl}
                    {
                        cartItemsEl?.length === 0 && <EmptyCart/>
                    }
                </div>

                {/* CART SUMMARY  */}
                <div className='cart_summary_wrapper'>
                    <h1>Summary</h1>
                    <div className='cart_summary_row'>
                        <span>Order total</span> <span>{orderSum()}</span>
                    </div>
                    <div className='cart_summary_row'>
                        <span>Shiping</span> <span>Price</span>
                    </div>
                    <div className='cart_summary_row'>
                        <span><b>Subtotal</b></span> <span>Price</span>
                    </div>
                    <button className='btn_primary'>Checkout Order</button>
                </div>

            </div>
        </section>
    )

}

export default MyCart