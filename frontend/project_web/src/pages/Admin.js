import React from "react";
import {ipAPI} from "../config";

function Admin() {
	const [commandes, setCommandes] = React.useState(null);
	const [produits, setProduits] = React.useState(null);
	const [erreurs, setErreurs] = React.useState(null);
	const [isAdmin, setIsAdmin] = React.useState(false);

	React.useEffect(() => {
		fetch(ipAPI + "user/admin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ nom: JSON.parse(localStorage.getItem("user")) })
		}).then((res) => {
			if (res.status !== 200) {
				window.location.href = "/";
				setIsAdmin(false);
			}else{
				setIsAdmin(true);
			}
		}).then(() => {
			// récupération des commandes
			fetch(ipAPI + "commandes")
				.then((res) => res.json())
				.then((data) => setCommandes(data))
				.catch(() => setCommandes([]));

			// récupération des produits
			fetch(ipAPI + "all")
				.then((res) => res.json())
				.then((data) => setProduits(data))
				.catch(() => setProduits([]));
		}).catch(() => {
			window.location.href = "/";
			setIsAdmin(false);
		});
	}, []);

	function commandeValidee(commande) {
		function validerCommande(id) {
			fetch(ipAPI + "commande/valider", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ id: id })
			}).then((res) => {
				if (res.status === 200) {
					window.location.reload();
				} else {
					setErreurs("Erreur lors de la validation de la commande")
				}
			})
		}

		if (commande.valide) {
			return <span style={{ color: "green" }}> Commande validée </span>;
		} else {
			return (
				<span>
                    <span style={{ color: "red" }}>
                        Commande non validée
                    </span>
                    <button onClick={() => {
	                    validerCommande(commande._id);
                    }}>Valider la commande</button>
                </span>
			);
		}
	}

	function findProduitName(_id) {
		if (produits === null) {
			return "Loading...";
		}
		let produit = produits.find((p) => p._id === _id);
		if (produit === undefined) {
			return "Produit introuvable";
		}
		return produit.title;
	}

	//fonction de test pour ajouter un produit
	function addProduit() {
		let length = 0;
		fetch(ipAPI + "all")
			.then((res) => res.json())
			.then((data) => {
				length = data.length;
			}).then(() => {

			const produit = {
				title: "Produit test " + (length + 1),
				description: "Description produit test " + (length + 1),
				//prix random
				prix: Math.floor(Math.random() * 1000) / 100,
				quantite: Math.floor(Math.random() * 10)
			}

			fetch(ipAPI + "add", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(produit)
			}).then((res) => {
				if (res.status === 200) {
					window.location.reload();
				} else {
					setErreurs("Erreur lors de l'ajout du produit")
				}
			})
		});

	}

	if(!isAdmin){
		return <div>Vous n'avez pas les droits</div>
	}

	return (
		<div>
			<h1>Panneau d'administration</h1>
			<h2>Liste des commandes</h2>
			<ol>
				{!commandes ? "Loading..." : commandes.map((commande) => (
					<li key={commande._id}>
						Utilisateur associé à la commande : {commande.utilisateur} <br/>
						Produits commandés :
						<ul style={{ listStyleType: "square" }}>
							{Object.entries(commande.listeProduits).map((p) => (
								<li key={p[0]}> {findProduitName(p[0])} en {p[1]} exemplaires<br/></li>
							))}
						</ul>
						Action : {commandeValidee(commande)}
					</li>
				))}
			</ol>
			<div>
				{erreurs !== null ? <p style={{ color: "red" }}>{erreurs}</p> : null}
			</div>

			<h2>Liste des produits</h2>
			<ul>
				{!produits ? "Loading..." : produits.map((produit) => (
					<li key={produit._id}>
						{produit.title} - prix : {produit.prix}€
						quantité : {produit.quantite}
					</li>
				))}
			</ul>
			<div>
				<button onClick={addProduit}>Ajouter un produit</button>
			</div>
		</div>
	);
}

export default Admin;