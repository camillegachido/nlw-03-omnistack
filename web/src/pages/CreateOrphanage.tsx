import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import L, { LeafletMouseEvent } from 'leaflet';
import { useHistory, useParams } from "react-router-dom";

import { FiPlus } from "react-icons/fi";

import mapMarkerImg from '../images/map-marker.png';

import '../styles/pages/create-orphanage.css';
import api from "../services/api";

import Aside from '../components/aside';
import AuthContext from "../contexts/auth";

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

interface params{
  id: string;
}

export default function CreateOrphanage() {
  const { push } = useHistory()
  const { apiWithToken } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpening_hours] = useState('')
  const [open_on_weekends, setOpen_on_weekends] = useState(false)
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [whatsapp, setWhatsapp] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [previewFiles, setPreviewFiles] = useState<string[]>([])

  const params = useParams<params>();

  useEffect(() =>{
    if(params.id){
      api.get('/orphanages/'+params.id).then(response =>{
        const { name, about, instructions, opening_hours, open_on_weekends, latitude, longitude, whatsapp, images} = response.data
        setName(name)
        setAbout(about)
        setInstructions(instructions)
        setOpening_hours(opening_hours)
        setOpen_on_weekends(open_on_weekends)
        setLatitude(latitude)
        setLongitude(longitude)
        setWhatsapp(whatsapp)
      })
    }
  },[params.id])

  const handleMapClick = (event: LeafletMouseEvent) =>{
    const {lat, lng}= event.latlng

    setLatitude(lat)
    setLongitude(lng)
  }

  const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) =>{
    if(!event.target.files)
      return;
    
    const images = Array.from(event.target.files)
    const oldfiles = Array.from(files)

    images.map((image) => oldfiles.push(image))
    
    setFiles(oldfiles)

    const oldpreview = previewFiles;
    images.map((image) =>
      oldpreview.push(URL.createObjectURL(image))
    )
    setPreviewFiles(oldpreview)
  }

  const removeImages = (index: number) => {
    var array = [...files]
    var flArray = [...previewFiles] // make a separate copy of the array
    if (index !== -1) {
      array.splice(index, 1)
      setFiles(array)

      flArray.splice(index, 1)
      setPreviewFiles(flArray)
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = new FormData();

    data.append('name', name)
    data.append('about', about)
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', open_on_weekends.toString())
    data.append('latitude', latitude.toString())
    data.append('longitude', longitude.toString())
    data.append('whatsapp', whatsapp)

    files.map((image) =>
      data.append('images', image)
    )
    
    try{
      if(params.id){
        await apiWithToken.put('orphanages', data)
        push('/registered-orphanages')
      }else{
        await api.post('orphanages', data)
        push('/complete-orphanage')
      }
    }
    catch(err){
      alert(err.message)
    }
    
  }
  return (
    <div id="page-create-orphanage">
      <Aside />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-27.2092052,-49.6401092]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              { latitude !== 0 || longitude !== 0 ? 
                  <Marker interactive={false} 
                    icon={happyMapIcon} 
                    position={[latitude,longitude]} />
                : 
                  null
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event => setName(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={event => setAbout(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
               
               {previewFiles.map((image, index) =>{
                 return(
                  <div className="image-content" key={image}>
                    <button type="button" onClick={() => removeImages(index)} className="add-image-btn">
                      <FiPlus size={24} color="#FF669D" />
                    </button>
                    <img src={image} alt={name} />
                  </div>
                 )
               })}

                <label className="new-image" htmlFor="image[]">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

                
              </div>

              <input multiple type="file" id="image[]" onChange={handleSelectImages}></input>
            </div>

            <div className="input-block">
              <label htmlFor="whatsapp">WhatsApp</label>
              <input id="whatsapp" 
              value={whatsapp} onChange={event => setWhatsapp(event.target.value)}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={event => setInstructions(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" 
              value={opening_hours} onChange={event => setOpening_hours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" 
                 className={open_on_weekends ? "active": ""}
                 onClick={() => setOpen_on_weekends(true)}
                >
                  Sim</button>
                <button type="button"
                className={!open_on_weekends ? "active": ""}
                onClick={() => setOpen_on_weekends(false)}
                >Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

