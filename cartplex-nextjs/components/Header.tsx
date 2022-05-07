import {FC} from 'react'
import NavBar from './NavBar'
import Image from 'next/image'
import Link from 'next/link'
import { useTotalCartItems } from '../utils/cart'



const Header:FC=()=>{
    const totalCartItems = useTotalCartItems()
    return (
    <header className='header_main'>
        <div className='header_main_flex'>

            <div className='header_main_logo_wrapper'>
                <Link href='/'>
                    <a>
                        <Image src='/assets/cartplex_base_logo.svg' width={30} height={30} alt='Cartplex Logo'/>
                        <Image src='/assets/cartplex_name_logo.svg' width={140} height={40} alt='Cartplex Logo'/>
                    </a>
                </Link>
            </div>

            <form action='search'>
                <div className='header_main_form_selection'>
                    <select name='category'>
                        <option value='all'>All categories</option>
                    </select>
                    <input type='search' name='q'/>
                </div>
                <button className='btn_primary'>Search</button>
            </form>

            <div className='header_main_user_section'>
                <div className='header_main_user_cart'>
                        <Link href='/my-cart'>
                            <a>
                                <p>My cart</p>
                                <div className='header_main_cart_icon_wrapper'>
                                    <Image src='/assets/cart.svg' width={25} height={25} alt='cart'/>
                                    <p className='header_main_cart_items_total'>{totalCartItems()}</p>
                                </div>
                            </a>
                        </Link>
                </div>
            </div>

        </div>
    </header>
    )
}
export default Header