import React from "react";
import logo from "../css/logo.svg";
import "../css/App.css";
import {ipAPI} from "../config";

function Home() {
	const [data, setData] = React.useState(null);

	React.useEffect(() => {
		fetch(ipAPI + "api")
			.then((res) => res.json())
			.then((data) => setData(data.message))
			.catch(() => setData("Si vous voyez ce message, c'est que l'API ne fonctionne pas !"));
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo"/>
				<p>{data}</p>
			</header>
			<h1>Bienvenue sur ce site de vente de produits</h1>
			Vous trouverez dans la page "{<a href="/produits">Produits</a>}" la liste des produits disponibles à la vente. Vous pouvez cliquer sur un produit pour l'ajouter à votre panier.
			<br/>
			Vous pouvez voir, modifier et réserver votre panier dans la page "{<a href="/panier">Panier</a>}".
			<br/>
			La page "{<a href="/inscription">Inscription</a>}" vous permet de créer un compte utilisateur.
			<br/>
			La page "{<a href="/connexion">Connexion</a>}" vous permet de vous connecter à votre compte avec votre adresse mail et votre mot de passe.
			<br/>
			La page "{<a href="/admin">Admin</a>}" vous permet de voir la liste des commandes, et de valider les commandes si vous êtes administrateur.
			<br/>
		</div>
	);
}

export default Home;