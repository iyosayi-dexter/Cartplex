import Link from 'next/link'
import { FormEvent } from 'react';
import {useState} from 'react'
import {usePasswordReset} from '../adapters/auth'

const PasswordReset=()=>{
    const [email , setEmail] = useState<string>('')
    const requestPasswordReset = usePasswordReset();
    const [requestLoading , setRequestLoading] = useState<boolean>(false)
    const [message, setMessage] = useState<{error:boolean|null , text:string|null}>({error:null , text:null})

    const handlePasswordReset=(e:FormEvent)=>{
        e.preventDefault()
        if(requestLoading){
            return
        }
        if(email.trim() !==''){
            requestPasswordReset(email , setRequestLoading , setMessage)
        }
    }

    return (
        <section className='auth'>
            <main className="auth__cardWrapper">

                <section className='auth__main'>
                    <h1 className='auth__header'>Reset Password</h1>
                    <p className='auth_presText'>Enter your email and we&#39;ll send you instructions on how to reset your password.</p>
                    <form action="/" className='auth__form' onSubmit={(e)=>handlePasswordReset(e)}>
                        <div className='form_field'>
                            <label htmlFor='email'>Email</label>
                            <input required={true} type='email' name='email' onChange={(e)=> setEmail(e.target.value)}/>
                        </div>

                        <div className='auth__optionsWrapper'>
                            <button className={`btn_primary btn_loading_${requestLoading}`}>{requestLoading ? "Loading..." : "Reset!" }</button>
                            <Link href='/login'>Return to login</Link>
                        </div>
                    </form>
                </section>

                <section className='auth_secondary'>

                </section>
            </main>
        </section>
    )
}
export default PasswordReset