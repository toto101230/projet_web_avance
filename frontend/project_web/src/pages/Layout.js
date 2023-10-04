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

            <a href={"/add"}>Add produit test 3</a>

            <Outlet />
            <span style={{position: "fixed", bottom: 0, right: 0, padding: 10, backgroundColor: "white"}}>© 2021 - Projet Web</span>
        </div>
    );
}

export default Layout;