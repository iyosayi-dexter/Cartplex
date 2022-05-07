import jwt_decode from 'jwt-decode'
import {useState} from 'react'
import {validationInterface} from '../utils/interfaces'

interface tokenInterface{
    email: string,
    email_verified: boolean,
    exp: number,
    jti: string,
    token_type: string,
    user_id: number,
    username:string,
}

export const decodeJWT=(token:string):tokenInterface=>{
    return jwt_decode(token)
}


/*
    @desc Hook used to validate form
*/
export const useFormValidation=()=>{
    const [valid , setValid] = useState(false)
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const checkUsername=(username:string):validationInterface=>{
        if(username.trim().length >=3){
            return {valid:true , info:null}
        }else{
            return {
                valid:false,
                info:"Username must be at least 3 characters long"
            }
        }
    }

    const checkPasswordMatch=(password:string , re_password:string):validationInterface=>{
        if(password === re_password){
            return {
                valid:true,
                info:null
            }
        }else {
            return {
                valid:false,
                info:"Passwords do not match"
            }
        }
    }

    const checkEmailValid=(email:string):validationInterface=>{
        if(re.test(email)){
            return {
                valid:true,
                info:null
            }
        }
        return {
            valid:false,
            info:"Email is invalid"
        }
    }

    const checkPasswordLength=(password:string):validationInterface=>{
        if(password.trim().length >=8){
            return {
                valid:true,
                info:null
            }
        }
            return {
                valid:false,
                info:"Password must be at least 8 characters long"
            }
    }

    const isFormValid=(formData:{username:string , password:string , email:string , re_password:string})=>{
        const {password , username , email , re_password} = formData

        const formValidation= {
            username:checkUsername(username),
            password:checkPasswordLength(password),
            re_password:checkPasswordMatch(password , re_password),
            email:checkEmailValid(email)
        }
        setValid((formValidation.username.valid && formValidation.password.valid && formValidation.re_password.valid && formValidation.email.valid))
        return {
            valid,
            formValidation
        }
    }
    return isFormValid
}


export const storeRefershToken=(refresh:string)=>{
    sessionStorage.setItem('refresh', refresh)
}

export const retrieveRefreshToken=():string| null=>{
    const token = sessionStorage.getItem('refresh')
    if(token !== undefined) {
        return token
    }
    return null
}