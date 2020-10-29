import React from 'react'
import '../styles/pages/completeOrphanage.css';
import { Link } from 'react-router-dom';


function CompleteOrphanage(){
    return(
    <div id="page-complete">
        <div className="content-wrapper">
            <main>
              <h1>Ebaaa!</h1>
              <p>O cadastro deu certo e foi enviado
                    ao administrador para ser aprovado.
                    Agora é só esperar :)</p>
                <Link to="" className="white-color">
                    <div className="btn-return">
                        Voltar para o mapa
                    </div>
                </Link>
            </main>
        </div>
      </div>
    )
}

export default CompleteOrphanage;