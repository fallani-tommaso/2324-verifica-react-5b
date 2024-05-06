import "./App.css";
import { useState } from "react";

export default function Inserimento({ caricaAlunni, insert }) {
  //Variabili di stato
  const [showForm, setShowForm] = useState(false);

  //Variabili di stato per form
  const [numero, setNumero] = useState();

  function gestisciCambioNome(e) {
    setNome(e.target.value);
  }

  function gestisciCambioCognome(e) {
    setCognome(e.target.value);
  }

  async function salvaAlunno() {
    await fetch(`http://localhost:8080/partita`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ numero : numero}),
    });
    caricaAlunni();
    setShowForm(false);
  }

  return (
    <>
      {
        !showForm ?
        (
            <>
            {
                insert &&
                <button onClick={() => setShowForm(true)} className="bottone">Inserisci nuovo alunno</button>
            }
            </>
        )
        :
        (
        <div>
          <p>Inserisci un numero tra 1 e 100</p>
          <input type="number" onChange={gestisciCambioNome} value={nome} placeholder="Inserisci il nome"/>
          <h2>Cognome: <input type="text" onChange={gestisciCambioCognome} value={cognome} placeholder="Inserisci il cognome"/></h2>
          <br />
          <button onClick={inviaAlunno} className="bottone">Invia</button>
        </div>
        )}
    </>
  );
}