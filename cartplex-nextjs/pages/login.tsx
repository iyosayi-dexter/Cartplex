import Link from 'next/link'
import { useProfileContext } from '../contexts/profileContext'
import {FormEvent, useState} from 'react'
import {useLogin , redirectToHome} from '../adapters/auth'
import {useEffect} from 'react'

const Login=()=>{
    const {userData , setUserData}= useProfileContext()
    const [loginError , setLoginError] = useState<string | null>('')
    const [isLoading , setIsLoading] = useState<boolean>(false)
    const login = useLogin()

    const [user , setUser] = useState<{email:string , password:string}>({email:"",password:""})
    const {email , password} = user

    const handleLogin=(e:FormEvent)=>{
        e.preventDefault()
        if(isLoading){
            return
        }
        if(email.trim() && password.trim()){
            login({user , setLoginError , setIsLoading , setUserData})
        }
    }

    useEffect(()=>{
        userData?.isAutheticated && redirectToHome()
    },[userData?.isAutheticated])

    return (
        <section className='auth_page'>
            {
                loginError &&   <div className='modal success_false'>
                                    <p>{loginError}</p>
                                    <button onClick={()=>setLoginError(null)}>Close</button>
                                </div>
            }
            <main className="auth_card_wrapper">
                <section className='auth_page_main'>
                    <h1 className='auth_page_header'>Welcome Back</h1>
                    <div className='auth_page_google_auth'>
                        Login with google
                    </div>
                    <form action="/" className='auth_form' onSubmit={e=> handleLogin(e)}>
                        <div className='form_field'>
                            <label htmlFor='email'>Email</label>
                            <input required={true} type='email' name='email' value={email} onChange={(e)=>setUser(prevUser=>({...prevUser ,email:e.target.value }))}/>
                        </div>
                        <div className='form_field'>
                            <label htmlFor='password'>Password</label>
                            <input required={true} type='password' name='password' value={password} onChange={(e)=>setUser(prevUser=>({...prevUser ,password:e.target.value }))}/>
                        </div>
                        <div className='auth_password_reset_link_wrapper'>
                            <Link href='/password-reset'>
                                <a>
                                    Forgotten Password?
                                </a>
                            </Link>
                        </div>
                        <button className={`btn_primary btn_loading_${isLoading}`}>{isLoading ? "Loading..." : "Log in" }</button>
                    </form>
                    <p className='auth_form_footer'>Dont have an account? <Link href='/sign-up'>Sign Up</Link></p>
                </section>
                <section className='auth_page_secondary'>

                </section>
            </main>
        </section>
    )
}
export default Login