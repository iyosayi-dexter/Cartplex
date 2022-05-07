import  REST_API_URL from '../utils/global'
import {decodeJWT} from '../utils/auth'
import {useProfileContext} from '../contexts/profileContext'
import {userInterface} from '../utils/interfaces'
import {retrieveRefreshToken , storeRefershToken} from '../utils/auth'
import {useCallback , useState} from 'react'

const useLoadUser=()=>{
    const {setUserData} = useProfileContext()

    /*
        @desc loads the user with refresh key stored in session storage
    */

    const loadUser=useCallback(async()=>{
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
            if(res.status === 400){
                console.log('failed')
                console.log(res)
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
        }finally{
            console.log('done')
        }
    },[setUserData])

    return loadUser
}
export default useLoadUser