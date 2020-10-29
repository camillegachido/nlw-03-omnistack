/* eslint-disable react/react-in-jsx-scope */
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import React, { useMemo } from 'react';
import { createContext, useState } from 'react'
import api from '../services/api';

interface AuthContextData{
    signed: boolean;
    userName: string;
    logar(email: string, password: string): Promise<AxiosResponse<response>>;
    apiWithToken: AxiosInstance;
}

interface response{
    name: string;
    token: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider : React.FC = ({children}) =>{
    const [userName, setUserName] = useState<string>('')
    const [token, setToken] = useState<string>('')

    const apiWithToken = useMemo(() => {
        return axios.create({
          baseURL: 'http://localhost:3333',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      }, [token])

    async function logar(email: string, password: string){
        const data ={
            email,
            password
        }

        
        const response: AxiosResponse<response> = await api.post('login', data)
        if(response.status === 200 || response.status === 201){
            setUserName(response.data.name)
            setToken(response.data.token)
        } 

        return response
    }

    return(
        <AuthContext.Provider value={{signed: !!userName, userName, apiWithToken, logar}} >
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;