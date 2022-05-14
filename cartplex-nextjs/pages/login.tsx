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
        <section className='auth'>
            {
                loginError &&   <div className='modal success_false'>
                                    <p>{loginError}</p>
                                    <button onClick={()=>setLoginError(null)}>Close</button>
                                </div>
            }
            <main className="auth__cardWrapper">
                <section className='auth__main'>
                    <h1 className='auth__header'>Welcome Back</h1>
                    <div className='auth__google'>
                        Sign In With Google
                    </div>
                    <form action="/" className='auth__form' onSubmit={e=> handleLogin(e)}>
                        <div className='form_field'>
                            <label htmlFor='email'>Email</label>
                            <input required={true} type='email' name='email' value={email} onChange={(e)=>setUser(prevUser=>({...prevUser ,email:e.target.value }))}/>
                        </div>
                        <div className='form_field'>
                            <label htmlFor='password'>Password</label>
                            <input required={true} type='password' name='password' value={password} onChange={(e)=>setUser(prevUser=>({...prevUser ,password:e.target.value }))}/>
                        </div>
                        <div className='auth__resLinkWrapper'>
                            <Link href='/password-reset'>
                                <a>
                                    Forgotten Password?
                                </a>
                            </Link>
                        </div>
                        <button className={`btn_primary btn_loading_${isLoading}`}>{isLoading ? "Loading..." : "Log in" }</button>
                    </form>
                    <p className='auth__footer'>Dont have an account? <Link href='/sign-up'>Sign Up</Link></p>
                </section>
                <section className='auth_secondary'>

                </section>
            </main>
        </section>
    )
}
export default Login