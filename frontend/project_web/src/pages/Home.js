import React from "react";
import logo from "../css/logo.svg";
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
			<h1>Bienvenue sur le site de vente de produits</h1>
			Vous trouverez dans la page "{<a href="/produits">Produits</a>}" la liste des produits disponibles à la vente.
			<br/>
			Vous pouvez ajouter des produits à votre panier, et valider votre commande dans la page "{<a href="/panier">Panier</a>}".
			<br/>
            Le bouton "Add produit" vous permet d'ajouter un produit à la liste des produits disponibles à la vente.
            <br/>
            La page "{<a href="/connexion">Connexion</a>}" vous permet de vous connecter à votre compte utilisateur.
            <br/>
            La page "{<a href="/inscription">Inscription</a>}" vous permet de créer un compte utilisateur.
            <br/>
            La page "{<a href="/admin">Admin</a>}" vous permet de voir la liste des commandes, et de valider les commandes.
            <br/>
		</div>
	);
}

export default Home;