import React from "react";

function Panier() {
    return (
        <div>
            <h1>Liste des éléments dans le panier</h1>
            <table>
                <thead>
                <tr>
                    <th>Produit</th>
                    <th>Quantité</th>
                    <th>Prix unitaire</th>
                    <th>Prix total</th>
                </tr>
                </thead>
                <tbody>
                {JSON.parse(localStorage.getItem("panier")).map((produit) => (
                    <tr>
                        <td>{produit.title}</td>
                        <td>{produit.quantity}</td>
                        <td>{produit.prix}</td>
                        <td>{produit.quantity * produit.prix}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Panier;