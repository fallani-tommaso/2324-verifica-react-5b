import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [partita, setPartita] = useState([]);
  const [inCaricamento, setInCaricamento] = useState(false);
  const [numero, setNumero] = useState();
  const [r, setRisultato] = useState([]);
  function gestisciNumero(e) {
    setNumero(e.target.value);
  }

  

  async function start(){
    setInCaricamento(true);
    const response = await fetch(`http://localhost:8080/partita`, 
      {method: "POST",
      headers: { "Content-type": "application/json" },
    });

    const partita_get = await response.json();
    setPartita(partita_get);
    setInCaricamento(false);
  }

  async function invia(){
    const response = await fetch(`http://localhost:8080/partita/${partita.id}`, 
      {method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ numero : numero })
    });

    const partita_get = await response.json();
    setRisultato(partita_get);
  }

  return (
    <div className="App">
      <p>Indovina Numero</p>
      <button onClick={start} className="bottone">Nuova partita</button>
      {
        inCaricamento ?
          <div className="carica">In caricamento...</div>
        :
        (
          <div>
          <p>ID: {partita.id}<br>
          </br>Tentativi: {r.tentativi}</p>
          <p>Inserisci un numero tra 1 e 100:  <br>
          </br>
          <input type="number" onChange={gestisciNumero} value={numero} placeholder=""/>
          <button onClick={invia} className="bottone">Invia</button></p>
          </div>
        )
      }
      {
        r.risultato === 0 &&
        <p>COMPLIMENTI HAI INDOVINATO IN {r.tentativi} TENTATIVI</p>
      }
      {
        r.risultato === 1 &&
        <p>TROPPO GRANDE</p>
      }
      {
        r.risultato === -1 &&
        <p>TROPPO PICCOLO</p>
      }

      </div>
  );
}

export default App;
