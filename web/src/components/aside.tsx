import React from 'react';
import mapMarkerImg from '../images/map-marker.png';
import { FiArrowLeft } from "react-icons/fi";
import { useHistory } from 'react-router-dom';

import '../styles/components/aside.css';


function Aside(){
    const { goBack } = useHistory();
    
    return(
        <aside id="aside">
            <img src={mapMarkerImg} alt="Happy" />

            <footer>
            <button type="button" onClick={goBack}>
                <FiArrowLeft size={24} color="#FFF" />
            </button>
            </footer>
        </aside>
    )
}


export default Aside;