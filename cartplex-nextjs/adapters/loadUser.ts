import  REST_API_URL from '../utils/global'
import {decodeJWT} from '../utils/auth'
import {userInterface} from '../utils/interfaces'
import {retrieveRefreshToken , storeRefershToken} from '../utils/auth'
import {useCallback , Dispatch , SetStateAction} from 'react'

const useLoadUser=()=>{

    const loadUser=useCallback(async(setUserData:Dispatch<SetStateAction<userInterface>>)=>{
        const refresh = retrieveRefreshToken()
        if(refresh===null){
            return
        }
        const request_body = {
            "refresh":refresh
        }
        const config = {
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(request_body)
        }
        try{
            const res = await fetch(`${REST_API_URL}/auth/token/refresh/` , config)
            if(res.status >= 400 && res.status <= 499){
                return
            }
            const {access , refresh} = await res.json()
            const {username , email , email_verified} = decodeJWT(access)
            storeRefershToken(refresh)
            const user:userInterface ={
                username,
                email ,
                access,
                refresh,
                email_verified,
                isAutheticated:true
            }
            setUserData!(user)
        }catch(err){
            console.log(err)
        }
    },[])

    return loadUser
}
export default useLoadUser