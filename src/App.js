
import Mapa from './Mapa';
import Chat from './chat';
import React, { useState, useEffect } from 'react';
import {io} from "socket.io-client";
import "./map.css";


function App() {
  const [socket, setSocket] = useState(false);
  const [name, setName] = useState("");
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (name!=""){
      setEnviado(true)
    }
    
    }
 
  useEffect(() => {
    const connect_socket = io("ws://tarea-3-websocket.2021-1.tallerdeintegracion.cl", {path: '/flights'});
    setSocket(connect_socket)

    setName(name)
  }, []
  );
  
  if (socket){
    if (enviado){
      return (
        <div>    
           
          <div className="inicio" >
            <Chat  socket={[socket, name]} name={name}  ></Chat>
            <Mapa  socket={socket}></Mapa>
          </div>
          
          
        }
        </div>
      
      );
    }
    else {
     
      return (
        <div className="form">
           <form onSubmit={handleSubmit}>
            <label>
              Nickname:
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </label>
            <input type="submit" value="Submit" />
    </form>
        </div>
      );
    }
    
  }
  else{return <div>Cargando...</div>}

}


export default App;
