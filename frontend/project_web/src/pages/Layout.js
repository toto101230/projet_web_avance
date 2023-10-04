import React from "react";
import {Outlet} from "react-router-dom";

function Layout() {
    return (
        <div>
            <a href={"/"}>Home</a><span> | </span>
            <a href={"/produits"}>Produits</a>
            <a href={"/panier"} style={{position: "fixed", top: 0, right: 0, padding: 10, backgroundColor: "white"}}>
                Panier
            </a>

            <button onClick={addProduit}>Add produit</button>

            <Outlet/>
            <span style={{position: "fixed", bottom: 0, right: 0, padding: 10, backgroundColor: "white"}}>© 2023 - Projet Web réalisé par  </span>
        </div>
    );
}

function addProduit() {
    let length = 0;
    fetch("http://localhost:3001/all")
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

        fetch("http://localhost:3001/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produit)
        }).then((res) => {
            if (res.status === 200) {
                window.location.href = "/";
            } else {
                alert("Erreur lors de l'ajout du produit");
            }
        })
    });

}

export default Layout;