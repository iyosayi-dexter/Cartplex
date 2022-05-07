import Image from 'next/image'
import {cartItemInterface} from '../utils/interfaces'
import {get_absolute_url} from '../utils/urls'
import {useChangeCartItemQuantity} from '../utils/cart'
import {useState} from 'react'
import {FC , BaseSyntheticEvent} from 'react'

const CartItem: FC<{cartItem:cartItemInterface}>=({cartItem})=>{
    const {image_url , price , product_name , size , total , id , quantity} = cartItem
    const changeCartItemQuantity = useChangeCartItemQuantity()
    const [itemQuantity , setItemQunatity] = useState(quantity)

    const handleChangeQuantity=(increment:number)=>{
        setItemQunatity(prevItemQuantity => {
            const newQuantityValue = prevItemQuantity+increment
            changeCartItemQuantity(id , newQuantityValue)
            return newQuantityValue
        })
    }

    return (
        <div className='cart_item'>
            <div className='cart_item_product_wrapper'>
                    <div className='cart_item_img_wrapper'>
                        <Image src={get_absolute_url(image_url)} alt='Product Image' layout='fill'/>
                    </div>
                    <div className='cart_item_prodict_info'>
                        <p className='cart_item_product_name'>{product_name}</p>
                        { size &&  <p className='cart_item_product_size'>Size</p>}
                    </div>
            </div>
            <p className="cart_item_price">N{price}</p>
            <p className="cart_item_total">N{total}</p>
            <div className="cart_item_quantity">
                <button className='cart_increment_btn_wrapper' onClick={()=> handleChangeQuantity(1)}>+</button>
                <p className='cart_item_quantity_value'>{itemQuantity}</p>
                <button className='cart_increment_btn_wrapper' onClick={()=> handleChangeQuantity(-1)}>-</button>
            </div>
        </div>
    )
}

export default CartItem