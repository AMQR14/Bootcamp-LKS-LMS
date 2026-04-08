import { createContext, useContext, useEffect, useState } from "react";
import api from '../lib/api'

const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            api.get('/user')
                .then(res => setUser(res.data))
                .catch(()=> localStorage.removeItem('token'))
                .finally(()=> setLoading(false))
        }else{
            setLoading(false)
        }
    }, [])

    async function login (email, password) {
        const res = await api.post('/login', {email, password})
        const {access_token} = res.data
        localStorage.setItem('token', access_token)

        const userRes = await api.get('/user')
        console.log("aa" + userRes);
        setUser(userRes.data)
        
        return res.data
    }

    async function logout() {
        try{
            await api.post('/logout', {})
        }catch (e) {
            console.log(e)
        }finally{
            setUser(null)
            localStorage.removeItem('token')
        }
    }

    return (
        <AuthContext.Provider value={{user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth(){
    return useContext(AuthContext)
}

