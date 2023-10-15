import React from "react";
import {ipAPI} from "../config";
import "../css/Panier.css"
import Cookies from 'react-cookies'
import {fetchPost} from "../utils/utils";

function Panier() {
	const [produits, setProduits] = React.useState(null);
	const [erreursCommande, setErreursCommande] = React.useState([]);
	const [commandeReussie, setCommandeReussie] = React.useState(false);

	React.useEffect(() => {
		let data = JSON.parse(localStorage.getItem("panier")) || [];
		setProduits(data);
	}, []);

	function commander() {
		let user = JSON.parse(localStorage.getItem("user"));
		if (user === null) {
			Cookies.save("panier", "panier", { path: "/", maxAge: 600 });
			window.location.href = "/connexion";
		}

		if (produits === null || produits.length === 0) {
			setErreursCommande([{ id: 0, msg: "Impossible de commander, le panier est vide !" }])
			return;
		}

		let commandePossible = true;
		fetch(ipAPI + "all")
			.then((res) => res.json())
			.then((data) => {
				let erreurs = [];
				let listeProduits = produits.map((produit) => {
					let quantiteRestant = data.find((p) => p._id === produit._id).quantite;
					if (quantiteRestant < produit.quantite) {
						let erreur = {
							id: produit._id,
							msg: "Erreur lors de la commande : quantité trop grande pour le produit " + produit.title + " (quantité disponible : " + quantiteRestant + ")"
						}
						erreurs.push(erreur);
						commandePossible = false;
					}
					return [produit._id, produit.quantite];
				});
				setErreursCommande(erreurs)
				if (!commandePossible) {
					return;
				}
				const commande = {
					utilisateur: user.nom,
					listeProduits: listeProduits
				}
				fetchPost("commander", commande).then((res) => {
					if (res.status === 200) {
						localStorage.removeItem("panier");
						setCommandeReussie(true)
						setProduits([])
					} else {
						setErreursCommande([{
							id: 0,
							msg: "Erreur lors de la commande ! Vérifiez que vous avez assez de stock"
						}])
					}
				}).catch(() => {
					setErreursCommande([{
						id: 0,
						msg: "Erreur lors de la commande ! Vérifiez que vous avez assez de stock"
					}])
				});
			});
	}

	return (
		<div>
			<p>
				{(localStorage.getItem("user") === null) ? <span style={{ color: "red" }}>Attention,
                vous devez être connecté pour commander !</span> : ""}
			</p>

			<h1>Liste des éléments dans le panier</h1>
			<table style={{ border: "1px solid black" }}>
				<thead>
				<tr>
					<th>Produit</th>
					<th>Quantité</th>
					<th>Prix unitaire</th>
					<th>Prix total</th>
				</tr>
				</thead>
				<tbody>
				{!produits ?
					<tr>
						<td>Loading ...</td>
						<td>Loading ...</td>
						<td>Loading ...</td>
						<td>Loading ...</td>
					</tr> :
					produits.map((produit) => (
						<tr key={produit._id}>
							<td>{produit.title}</td>
							<td>{produit.quantite}</td>
							<td>{produit.prix}€</td>
							<td>{Math.round(produit.quantite * produit.prix * 100) / 100}€</td>
							<td>
								<button onClick={() => {
									let ps = produits.map((p) => {
										if (p._id === produit._id && p.quantite > 0) {
											p.quantite = p.quantite - 1;
										}
										return p;
									});
									ps = ps.filter((p) => p.quantite > 0)
									setProduits(ps);
									localStorage.setItem("panier", JSON.stringify(ps));
								}}>Réduire la quantité de 1
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{erreursCommande ? erreursCommande.map((erreur) => (
				<span style={{ color: "red" }} key={erreur.id}>
                    {erreur.msg}<br/>
                </span>
			)) : ""}

			<h2>Total : {!produits ? "Loading..." : produits.reduce((acc, produit) =>
				Math.round((acc + produit.quantite * produit.prix) * 100) / 100, 0)}€
			</h2>

			<button onClick={() => {
				localStorage.removeItem("panier");
				setProduits([])
			}}>
				Vider le panier
			</button>

			<button onClick={() => commander()}>Commander</button>
			<br/>
			{commandeReussie ? <span style={{ color: "green" }}>Commande réussie</span> : ""}
		</div>
	);
}

export default Panier;