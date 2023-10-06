import React from 'react';
import {ipAPI} from "../config";

function Inscription() {
    const [data, setData] = React.useState({});

    function onChange(event) {
        data[event.target.name] = event.target.value;
        setData(data);
    }


    function sincrire(event) {
        if (data.mdp !== data.mpdConf) {
            alert("Les mots de passe ne correspondent pas");
        }
        const user = {
            Admin: false,
            nom: data.name,
            prenom: data.prenom,
            email: data.email,
            addressNumero: data.adressNum,
            addressRue: data.adressRue,
            ville: data.ville,
            Codepostal: data.codePostal,
            password: data.mdp
        }
        fetch(ipAPI + "user/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then((res) => {
            if (res.status === 200) {
                alert("Inscription réussie");
                window.location.href = "/";
                localStorage.setItem("user", JSON.stringify(user.nom));
            } else {
                alert("Erreur lors de l'inscription");
            }
        });

        event.preventDefault();
    }

    return (
        <div>
            <h1>Inscription</h1>
            <form onSubmit={(event) => sincrire(event)}>
                <label>Nom :<input type="text" name="name" required
                                   onChange={(event) => onChange(event)}/></label><br/>
                <label>Prénom :<input type="text" name="prenom" required
                                      onChange={(event) => onChange(event)}/></label><br/>
                <label>Email :<input type="email" name="email" required
                                     onChange={(event) => onChange(event)}/></label><br/>
                <label>Adresse numéro :<input type="number" name="adressNum"
                                              onChange={(event) => onChange(event)}/></label><br/>
                <label>Adresse rue :<input type="text" name="adressRue"
                                           onChange={(event) => onChange(event)}/></label><br/>
                <label>Ville :<input type="text" name="ville" required
                                     onChange={(event) => onChange(event)}/></label><br/>
                <label>Code postal :<input type="number" name="codePostal" required
                                           onChange={(event) => onChange(event)}/></label><br/>
                <label>Mot de passe :<input type="password" name="mdp" required
                                            onChange={(event) => onChange(event)}/></label><br/>
                <label>Confirmation du mot de passe :<input type="password" name="mpdConf" required
                                                            onChange={(event) => onChange(event)}/></label><br/>
                <input type="submit" value="Envoyer"/>
            </form>

            <p>Vous avez déjà un compte ? <a href="/connexion">Connectez-vous</a></p>
        </div>
    );

}

export default Inscription;