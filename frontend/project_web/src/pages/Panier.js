import React from "react";

function Panier() {
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
                {(JSON.parse(localStorage.getItem("panier")) || []).map((produit) => (
                    <tr key={produit._id}>
                        <td>{produit.title}</td>
                        <td>{produit.quantite}</td>
                        <td>{produit.prix}</td>
                        <td>{Math.round(produit.quantite * produit.prix * 100) / 100}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h2>Total : {(JSON.parse(localStorage.getItem("panier")) || []).reduce((acc, produit) =>
                Math.round((acc + produit.quantite * produit.prix) * 100) / 100, 0)} €
            </h2>

            <button onClick={() => {
                localStorage.removeItem("panier");
                window.location.href = "/";
            }}>Vider le panier
            </button>

            <button onClick={() => {
                window.location.href = "/commande";
            }}>Commander</button>

        </div>
    );
}

export default Panier;