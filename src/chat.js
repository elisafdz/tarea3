import React, { useState, useEffect } from "react";
import "./chat.css";

const Chat = ({socket})=> {
  const socket_recibido = socket[0];
  const nombre = socket[1];
  const [mensajes, setMensajes] = useState([]);
  const manejarEnvio = (evt) => {
                                  evt.preventDefault();
                                  socket_recibido.emit("CHAT", {name:nombre, date:"ahora", message:message})
                                  
                                }
    const [message, setMessage] = useState("");

    useEffect(() => {
      socket_recibido.emit("CHAT")
      socket_recibido.on("CHAT", (data) => {
       // setChat(data)
        setMensajes((prev)=> [...prev, data]);

      });
        
      
     
    }, []);
   
    return (
      <div className="chat">
        <h4>CHAT</h4>
        <div className="texto-chat">
          {mensajes.map(mensaje=> <div><p>{Date(mensaje.date)}</p><p>{mensaje.name}:{mensaje.message}</p></div>)}
        </div>
        
        <form onSubmit={manejarEnvio}>
            <label>
              Mensaje:
              <input
                type="text"
                value={message}
                onChange={f => setMessage(f.target.value)}
              />
            </label>
            <input type="submit" value="Submit" />
    </form>
      </div>
       
      
    
    );
}

export default Chat;