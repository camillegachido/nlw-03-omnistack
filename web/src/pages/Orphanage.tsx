import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import L from 'leaflet';
import { useParams } from 'react-router-dom'

import mapMarkerImg from '../images/map-marker.png';
import '../styles/pages/orphanage.css';


import api from "../services/api";
import Aside from '../components/aside';

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

interface Orphanage{
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  opening_hours: string;
  open_on_weekends: string;
  whatsapp: string;
  instructions: string;
  images: Array<{
    id: number;
    path: string;
  }>;
}

interface params{
  id: string;
}

export default function Orphanage() {
  const params = useParams<params>();

  const [selected, setSelected] = useState(0)

  const [orphanage, setOrphanage] = useState<Orphanage>()
  useEffect(() =>{
    try{
        api.get('orphanages/'+params.id).then(response => {
            setOrphanage(response.data)
            console.log(response.data)
        })
    }
    catch(err){

    }
},[params.id])

  if(!orphanage){
    return(
      <p>carregando...</p>
    )
  }

  return (
    <div id="page-orphanage">
      <Aside />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[selected].path} alt="Lar das meninas" />

          <div className="images">
            {orphanage.images.map((image, index) =>{
              return(
                <button className={index === selected ? "active": ""} type="button" key={image.id} onClick={() => setSelected(index)}>
                  <img src={image.path} alt={orphanage.name} />
                </button>
              )
            })}
      
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
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

              <footer>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>

              {orphanage.open_on_weekends ?
                <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
              </div>
              :
              <div className="open-on-weekends dont-open">
                <FiInfo size={32} color="#FF669D" />
                Não atendemos <br />
                fim de semana
              </div>  
            }
              
            </div>

            <a 
               href={`http://api.whatsapp.com/send?1=pt_BR&phone=55${orphanage.whatsapp}`}
               target="_blank"
               rel="noopener noreferrer"
               className="white-color"
            >
              <button type="button" className="contact-button">
                <FaWhatsapp size={20} color="#FFF" />
                Entrar em contato
              </button>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}



