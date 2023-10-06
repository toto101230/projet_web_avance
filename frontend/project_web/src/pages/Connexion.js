import {ipAPI} from "../config";
import React from "react";

function Connexion() {
    let [data, setData] = React.useState({});

    const onChange = (event) => {
        data[event.target.name] = event.target.value;
        setData(data);
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
                if (data === "Erreur de connexion") {
                    alert("Erreur de connexion");
                } else {
                    localStorage.setItem("user", JSON.stringify(data));
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
                    <input type="text" name="password" required
                           onChange={(event) => onChange(event)}/></label><br/>
                <input type="submit" value="Submit"/>
            </form>
            <br/>
            <a href="/inscription">Pas encore inscrit ?</a>
        </div>
    );
}

export default Connexion;