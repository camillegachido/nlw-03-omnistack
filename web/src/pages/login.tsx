import React, { useContext, useState } from 'react'
import AuthContext from '../contexts/auth'

//import API from '../services/api';

function Landing(){
    const { signed, logar} = useContext(AuthContext)
    

    async function handleLogar(){
        // const response = await logar()
    }
    return(
    <div id="page-landing">
        <button onClick={() => handleLogar()}></button>
      </div>
    )
}

export default Landing;