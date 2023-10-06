import React from "react";
import {ipAPI} from "../config";

function Produits() {
    const [produits, setProduits] = React.useState(null);
    const [panier, setPanier] = React.useState(null);

    React.useEffect(() => {
        fetch(ipAPI + "all")
            .then((res) => res.json())
            .then((data) => {
                let panier = JSON.parse(localStorage.getItem("panier")) || [];
                const newData = data.map((dataProduit) => {
                    let pInPanier = panier.filter((p) => p._id === dataProduit._id);
                    dataProduit.quantite = pInPanier.length > 0 ? dataProduit.quantite - pInPanier[0].quantite : dataProduit.quantite;
                    return dataProduit
                });
                setProduits(newData);
                setPanier(panier)
            })
            .catch((error) => setProduits([{_id: 1, title: "test", prix: 10, quantite: 10}, {
                _id: 2, title: "test2", prix: 20, quantite: 20
            }]));
    }, []);

    function setProduitSelectionne(produitSelectionne) {
        let produit = panier.filter((p) => p._id === produitSelectionne._id);

        if (produit.length === 0) {
            panier.push({
                _id: produitSelectionne._id,
                title: produitSelectionne.title,
                quantite: 1,
                prix: produitSelectionne.prix
            });
            setPanier(panier)
        } else {
            setPanier(panier.map((p) => {
                p.quantite = p._id === produitSelectionne._id ? p.quantite + 1 : p.quantite;
                return p;
            }));
        }
        setProduits(produits.map((p) => {
            if (p._id === produitSelectionne._id) {
                p.quantite = p.quantite - 1;
            }
            return p;
        }));
        localStorage.setItem("panier", JSON.stringify(panier));
    }

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
                            }}>Ajouter au panier</button>
                        }
                    </li>
                ))}
            </ul>
            <br/>
            <h1>Panier</h1>
            <table style={{border: "1px solid black"}}>
                <thead>
                <tr>
                    <th>Produit</th>
                    <th>Quantité</th>
                </tr>
                </thead>
                <tbody>
                {!panier ?
                    <tr>
                        <td>Loading ...</td>
                        <td>Loading ...</td>
                    </tr> :
                    panier.map((produit) => (
                        <tr key={produit._id}>
                            <td>{produit.title}</td>
                            <td>{produit.quantite}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <a href={"/panier"}>Voir le panier</a>
        </div>
    );
}


export default Produits;