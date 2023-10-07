import React from "react";
import {Outlet} from "react-router-dom";

function Layout() {
    function connexion() {
        return (
            <span>
            <span> | </span>
            <a href={"/connexion"}>Connexion</a>
            <span> | </span>
            <a href={"/inscription"}>Inscription</a>
        </span>
        );
    }


    return (
        <div>
            <a href={"/"}>Home</a><span> | </span>
            <a href={"/produits"}>Produits</a>
            <a href={"/panier"}
               style={{position: "fixed", top: 0, right: 0, padding: 10, backgroundColor: "white", fontSize: 20}}>
                Panier
            </a>

            {(localStorage.getItem("user") === null) ? connexion() : deconnexion()}

            <Outlet/>
            <span style={{position: "fixed", bottom: 0, right: 0, padding: 10, backgroundColor: "white"}}>© 2023 - Projet Web réalisé par Daniel XXX et Thomas PIENNE</span>
        </div>
    );
}
function deconnexion() {
    // fetch(ipAPI + "user/admin", {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({name: localStorage.getItem("user")}
    //     ),
    // }).then((res) => res.json())
    //     .then((data) => {
    //         console.log(data);
    //         if (localStorage.getItem("user") === data) {
    //             return (
    //                 <span>
    //                     <span> | </span>
    //                     <a href={"/admin"}>Admin</a>
    //                     <span> | </span>
    //                     <a href={"/deconnexion"}>Déconnexion</a>
    //                 </span>
    //             );
    //         } else {
    //             return (
    //                 <span>
    //                     <span> | </span>
    //                     <a href={"/deconnexion"}>Déconnexion</a>
    //                 </span>
    //             );
    //         }
    //     })
    //     .catch((error) => {
    //         return (
    //             <span>
    //                 <span> | </span>
    //                 <a href={"/deconnexion"}>Déconnexion</a>
    //             </span>
    //         );
    //     });

    return (
        <span>
            <span> | </span>
            <a href={"/admin"}>Admin</a>
            <span> | </span>
            <a href={"/deconnexion"}>Déconnexion</a>
        </span>
    );
}

export default Layout;