import {FC} from 'react'
import Link from 'next/link'

const Footer:FC=()=> {
    return (
        <footer className='footer_main'>
            <div className='footer_grid'>

                <div className='footer_grid_item'>
                    <h2>Contact us</h2>
                    <ul>
                        <p className='footer_sublist_header'>Address</p>
                        <li>
                            404 9th avenue , request Towen , Response city
                        </li>
                    </ul>
                    <ul>
                        <p className='footer_sublist_header'>Phone</p>
                        <li>
                            (+404) 123 456 7890
                        </li>
                    </ul>
                    <ul>
                        <p className='footer_sublist_header'>Email</p>
                        <li>
                            support@cartplex.com
                        </li>
                        <li>
                            info@cartplex.com
                        </li>
                    </ul>
                </div>

                <div className='footer_grid_item'>
                    <h2>INFORMATION</h2>
                    <ul>
                        <li>
                            <Link href='/delivery-info'>Delivery Information</Link>
                        </li>
                        <li>
                            <Link href='/Contact-us'>Contact us</Link>
                        </li>
                        <li>
                            <Link href='/sitemap'>Sitemap</Link>
                        </li>
                        <li>
                            <Link href='/Privacy-policy'>Privacy Policy</Link>
                        </li>
                        <li>
                            <Link href='/Terms-and-conditions'>Terms and Condition</Link>
                        </li>
                    </ul>
                </div>

                <div className='footer_grid_item'>
                    <h2>NEWSLETTER</h2>
                    <form>
                        <p>Sign up to our newsletter today and get the latest information on the best sale deals and top offers.</p>
                        <input type='email'/><br/>
                        <button type='submit' className='primary_btn'> Subscribe </button>
                    </form>
                </div>

            </div>

            <div className="footer_grid">
                <div className="footer_grid_item">
                    <h2>MY ACCOUNT</h2>
                    <ul>
                        <li>
                            <Link href='/sign-up'>Sign Up</Link>
                        </li>
                        <li>
                            <Link href='/login'>Login</Link>
                        </li>
                        <li>
                            <Link href='/help'>Help</Link>
                        </li>
                        <li>
                            <Link href='/my-cart'>View Cart</Link>
                        </li>
                        <li>
                            <Link href='/Track-my-order'>Terms and Condition</Link>
                        </li>
                    </ul>
                </div>

                <div className="footer_grid_item">
                    <h2>PAYMENT AND SHIPPING</h2>
                    <ul>
                        <li>
                            <Link href='/payment-methods'>Payment methods</Link>
                        </li>
                        <li>
                            <Link href='/locations-we-ship'>Locations we ship</Link>
                        </li>
                    </ul>
                </div>

                <div className="footer_grid_item">
                    <h2>CUSTOMER SERVICES</h2>
                    <ul>
                        <li>
                            <Link href='/international-shipping'>internation shipping</Link>
                        </li>
                        <li>
                            <Link href='/affiliates'>Affiliates</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer