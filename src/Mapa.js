
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import "./map.css";
import {Icon} from 'leaflet';
import { LeafletContext } from "@react-leaflet/core";
import foto_icono from "./punto.png";
import foto_icono2 from "./avion.png";


const Map = ({socket})=> {
    const [mapa, setMapa] = useState([]);
    const [flights, setFlights] = useState([]);
    //const inicio = useState([]);
    const foto = new Icon({
        iconUrl: foto_icono,
        iconSize: [10, 10],
    })
    const foto1 = new Icon({
      iconUrl: foto_icono2,
      iconSize: [40, 40],
  })

    useEffect(() => {
  
      socket.on("POSITION", data => {
        setMapa((prev)=> [...prev, data]);
      });
      socket.emit("FLIGHTS")
      socket.on("FLIGHTS", (data) => {
        setFlights(data)
      });
      
    }, []);

 
    return (
      
      <div className="Mapa">
         
          <MapContainer center={[-37.675147, -71.542979]} zoom={5} scrollWheelZoom={false} style={{height:"50vh"}}>
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {mapa.map(posicion => {
            if (posicion){ return (
                <Marker position={[posicion.position[0], posicion.position[1]]} icon={foto}>
                <Popup>
                {posicion.code}
                </Popup>
            </Marker>)}})}
            
            { flights.map(coordenadas => {return(
            <Polyline positions={[[coordenadas.origin[0], coordenadas.origin[1]], [coordenadas.destination[0], coordenadas.destination[1]]]} color="blue" weight={2}
              opacity={0.5} />
              )})} 

            {flights.map(posicion => {
              
            if (posicion){ return (
                <Marker position={[posicion.origin[0], posicion.origin[1]]} icon={foto1}>
                </Marker>)}})}

            {flights.map(posicion => {
              
              if (posicion){ return (
                  <Marker position={[posicion.destination[0], posicion.destination[1]]} icon={foto1}>
                  </Marker>)}})}
            
            
            </MapContainer>
       
            
       

       <h4 id="info-vuelos">Información Vuelos </h4>
       
        <div className="container_informacion"> {flights.map(vuelos => {
                  if (vuelos){return(
                      <div className="informacion">
                          {vuelos.code}
                          <ul>
                          <li>Aerolínea: {vuelos.airline}</li>
                          <li>Origen: {vuelos.origin}</li>
                          <li>Destino: {vuelos.destination}</li>
                          <li>Avión: {vuelos.plane}</li>
                          <li>Asientos: {vuelos.seats}</li>
                          <li>Pasajeros:{vuelos.passengers.map(pasajero => {
                              if (pasajero){return(
                                  <p>{pasajero.name}, {pasajero.age}</p>
                              )}
                          })}</li>
                      </ul>
                      </div>
                      
                      
                  )}
              })}</div>
       </div>
            
    
    
    );
}

export default Map;