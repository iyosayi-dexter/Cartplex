import  REST_API_URL from '../utils/global'

export const useSubSribeNewsLetter=()=>{
    const subscribe=async(email:string)=>{
        const config = {
            method:"POST",
            headers:{
                'Content-type':"application/json"
            },
            body:JSON.stringify(email)
        }

        try{
            await fetch(`${REST_API_URL}/newsletter/subscribe/`, config)
        }catch(err){

        }finally {

        }
    }
    return subscribe
}


export const useUnSubSribeNewsLetter=()=>{
    const unsubsribe=async(uid:string)=>{
        try{
            await fetch(`${REST_API_URL}/newsletter/unsubsribe/${uid}/`)
        }catch(err){

        }
    }
    return unsubsribe
}