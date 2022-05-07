import {useCartContext} from '../contexts/cartContext'
import { cartItemInterface } from './interfaces'
import {useCallback} from 'react'



// Saving item to localStorage
const saveCartItemToLocalStorage=(cartItems:cartItemInterface[])=>{
    const cart_item_to_json = JSON.stringify(cartItems)
    localStorage.setItem('cartItems' , cart_item_to_json)
}


// Adding an item to cart
export const useAddToCart=()=>{
    const { cartItems , setCartItems} = useCartContext()
    const changeCartItemQuantity = useChangeCartItemQuantity()
    const addToCart=(item:cartItemInterface)=>{
        const existsInCart = cartItems!.filter(cart_item => cart_item.id === item.id).length > 0
        if (existsInCart){
            const itemInCart = cartItems!.filter(cart_item => cart_item.id === item.id)
            const new_quantity = itemInCart[0].quantity + item.quantity
            changeCartItemQuantity(item.id , new_quantity)
            return
        }
        setCartItems!(prevCartItems => prevCartItems.concat(item))
        saveCartItemToLocalStorage(cartItems!.concat(item))
    }
    return addToCart
}




// Removing an item from the cart
export const useRemoveFromCart=()=>{
    const {setCartItems} = useCartContext()
    const removeFromCart=(id:string)=>{
        setCartItems!(prevCartItems => {
            const updatedCartItems = prevCartItems.filter(item=> item.id !== id)
            saveCartItemToLocalStorage(updatedCartItems)
            return updatedCartItems
        })
    }
    return removeFromCart
}



// Chaging the quantity of a cart item
export const useChangeCartItemQuantity=()=>{
    const {setCartItems} = useCartContext()
    const removeFromCart = useRemoveFromCart()

    const changeCartItemQuantity=(id:string , new_quantity:number)=>{
        if(new_quantity < 1 ){
            removeFromCart(id)
            return
        }
        setCartItems!(prevCartItem => {
            const item = prevCartItem.filter(item => item.id === id)
            const newItem = {...item[0], quantity:new_quantity, total:new_quantity*parseFloat(item[0].price)}
            const filteredCart = prevCartItem.filter(item => item.id !== id)
            const updatedCart:cartItemInterface[] = filteredCart.concat(newItem)
            saveCartItemToLocalStorage(updatedCart)
            return updatedCart

        })
    }
    return changeCartItemQuantity
}



// Retrieving an item from localStorage on intitial render or page reload
export const useRetrieveCartitems=()=>{
    const {setCartItems , cartItems} = useCartContext()

    const retrieveCartItems=useCallback(()=>{
        const cart_item_json = localStorage.getItem('cartItems')
        if(cart_item_json !== undefined){
            const parsed_cart_items: cartItemInterface[] = JSON.parse(cart_item_json!)
            if(setCartItems){
                setCartItems!(parsed_cart_items)
            }
        }
    },[setCartItems])
    return retrieveCartItems
}



export const generateCartItemId=(id:number , size:number|null):string=>{
    const generatedId = `${id}${size !==null ? size : ''}`
    return generatedId
}


export const useTotalCartItems=()=>{
    const {cartItems} = useCartContext()

    const getTotalCartItems=()=>{
        const totalItems = cartItems?.reduce((acc:number, current:cartItemInterface)=>{
            return acc+current.quantity
        },0)

        return totalItems
    }
    return getTotalCartItems
}


export const useCartOrderSum=()=>{
    const {cartItems} = useCartContext()

    const cartOrderSum=()=>{
        const orderSum = cartItems?.reduce((acc:number , current:cartItemInterface)=>{
            return acc+ current.total
        },0)
        return orderSum
    }
    return cartOrderSum
}