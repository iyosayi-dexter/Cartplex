import REST_API_URL from '../utils/global'
import {userInterface} from '../utils/interfaces'
import {decodeJWT} from '../utils/auth'
import { SetStateAction  , Dispatch} from 'react'
import Router from 'next/router'
import { storeRefershToken } from '../utils/auth'

export const redirectToHome=()=>{
    Router.push('/')
}

export const useLogin=()=>{
    interface loginInterface{
        user:{
            email:string,
            password:string
        },
        setLoginError: Dispatch<SetStateAction<string | null>>,
        setIsLoading: Dispatch<SetStateAction<boolean>>,
        setUserData:Dispatch<SetStateAction<userInterface>> | undefined
    }

    const login=async({user , setLoginError, setIsLoading , setUserData}:loginInterface)=>{
        const config = {
            method:"POST",
            headers:{
                "Content-type":'application/json'
            },
            body:JSON.stringify(user)
        }

        try{
            setLoginError(null)
            setIsLoading(true)
            const res = await fetch(`${REST_API_URL}/auth/token/`,config);


            if (res.status>=200 && res.status<=299){
                const {access , refresh} = await res.json();
                storeRefershToken(refresh)
                const {username , email_verified , email} = decodeJWT(access)
                const data:userInterface = {
                    access,
                    refresh,
                    username,
                    email_verified,
                    email,
                    isAutheticated:true,
                }
                setUserData!(data)
                redirectToHome()
            }else{
                setLoginError('Incorrect email or password , try again')
            }

        }catch(err){
            setLoginError('Network error! , please check your network connection and try again.')
        }
        finally{
            setIsLoading(false)
        }
    }

    return login
}



export const useSignUp=()=>{
    interface signUpInterface{
        formData:{
            email:string,
            password:string,
            username:string,
            re_password:string
        },
        setSignUpInfo:Dispatch<SetStateAction<{
            success: boolean;
            description: string;
        } | null>>,
        setIsLoading:Dispatch<SetStateAction<boolean>>
    }
    const signUp=async({formData , setSignUpInfo , setIsLoading }:signUpInterface)=>{
        const config = {
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body : JSON.stringify(formData)
        }
        try{
            setIsLoading(true)
            const res = await fetch(`${REST_API_URL}/auth/signup/` , config)
            const data = await res.json()
            setSignUpInfo(data)

        }catch(err){
            setSignUpInfo({success:false,description:'Network error! , please check your network connection and try again.'})
        }finally{
            setIsLoading(false)
        }
    }

    return signUp
}
