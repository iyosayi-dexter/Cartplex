import {Dispatch ,SetStateAction} from 'react'
import {bannerInterface, productListInterface} from '../utils/interfaces'
import REST_API_URL from '../utils/global'
import {useCallback} from 'react'

export const useGetProduct=()=>{
    const getProduct=useCallback(async(url:string , setDataCallback:Dispatch<SetStateAction<productListInterface[]>> , setLoadingCallBack:Dispatch<SetStateAction<boolean>>)=>{
        try {
            setLoadingCallBack(true)
            const res = await fetch(`${REST_API_URL}/${url}`)
            const data = await res.json()
            setDataCallback(data)
        }catch(err){

        }finally {
            setLoadingCallBack(false)
        }
    },[])
    return getProduct
}

export const useGetCategories=()=>{
    const getCategories=useCallback(async (url:string , setDataCallback:Dispatch<SetStateAction<{id:number , name:string}[]>> , setLoadingCallBack:Dispatch<SetStateAction<boolean>>)=>{
        try{
            setLoadingCallBack(true)
            const res = await fetch(`${REST_API_URL}/${url}`)
            const data = await res.json()
            setDataCallback(data)
        }catch(err){

        }finally{
            setLoadingCallBack(false)
        }
    },[])
    return getCategories
}

export const useGetBanners=()=>{
    const getBanners=useCallback(async(url:string , setDataCallback:Dispatch<SetStateAction<bannerInterface[]>> , setLoadingCallBack: Dispatch<SetStateAction<boolean>>)=>{
        try{
            setLoadingCallBack(true)
            const res = await fetch(`${REST_API_URL}/${url}`)
            const data = await res.json()
            setDataCallback(data)
        }catch(err){

        }finally{
            setLoadingCallBack(false)
        }
    },[])
    return getBanners
}