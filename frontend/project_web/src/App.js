import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Produits from "./pages/Produits";
import Panier from "./pages/Panier";

function AddProduit() {
    let produit = {
        name: "Produit test 3",
        description: "Description produit test 3",
        price: 3.99,
        quantity: 1
    }

    fetch("/api/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produit)
    }).then((res) => {
        if (res.status === 200) {
            alert("Produit ajouté");
        } else {
            alert("Erreur lors de l'ajout du produit");
        }
    })

}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={<Home />} />
                    <Route path="produits" element={<Produits />} />
                    <Route path="add" element={<AddProduit />} />
                    <Route path="panier" element={<Panier />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );

}
ReactDOM.render(<App/>, document.getElementById("root"));