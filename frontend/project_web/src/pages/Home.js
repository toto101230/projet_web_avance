import React from "react";
import logo from "./../logo.svg";
import "../css/App.css";
import {ipAPI} from "../config";

function Home() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch(ipAPI + "api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>{!data ? "Si vous voyez ce message, c'est que l'API ne fonctionne pas" : data}</p>
            </header>
        </div>
    );
}

export default Home;