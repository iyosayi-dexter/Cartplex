import Link from 'next/link'
import { BaseSyntheticEvent } from 'react'
import { FormEvent } from 'react'
import {useState} from 'react'
import REST_API_URL from '../utils/global'
import {useFormValidation} from '../utils/auth'
import {validationInterface} from '../utils/interfaces'
import {useSignUp} from '../adapters/auth'


const SignUp=()=>{
    const signUp = useSignUp()
    const [isLoading , setIsLoading] = useState<boolean>(false)
    const [signUpInfo , setSignUpInfo] = useState<{success:boolean , description:string}|null>(null)
    const [formErrors , setFormErrors] = useState<{username:validationInterface|null , password:validationInterface|null , re_password:validationInterface|null , email:validationInterface|null}>({
        username:null , password:null , re_password:null , email:null
    })

    const validateForm = useFormValidation()
    const [formData , setFormData] = useState({
        email:"",
        username:"",
        password:"",
        re_password:""
    })
    const {username , email , password , re_password} = formData

    const handleSignUp=(e:FormEvent)=>{
        e.preventDefault()
        setSignUpInfo(null)
        if(isLoading){
            return
        }
        setFormErrors({username:null , password:null , re_password:null , email:null})
        const validatedForm = validateForm(formData)

        if(validatedForm.valid){
            signUp({formData , setSignUpInfo , setIsLoading})
        }else{
            setFormErrors(validatedForm.formValidation)
        }
    }


    const setInputValue=(e:BaseSyntheticEvent)=>{
        setFormData(prevFormData=>({...prevFormData , [e.target.name]:e.target.value}))
    }



    return (
        <section className='auth'>
            {
                signUpInfo &&   <div className={`modal success_${signUpInfo.success}`}>
                                    <p>{signUpInfo.description}</p>
                                    <button onClick={()=>setSignUpInfo(null)}>Close</button>
                                </div>
            }
            <main className="auth__cardWrapper">
                <section className='auth__main'>
                    <h1 className='auth__header'>Create an account</h1>
                    <div className='auth__google'>
                        Sign In With Google
                    </div>
                    <form action="/" className='auth__form' onSubmit={e=>handleSignUp(e)}>
                        <div className='form_field'>
                            <label htmlFor='email'>Email</label>
                            <input required={true} type='email' name='email' value={email} onChange={(e)=>setInputValue(e)} className={`auth_field_valid_${formErrors.email?.valid}`}/>
                            {
                                (formErrors.email?.valid === false) && (<small className="auth_validation_error">{formErrors.email?.info}</small>)
                            }
                        </div>
                        <div className='form_field'>
                            <label htmlFor='username'>Username</label>
                            <input required={true} type='text' name='username' value={username} onChange={(e)=>setInputValue(e)} minLength={3} className={`auth_field_valid_${formErrors.username?.valid}`}/>
                            {
                                (formErrors.username?.valid === false) && (<small className="auth_validation_error">{formErrors.username?.info}</small>)
                            }
                        </div>
                        <div className='form_field'>
                            <label htmlFor='password'>Password</label>
                            <input required={true} type='password' name='password' value={password} onChange={(e)=>setInputValue(e)} minLength={8} className={`auth_field_valid_${formErrors.password?.valid}`}/>
                            {
                                (formErrors.password?.valid === false) && (<small className="auth_validation_error">{formErrors.password?.info}</small>)
                            }
                        </div>
                        <div className='form_field'>
                            <label htmlFor='re_password'>Confirm password</label>
                            <input required={true} type='password' name='re_password' value={re_password} onChange={(e)=>setInputValue(e)} minLength={8} className={`auth_field_valid_${formErrors.re_password?.valid}`}/>
                            {
                                (formErrors.re_password?.valid === false) && (<small className="auth_validation_error">{formErrors.re_password?.info}</small>)
                            }
                        </div>

                        <button className={`btn_primary btn_loading_${isLoading}`}>{isLoading ? "Loading..." : "Sign Up"}</button>
                    </form>
                    <p className='auth__footer'>Already have an account? <Link href='/login'>Login</Link></p>
                </section>
                <section className='auth_secondary'>

                </section>
            </main>
        </section>
    )
}
export default SignUp