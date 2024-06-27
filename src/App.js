//Importiert die Komponente DetailsCardComponent aus dem angegebenen Pfad.
import DetailsCardComponent from "./components/DetailsCardComponent";
//Importiert die useState- und useEffect-Hooks aus React.
import { useState, useEffect } from 'react';
//Importiert die axios-Bibliothek, die für HTTP-Anfragen verwendet wird.
import axios from 'axios';
// Definiert die Hauptkomponente der Anwendung.
function App() {
//useState-Hook zur Verwaltung des Formularzustands. Initialer Zustand ist ein Objekt mit leeren Strings für name und email.
  const [formData, setFormData] = useState({ name: "", email: "" });
//useState-Hook zur Verwaltung der Daten, die von der API abgerufen werden. Initialer Zustand ist ein leeres Array.
  const [recordData, setRecordData] = useState([]);
  // Setzt die Basis-URL auf http://localhost:4000, zur Build-Time des Docker Containers
  const base_url = process.env.REACT_APP_LOCAL_ADRESS;
//useEffect-Hook, der ausgeführt wird, sobald die Komponente gerendert wird.
 //Führt eine GET-Anfrage aus, um Benutzerdaten von der API abzurufen und setzt die Daten in den state.
  useEffect(() => {
    axios.get(`${base_url}/getUsers`)
      .then(res => { setRecordData(res.data) })
      .catch(err => alert(`Ein Fehler ist aufgetreten ==> ${err}`));
  }, [base_url]);
//Handler-Funktion, die bei einer Änderung der Eingabefelder aufgerufen wird.
//Aktualisiert den formData Status mit den neuen Werten.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  //Handler-Funktion, die beim Absenden des Formulars aufgerufen wird.
//Verhindert den Standard-Formularversand, sendet eine POST Anfrage an die API, um einen neuen 
//Benutzer hinzuzufügen, und setzt das Formular zurück.
  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.post(`${base_url}/addUser`, formData)
      .then(res => {
        setFormData({ name: "", email: "" });
        alert("Benutzer erfolgreich hinzugefügt");
      })
      .catch(err => alert(`Ein Fehler ist aufgetreten ==> ${err}`));
  };
//JSX, das die Benutzeroberfläche der Anwendung beschreibt.
return (
  <div className="App">
    {/*Hauptcontainer für die Anwendung*/}
    <div className='container'>
      <div className="row">
        {/*Spalte für die Benutzerliste */}
        <div className="col">
          <h3 className="text-center">Benutzerliste</h3>
          <ul>
            {/*Mappt durch recordData und rendert eine DetailsCardComponent für jeden Benutzer.
                Jeder Listeneintrag erhält einen eindeutigen Schlüssel (key), um beim Rendern der Liste zu helfen.*/}
              {recordData.map((r, i) => (
              <li key={i}>
                <DetailsCardComponent email={r.email} sn={i+1} userN={r.name} />
              </li>
            ))}
          </ul>
        </div>
        {/*Spalte für das Formular zum Hinzufügen neuer Benutzer */}
        <div className="col">
          <h2>Benutzer hinzufügen</h2>
          <form onSubmit={handleSubmit}>
            {/*Eingabefeld für den Benutzernamen*/}
            <div className="form-group">
              <label htmlFor="Username">Benutzername</label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="Username"
                value={formData.name}
                onChange={handleChange}
                placeholder="Benutzername eingeben"
              />
            </div>
            {/*Eingabefeld für die E-Mail-Adresse*/}
            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="Email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-Mail Adresse eingeben"
              />
            </div>
            {/*Absende-Button für das Formular*/}
            <button type="submit" className="btn btn-primary mt-2">Submit</button>
          </form>
        </div>
      </div>
    </div>
   </div>
 );
}
//Exportiert die App-Komponente, damit sie in anderen Teilen der Anwendung verwendet werden kann.
export default App;
