import {createContext , useContext , Dispatch , SetStateAction} from 'react'
import {cartItemInterface} from '../utils/interfaces'

export const initialState : cartItemInterface[] = []

export const CartContext = createContext<{cartItems?:cartItemInterface[] | null, setCartItems?:Dispatch<SetStateAction<cartItemInterface[]>>}>({})

export const useCartContext=()=>{
    return useContext(CartContext)
}