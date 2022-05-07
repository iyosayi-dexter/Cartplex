import Link from 'next/link'
import { useProfileContext } from '../contexts/profileContext'
import {Fragment} from 'react'

const NavBar=()=>{
    const {userData} = useProfileContext()
    return (
        <Fragment>
            <div className='nav_overlay nav_hide'/>
            <nav className='nav'>
                <ul>
                    <li><Link href='/'>Home</Link></li>
                    <li><Link href='/about'>About</Link></li>
                    <li><Link href='/'>Categories</Link></li>
                    <li><Link href='/'>Brands</Link></li>
                    {
                        (userData?.isAutheticated == false) && <Fragment>
                                                                    <li><Link href='/login'>Login</Link></li>
                                                                    <li><Link href='/sign-up'>Sign Up</Link></li>
                                                                </Fragment>
                    }
                </ul>
            </nav>
        </Fragment>
    )
}
export default NavBar