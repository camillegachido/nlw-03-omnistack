import React, { useContext } from 'react'
import '../styles/pages/landing.css';
import { Link } from 'react-router-dom';
import logoImg from '../images/logo.png';
import { FiArrowRight } from 'react-icons/fi';
import AuthContext from '../contexts/auth';


function Landing(){
    const { signed } = useContext(AuthContext)

    console.log(signed)
    return(
    <div id="page-landing">
        <div className="content-wrapper">
            <img src={logoImg} alt="Logo Happy" />
            <main>
              <h1>Leve felicidade para o mundo</h1>
              <p>Visite orfanatos e mude o dia de muitas crianças.</p>
            </main>
  
            <div className="location">
              <strong>Santos</strong>
              <span>São Paulo</span>
            </div>

            <Link to="/dashboard" className="white-color">
              <div className="restrict-acess">
                Acesso restrito
              </div>
            </Link>
            

            <Link to={!signed?"/app":"/registered-orphanages"} className="enter-app">
              <FiArrowRight size={26} color="rgba(0,0,0,0.6)"/>
            </Link>
        </div>
      </div>
    )
}

export default Landing;