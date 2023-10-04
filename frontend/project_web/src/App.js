import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Produits from "./pages/Produits";
import Panier from "./pages/Panier";
import Commande from "./pages/Commande";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="" element={<Home/>}/>
                    <Route path="produits" element={<Produits/>}/>
                    <Route path="panier" element={<Panier/>}/>
                    <Route path="commande" element={<Commande />}/>
                    <Route path="connexion" element={<Connexion/>}/>
                    <Route path="inscription" element={<Inscription/>}/>
                    <Route path="*" element={<NoPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}