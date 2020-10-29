import React, { useContext, useEffect, useState } from 'react'
import '../styles/pages/dashboard.css';
import logo from '../images/big-logo.svg';
import { useHistory } from 'react-router-dom';

import AuthContext from '../contexts/auth'

function Dashboard(){
    const history = useHistory();
    const { signed, logar} = useContext(AuthContext)
    console.log(signed)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [active, setActive] = useState(false)

    const login = async (event: any) =>{
        event.preventDefault()

        try{
            const response = await logar(email, password)
            history.push('/registered-orphanages')
        }
        catch(er){
            alert(er)
        }
    }

    useEffect(() =>{
        if(email && password)
            setActive(true)
        else
            setActive(false)
            
    }, [email, password])

    return(
    <div id="page-dashboard">
        <div className="content-wrapper">
            <main>
              <img src={logo} alt="happy logo" />
              
              <div className="location">
                <strong>Santos</strong>
                <span>São Paulo</span>
              </div>
            </main>
        </div>
        <div className="login">
            <main>
                <form onSubmit={login}>
                    <h1>Fazer login</h1>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className="configs">
                        <div>
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Lembrar-me</label>
                        </div>

                        <label>Esqueci minha senha</label>
                    </div>
                    <button type="submit"className={"btn-login" + (active? " active" : "")} disabled={!active}>
                        Entrar
                    </button>
                </form>
                
            </main>

        </div>
      </div>
    )
}

export default Dashboard;