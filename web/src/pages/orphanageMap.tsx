import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi'; 
import mapMarker  from '../images/map-marker.png';
import Leaflet from 'leaflet';

import api from '../services/api'

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import '../styles/pages/orphanageMap.css';
import 'leaflet/dist/leaflet.css'

const mapIcon = Leaflet.icon({
    iconUrl: mapMarker,

    iconSize: [44,49.5],

    iconAnchor: [22,49.5],

    popupAnchor: [170, 2],

})

interface orphanage{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

function OrphanageMap(){
    const [orphanages, setOrphanages] = useState<orphanage[]>()

    useEffect(() =>{
        try{
            api.get('orphanages').then(response => {
                setOrphanages(response.data)
                console.log(response.data)
            })
        }
        catch(err){

        }
    },[])
    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarker} alt="" />

                    <h2>Escola um orfanato do mapa</h2>
                    <p>Muitas crianças estão esperando pela sua visita</p>
                </header>
                <footer>
                    <strong>Santos</strong>
                    <span>São Paulo</span>
                </footer>
            </aside>
            
            <Map center={[-23.9784068,-46.3145158]} zoom={15} style={{ width: '100%', height: '100%'}}>
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
                />
                {orphanages?.map((orphanage) =>{
                    return(
                        <Marker
                            position={[orphanage.latitude,orphanage.longitude]}
                            icon={mapIcon}
                            key={orphanage.id}
                        >
                            <Popup className="map-popup" closeButton={false} minWidth={240} maxWidth={240} >
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#fff" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
                
            </Map>

            <Link to="/create-orphanage" className="create-orphanage">
                <FiPlus size={32} color="#fff"/>
            </Link>
        </div>
    )
}

export default OrphanageMap;
