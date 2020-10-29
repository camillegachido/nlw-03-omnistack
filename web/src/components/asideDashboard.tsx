import React from 'react';
import mapMarkerImg from '../images/map-marker.png';
import { FiMapPin, FiAlertCircle, FiPower } from "react-icons/fi";
import { Link, useHistory } from 'react-router-dom';

import '../styles/components/asideDashboard.css';

interface Props{
    registered: boolean;
    hasNew?: boolean;
}

function Aside(props: Props){
    const { goBack } = useHistory();
    
    return(
        <aside id="asideDash">
            <img src={mapMarkerImg} alt="Happy" />
            <div className="container">
                <Link to='/registered-orphanages'>
                    <button type="button" className={props.registered ? "active" : ""} onClick={goBack}>
                        <FiMapPin size={24} color={!props.registered ? "#fff" : "#0089A5"} />
                    </button>
                </Link>
                <Link to='/pendent-orphanage'>
                    <button type="button" 
                        className={!props.registered ? ("active") : ""}>
                        {
                            props.hasNew &&
                                <div className="notification">

                                </div>
                        }
                        <FiAlertCircle size={24} color={props.registered ? "#fff" : "#0089A5"} />
                    </button>
                </Link>
            </div>
            <footer>
                <button type="button" onClick={goBack}>
                    <FiPower size={24} color="#FFF" />
                </button>
            </footer>
        </aside>
    )
}


export default Aside;