import { createContext  , useContext , Dispatch, SetStateAction } from "react";
import {userInterface} from '../utils/interfaces'


export const initialState:userInterface = {
    username:"",
    email:"",
    email_verified: null,
    isAutheticated:false,
    access:null,
    refresh:null
}

export const ProfileContext = createContext<{userData?:userInterface|null , setUserData?:Dispatch<SetStateAction<userInterface>>}>({})

export const useProfileContext=()=>{
    return useContext(ProfileContext);
}