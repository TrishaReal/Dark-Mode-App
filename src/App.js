import { useState, useEffect } from "react";
import data from "./data";
import Articolo from "./Articolo";

//- Dichiarare una funzione che ci permette  di accedere al localStorage: che è
// un sistema che permette di salvare sul browser locale dell'utente che naviga, delle informazioni, in questo caso
// andiamo a salvare effetivamente quello che è il valore della nostra modalità.
// Primo passo: salvare il suo valore o di default return 'light-mode' all'interno del localStorage.
// Come? All'interno dello useEffect.

//Devo far si che il valore iniziale dello 'state' corrisponda a quello che è stato allocato nel 'local storage'.
// Utilizzo dunque una funazione:
const getFromLocalStorage = () => {
  if (localStorage.getItem("theme")) {
    return localStorage.getItem("theme");
  } else {
    return "light-mode";
  }
};

function App() {
  //Dichiaro 'state' che contiene il valore del 'theme'.
  const [theme, setTheme] = useState(getFromLocalStorage() || "light-mode");

  //Funzione che cambia il tema a seconda del suo valore:
  const cambiaTema = () => {
    if (theme === "light-mode") {
      setTheme("dark-mode");
    } else {
      setTheme("light-mode");
    }
  };

  //Al mutare del 'theme state', attacca una classe al nostro html TAG.
  //Ogni volta che aggiorno il 'theme', ogni volta che chiamo la funzione 'cambiaTema, si svolgerà il mio useEffect.
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme); //salviamo il valore all'interno del 'local storage'.
  }, [theme]);

  return (
    <section className="section-center">
      <div className="container">
        <button className="btn" onClick={cambiaTema}>
          Cambia
        </button>
        <section className="article-section">
          {data.map((el) => (
            <Articolo key={el.id} {...el} />
          ))}
        </section>
      </div>
    </section>
  );
}

export default App;
