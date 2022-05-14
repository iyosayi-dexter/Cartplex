import {useRouter} from 'next/router'
import {NextPage} from 'next/types'
import {useState , useEffect , FormEvent} from 'react'
import {usePasswordResetConfirm} from '../adapters/auth'


const Password_reset_confirm: NextPage=()=>{
    const router = useRouter()
    const cofirmPasswordReset = usePasswordResetConfirm()
    const {token , uid} = router.query

    const [messages , setMessage] = useState<{error:boolean|null , text:string|null}>({error:null , text:null})
    const [password , setPassword] = useState('')
    const [requestLoading , setRequestLoading] = useState(false)


    const handleCofirmPasswordReset=(e:FormEvent)=>{
        e.preventDefault()
        if(requestLoading){
            return
        }
        if(token == undefined){
            return
        }
        if(uid == undefined){
            return
        }
        if(password.trim()){
            cofirmPasswordReset(password , uid , token , setRequestLoading , setMessage)
        }
    }


    return (
        <section className='auth'>
        <main className="auth__cardWrapper">

            <section className='auth__main'>
                <h1 className='auth__header'>Confirm Password Reset</h1>
                <p className='auth_presText'>Enter your new password</p>
                <form action="/" className='auth__form' onSubmit={(e)=>handleCofirmPasswordReset(e)}>
                    <div className='form_field'>
                        <label htmlFor='password'>New Password</label>
                        <input required={true} type='password' name='password' onChange={(e)=>setPassword(e.target.value)} minLength={8}/>
                    </div>
                    <button className={`btn_primary btn_loading_${requestLoading}`}>{requestLoading ? "Loading..." : "Confirm Reset" }</button>
                </form>
            </section>
            <section className='auth_secondary'>

            </section>
        </main>
    </section>
    )
}
export default Password_reset_confirm

