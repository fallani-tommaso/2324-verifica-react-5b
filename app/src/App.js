import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [partita, setPartita] = useState([]);
  const [inCaricamento, setInCaricamento] = useState(false);
  const [numero, setNumero] = useState();
  const [showResult, setshowResult] = useState(false);
  const [risultato, setRisultato] = useState([]);

  function gestisciNumero(e) {
    setNumero(e.target.value);
  }

  async function start(){
    setInCaricamento(true);
    const response = await fetch("http://localhost:8080/partita", 
      {method: "POST",
      headers: { "Content-type": "application/json" },
    });

    const partita_get = await response.json();
    setPartita(partita_get);
    setInCaricamento(false);
    setshowResult(true)
  }

  async function invia(){
    const response = await fetch("http://localhost:8080/partita", 
      {method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ numero : numero })
    });

    const partita_get = await response.json();
    setRisultato(partita_get);
    setshowResult(true)
  }

  /*function MostraRisultato(){
    if(risultato> partita.)
  }*/

  return (
    <div className="App">
      <p>Indovina Numero</p>
      <button onClick={start} className="bottone">Nuova partita</button>
      { 
        inCaricamento ?
          <div className="carica">In caricamento...</div>
        :
        (
          <>
          <p>ID: {partita.id}<br>
          </br>Tentativi: {partita.tentativi}</p>
          <p>Inserisci un numero tra 1 e 100:  <br>
          </br>
          <input type="number" onChange={gestisciNumero} value={numero} placeholder=""/>
          <button onClick={invia} className="bottone">Invia</button></p>
          
          </>
        )
      }
    </div>
  );
}

export default App;
