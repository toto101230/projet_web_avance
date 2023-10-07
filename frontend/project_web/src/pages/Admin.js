import React from "react";
import {ipAPI} from "../config";

function Admin() {
	//todo verifier si admin

	const [commandes, setCommandes] = React.useState(null);
	const [produits, setProduits] = React.useState(null);

	React.useEffect(() => {
		// récupération des commandes
		fetch(ipAPI + "commandes")
			.then((res) => res.json())
			.then((data) => {
				setCommandes(data)
				//récupération des noms des utilisateurs
				// data.forEach((commande) => { // todo a revoir
				// 	fetch(ipAPI + "user/getUtilisateurNom", {
				// 		method: 'POST',
				// 		headers: {
				// 			'Content-Type': 'application/json',
				// 		},
				// 		body: JSON.stringify({ id: commande.utilisateur }),
				// 	})
				// 		.then(response => response.json())
				// 		.then(nom => {
				// 			commande.utilisateur = nom;
				// 			setCommandes(data);
				// 		})
				// 		.catch((error) => {
				// 			console.error('Error:', error);
				// 		});
				// });
			})
			.catch((error) => setCommandes([{
				user: "test", produits: [{ _id: "651d834652c3d15bceb5d191", quantite: 2 }, {
					_id: "651d834752c3d15bceb5d19b", quantite: 14
				}], valide: false
			}, {
				user: "test2", produits: [{ _id: "651d834652c3d15bceb5d191", quantite: 2 }, {
					_id: "651d834752c3d15bceb5d19b", quantite: 14
				}], valide: true
			}]));

		// récupération des produits
		fetch(ipAPI + "all")
			.then((res) => res.json())
			.then((data) => setProduits(data))
			.catch((error) => setProduits([{ _id: 1, title: "test", prix: 2.99, quantite: 10 }, {
				_id: 2, title: "test2", prix: 5, quantite: 8
			}]));
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
					alert("Erreur lors de la validation de la commande");
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
					alert("Erreur lors de l'ajout du produit");
				}
			})
		});

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
								<li key={p[0]}>{findProduitName(p[0])} en {p[1]} exemplaires <br/></li>
							))}
						</ul>
						Action : {commandeValidee(commande)}
					</li>
				))}
			</ol>

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