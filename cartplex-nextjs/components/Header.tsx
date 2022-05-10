import {FC} from 'react'
import NavBar from './NavBar'
import Image from 'next/image'
import Link from 'next/link'
import { useTotalCartItems } from '../utils/cart'



const Header:FC=()=>{
    const totalCartItems = useTotalCartItems()
    return (
    <header className='header'>
        <section className='header__main'>
            <div className='header__logoWrapper'>
                <Link href='/'>
                    <a className='header__logoLinkWrapper'>
                        <Image src='/assets/primary_logo.svg' width={30} height={30} alt='Logo'/>
                        <Image src='/assets/secondary_logo.svg' width={120} height={120} alt='Logo'/>
                    </a>
                </Link>
            </div>

            <form className='header__searchForm' action='search'>
                <div className='header__searchField'>
                    <select name='category' className='header__select header__select--dark'>
                        <option value='all'>All</option>
                    </select>
                    <input type='search' placeholder='Search for products' className='header__searchInput' name='q'/>
                </div>
                <button className='header_searchBtn'>Search</button>
            </form>

            <div className='header__accountWrapper'>
                <p>My account</p>
                <Image src='/assets/Arrow.svg' width={15} height={15} alt='Arrow'/>
            </div>

            <div className='header__cartWrapper'>
                <Link href='/my-cart'>
                    <a>
                        <Image src='/assets/cart_dark.svg' alt='cart' width={25} height={25}/>
                        <p className='header__cartValue'>{totalCartItems()}</p>
                    </a>
                </Link>
            </div>
        </section>

    </header>
    )
}
export default Header