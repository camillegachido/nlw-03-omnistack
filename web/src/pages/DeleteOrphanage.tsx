import React, { useContext, useEffect, useState } from 'react'
import '../styles/pages/deleteOrphanage.css';
import { Link, useHistory, useParams } from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../contexts/auth';

interface params{
    id: string;
    name: string;
}

function DeleteOrphanage(){
    const { push } = useHistory()

    const { apiWithToken } = useContext(AuthContext)
    const params = useParams<params>();

    const [del, setDel] = useState(false)

    useEffect(() =>{
        if(del){
            apiWithToken.delete(`/orphanages/${params.id}`).then(() => {
                alert('sucesso')
                push('/registered-orphanages')
            })
        }
    }, [del])

    return(
    <div id="page-delete">
        <div className="content-wrapper">
            <main>
              <h1>Excluir!</h1>
              <p>Você tem certeza que quer
                excluir {params.name}</p>
                <div className="btn-return" onClick={() => setDel(true)}>
                    Deletar orfanato
                </div>
                <Link to="/registered-orphanages" className="white-color">
                    <div className="btn-return">
                        Voltar para página anterior
                    </div>
                </Link>
            </main>
        </div>
      </div>
    )
}

export default DeleteOrphanage;