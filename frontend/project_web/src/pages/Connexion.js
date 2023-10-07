import {ipAPI} from "../config";
import React from "react";

function Connexion() {
    const [data, setData] = React.useState({});
    const [erreur, setErreur] = React.useState(null);

    const onChange = (event) => {
        data[event.target.name] = event.target.value;
        setData(data);
        if(erreur !== null){
            setErreur(null);
        }
    }

    function connexion(event) {
        event.preventDefault();
        const user = {
            email: data.email,
            password: data.password
        }
        fetch(ipAPI + "user/connexion", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data); //todo à revoir
                if (data === "Mauvais identifiants") {
                    setErreur("Mauvais identifiants");
                } else {
                    localStorage.setItem("user", JSON.stringify(data)); //todo faire un system de token
                    window.location.href = "/";
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div>
            <h1>Connexion</h1>
            <form onSubmit={(event) => connexion(event)}>
                <label>Email:
                    <input type="text" name="email" required
                           onChange={(event) => onChange(event)}/></label><br/>
                <label>Mot de passe:
                    <input type="password" name="password" required
                           onChange={(event) => onChange(event)}/></label><br/>
                <input type="submit" value="Submit"/><br/>
                <span style={{color: "red"}}>{erreur}</span>
            </form>
            <br/>
            <a href="/inscription">Pas encore inscrit ?</a>
        </div>
    );
}

export default Connexion;