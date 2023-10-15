import React from 'react';
import Cookies from "react-cookies";
import {fetchPost} from "../utils/utils";

function Inscription() {
    const [data, setData] = React.useState({});
    const [erreur, setErreur] = React.useState(null);

    function onChange(event) {
        data[event.target.name] = event.target.value;
        setData(data);
        setErreur(null)
    }

    function sincrire(event) {
        event.preventDefault();
        if (data.mdp !== data.mpdConf) {
            setErreur("Les mots de passe ne correspondent pas");
            return;
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
        fetchPost("user/add", user).then((res) => {
            if (res.status === 200) {
                localStorage.setItem("user", JSON.stringify(user.nom));
                if (Cookies.load("panier") !== undefined) {
                    Cookies.remove("panier");
                    window.location.href = "/panier";
                } else {
                    window.location.href = "/";
                }
            } else {
                setErreur("Erreur lors de l'inscription ! Vérifiez les informations saisies ou réessayez plus tard");
            }
        });
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
            {erreur !== null ? <p style={{color: "red"}}>{erreur}</p> : null}

            <p>Vous avez déjà un compte ? <a href="/connexion">Connectez-vous</a></p>
        </div>
    );

}

export default Inscription;