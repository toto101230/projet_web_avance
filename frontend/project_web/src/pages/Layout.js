import React from "react";
import {Outlet} from "react-router-dom";

function Layout() {

	React.useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if(user === null) {
			return;
		}
		if(Date.now() > user.expires || user.nom === null) {
			localStorage.removeItem("user");
		}
	}, []);

	function connexion() {
		return (
			<span>
	            <a href={"/connexion"}>Connexion</a>
	            <span> | </span>
	            <a href={"/inscription"}>Inscription</a>
	        </span>
		);
	}

	function deconnexion() {
		return (
			<span>
				Connecté en tant que {JSON.parse(localStorage.getItem("user")).nom}
				<span> | </span>
				<a href={"/profil"}>Profil</a>
                <span> | </span>
                <a href={"/admin"}>Admin</a>
                <span> | </span>
                <a href={"/deconnexion"}>Déconnexion</a>
            </span>
		);
	}


	return (
		<div>
			<a href={"/"}>Home</a><span> | </span>
			<a href={"/produits"}>Produits</a> <span> | </span>
			<a href={"/panier"}>Panier</a>

			<span style={{ position: "fixed", top: 0, right: 0}}>
				{(localStorage.getItem("user") === null) ? connexion() : deconnexion()}
			</span>

			<Outlet/>
			<span style={{ position: "fixed", bottom: 0, right: 0, padding: 10, backgroundColor: "white" }}>© 2023 - Projet Web réalisé par Daniel Sierra Mejia et Thomas PIENNE</span>
		</div>
	);
}

export default Layout;