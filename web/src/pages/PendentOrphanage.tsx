import React, { useContext, useEffect, useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import L from 'leaflet';

import { FiArrowRight } from 'react-icons/fi' 

import mapMarkerImg from '../images/map-marker.png';
import '../styles/pages/registeredOrphanage.css';
import api from "../services/api";
import Aside from "../components/asideDashboard";
import AuthContext from "../contexts/auth";
import { Link } from "react-router-dom";

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

interface Orphanage{
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}


export default function Orphanage() {
  const { signed} = useContext(AuthContext)
    console.log(signed)

  const [orphanages, setOrphanages] = useState<Orphanage[]>()

  useEffect(() =>{
    try{
        api.get('orphanages-pendent').then(response => {
          setOrphanages(response.data)
        })
    }
    catch(err){

    }
},[])

  if(!orphanages){
    return(
      <p>carregando...</p>
    )
  }

  return (
    <div id="page-log-dash">
      <Aside registered={false}/>


      <main>
        <div className="configs">
          <div className="titles">
            <h1>Orfanatos pendentes</h1>
            <label>{orphanages.length} orfanatos</label>
          </div>
          <div className="orphanages-container">
            {orphanages.map((orphanage, index) =>{
              return(
                <div className="orphanage" key={index}>
                  <Map 
                    center={[orphanage.latitude,orphanage.longitude]} 
                    zoom={16} 
                    style={{ width: '100%', height: 280 }}
                    dragging={false}
                    touchZoom={false}
                    zoomControl={false}
                    scrollWheelZoom={false}
                    doubleClickZoom={false}
                  >
                    <TileLayer 
                      url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                    />
                    <Marker interactive={false} icon={happyMapIcon} position={[orphanage.latitude,orphanage.longitude]} />
                  </Map>
                  <div className="infos">
                    <p>{orphanage.name}</p>
                    <div className="options">
                      <div className="button">
                        <Link to={`/authorizate-orphanage/${orphanage.id}`}>
                          <FiArrowRight size={24} color={'#15C3D6'} />
                        </Link>
                        
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  );
}