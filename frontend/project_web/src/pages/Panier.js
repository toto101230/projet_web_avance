import React from "react";
import {ipAPI} from "../config";

function Panier() {
    const [produits, setProduits] = React.useState(null);

    React.useEffect(() => {
        let data = JSON.parse(localStorage.getItem("panier")) || [];
        console.log(data);
        setProduits(data);
    }, []);

    return (
        <div>
            <h1>Liste des éléments dans le panier</h1>
            <table style={{border: "1px solid black"}}>
                <thead>
                <tr>
                    <th>Produit</th>
                    <th>Quantité</th>
                    <th>Prix unitaire</th>
                    <th>Prix total</th>
                </tr>
                </thead>
                <tbody>
                {!produits ? "Loading..." : produits.map((produit) => (
                    <tr key={produit._id}>
                        <td>{produit.title}</td>
                        <td>{produit.quantite}</td>
                        <td>{produit.prix}</td>
                        <td>{Math.round(produit.quantite * produit.prix * 100) / 100}</td>
                        <td>
                            <button onClick={() => {
                                let ps = produits.map((p) => {
                                    if (p._id === produit._id && p.quantite > 0) {
                                        p.quantite = p.quantite - 1;
                                    }
                                    return p;
                                });
                                setProduits(ps.filter((p) => p.quantite > 0));
                                localStorage.setItem("panier", JSON.stringify(produits));
                            }}>Retirer 1 du panier
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h2>Total : {!produits ? "Loading..." : produits.reduce((acc, produit) =>
                Math.round((acc + produit.quantite * produit.prix) * 100) / 100, 0)} €
            </h2>

            <button onClick={() => {
                localStorage.removeItem("panier");
                window.location.href = "/";
            }}>Vider le panier
            </button>

            <button onClick={() => {
                // commander(produits, user.id);
                commander(produits, 1);
            }}>Commander
            </button>

        </div>
    );
}

function commander(produits, user) {

    fetch(ipAPI + "/all")
        .then((res) => res.json())
        .then((data) => {


            let listeProduits = [];
            let commandePossible = true;
            produits.forEach((produit) => {
                let quantiteRestant = data.find((p) => p._id === produit._id).quantite;
                if (quantiteRestant < produit.quantite) {
                    alert("Erreur lors de la commande : quantité trop grande pour le produit " + produit.title + " (quantité disponible : " + quantiteRestant + ")");
                    commandePossible = false;
                    return;
                }

                // listeProduits.push([produit._id, produit.quantite]);
                listeProduits.push(produit._id);
            });
            if (!commandePossible) {
                return;
            }
            const commande = {
                utilisateur: user,
                listeProduits: listeProduits,
                valide: false
            }
            fetch(ipAPI + "commander", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(commande)
            }).then((res) => {
                if (res.status === 200) {
                    localStorage.removeItem("panier");
                    window.location.href = "/";
                } else {
                    alert("Erreur lors de la commande");
                }
            })
        });
}

export default Panier;