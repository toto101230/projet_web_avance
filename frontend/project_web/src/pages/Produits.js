import React from "react";
import {ipAPI} from "../config";

function Produits() {
    const [produits, setProduits] = React.useState(null);

    React.useEffect(() => {
        fetch(ipAPI + "all")
            .then((res) => res.json())
            .then((data) => {
                let panier = JSON.parse(localStorage.getItem("panier")) || [];
                data.map((d) => {
                    let pInPanier = panier.filter((p) => p._id === d._id);
                    d.quantite = pInPanier.length > 0 ? d.quantite - pInPanier[0].quantite : d.quantite;
                });
                setProduits(data);
                console.log(data);
            })
            .catch((error) => setProduits([{title: "test", prix: 10}, {title: "test2", prix: 20}]));
    }, []);

    return (
        <div>
            <h1>Listes des produits</h1>
            <ul>
                {!produits ? "Loading..." : produits.map((produit) => (
                    <li key={produit._id}>
                        {produit.title} - prix : {produit.prix}€
                        quantité : {produit.quantite}
                        {produit.quantite <= 0 ? " - Rupture de stock" :
                            <button onClick={() => {
                                setProduitSelectionne(produit);
                                setProduits(produits.map((p) => {
                                    if (p._id === produit._id) {
                                        p.quantite = p.quantite - 1;
                                    }
                                    return p;
                                }));

                            }}>Ajouter au panier</button>
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
}

function setProduitSelectionne(produitSelectionne) {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    if (produitSelectionne !== undefined) {
        let produit = panier.filter((p) => p._id === produitSelectionne._id);
        if (produit.length === 0) {
            panier.push({
                _id: produitSelectionne._id,
                title: produitSelectionne.title,
                quantite: 1,
                prix: produitSelectionne.prix
            });
        } else {
            panier = panier.map((p) => {
                p.quantite = p._id === produitSelectionne._id ? p.quantite + 1 : p.quantite;
                return p;
            });
        }
    }
    localStorage.setItem("panier", JSON.stringify(panier));
}

export default Produits;