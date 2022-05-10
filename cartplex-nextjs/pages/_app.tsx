import type { AppProps } from 'next/app'
import '../styles/global.scss'
import {Fragment} from 'react'
import Footer from '../components/Footer'
import {ProfileContext , initialState as userInitialState} from '../contexts/profileContext'
import {CartContext , initialState as cartInitialState} from  '../contexts/cartContext'
import { userInterface } from '../utils/interfaces'
import { cartItemInterface} from '../utils/interfaces'
import {useState , useEffect} from 'react'
import Header from '../components/Header'
import useLoadUser from '../adapters/loadUser'
import {useRetrieveCartitems} from '../utils/cart'


function MyApp({ Component, pageProps }: AppProps) {

  const [userData , setUserData] = useState<userInterface>(userInitialState)
  const [cartItems , setCartItems] = useState<cartItemInterface[]>(cartInitialState)
  const loadUser = useLoadUser()
  const retrieveCartItems =  useRetrieveCartitems()

  useEffect(()=>{
    retrieveCartItems(setCartItems)
    // loadUser(setUserData)
  },[retrieveCartItems])

  return (
    <ProfileContext.Provider value={{userData, setUserData}}>
      <CartContext.Provider value={{cartItems , setCartItems}}>
        <Fragment>
            <Header/>
            <Component {...pageProps} />
            <Footer/>
        </Fragment>
      </CartContext.Provider>
  </ProfileContext.Provider>
  )

}

export default MyApp
